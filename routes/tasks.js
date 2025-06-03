var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise'); // Usamos mysql2 con soporte para promesas

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Datos iniciales (opcional, solo para ejemplo)
let tasks = [{
    'id': 1,
    'name': 'caminar al perro',
    'description': 'Llevar al perro al parque',
    'dueDate': '2024-04-20'
}];

/* GET tasks listing. */
router.get('/getTasks', async function(req, res, next) {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

router.delete('/removeTask/:id', async function(req, res, next) {
    if (!req.params || !req.params.id) {
        return res.status(400).json({ error: 'ID no proporcionado' });
    }

    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        
        res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

router.post('/addTask', async function(req, res, next) {
    if (!req.body || !req.body.name || !req.body.description || !req.body.dueDate) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO tasks (name, description, dueDate) VALUES (?, ?, ?)',
            [req.body.name, req.body.description, req.body.dueDate]
        );
        
        const newTask = {
            id: result.insertId,
            ...req.body
        };
        
        res.status(201).json(newTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});

module.exports = router;