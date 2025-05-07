import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Item.scss';
import {useDispatch} from 'react-redux';
import {removeTodo, addTodo 


} from '../../reducers/todoSlice';

function Item(props) {
const removeItem = (e) => {
  e.preventDefault();
  dispatchy(removeTodo(props.name));
}

const addItem = (e) => {
  e.preventDefault();
  dispatchy(addTodo(props.name));
}

const dispatchy = useDispatch();
  return (
    <Card>
  <Card.Body>
    <Card.Title>{props.name}</Card.Title>
    <Card.Text className="fw-bold">
      Description
    </Card.Text>
    <Card.Text>
      Elaborar una aplicación web responsive en la que se pueda llevar el control de mis tareas y metas personales.
    </Card.Text>
    <Card.Text className="fw-bold">
      Due Date
    </Card.Text>
    <Card.Text>
      31/05/2024
    </Card.Text>
  </Card.Body>
  <Card.Body>
    <Button variant="info">Editar</Button>
    <Button variant="info"onClick={removeItem} >Eliminar</Button>
  </Card.Body>
</Card>
  );
}

export default Item;