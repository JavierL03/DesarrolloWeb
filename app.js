var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const mysql = require('mysql2/promise'); 
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234', 
  database: 'web_development', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initializeDatabase() {
  try {
    await pool.query('CREATE DATABASE IF NOT EXISTS web_development');
    
    await pool.query('USE web_development');
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        description VARCHAR(250) NOT NULL,
        dueDate DATE NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Base de datos y tablas inicializadas correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

initializeDatabase();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de autenticación mejorado
app.use((req, res, next) => {
  console.log('Request Time:', new Date().toISOString());
  
  // Ejemplo de autenticación mejorada
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      error: 'No credentials sent!',
      message: 'Por favor proporcione un token de autorización'
    });
  }
  
  if (authHeader === '123456') {
    req.mysql = pool;
    next();
  } else {
    return res.status(403).json({ 
      error: 'Invalid credentials',
      message: 'El token de autorización no es válido'
    });
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/goals', goalsRouter);

app.use(function(req, res, next) {
  next(createError(404, 'Endpoint no encontrado'));
});

app.use(function(err, req, res, next) {
  console.error(err);
  
  res.status(err.status || 500);
  
  if (req.accepts('json')) {
    res.json({
      error: {
        status: err.status || 500,
        message: err.message,
        ...(req.app.get('env') === 'development' && { stack: err.stack })
      }
    });
  } else if (req.accepts('html')) {
    res.render('error', {
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    });
  } else {
    res.type('txt').send(err.message);
  }
});

module.exports = app;