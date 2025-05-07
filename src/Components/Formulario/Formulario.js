import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Formulario.scss';
import {useSelector, useDispatch} from 'react-redux';
import {userRef} from 'react';
import {removeTodo, addTodo 


} from '../../reducers/todoSlice';


function BasicExample() {
  const dispatch = useDispatch(); 
  const inputRefName = userRef();
//  const inputRefDescription = userRef();
  //const inputRefDueDate = userRef();

  const addItem = (e) => {
    e.preventDefault();
    dispatch(addTodo({'name': inputRefName}));
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="" ref={inputRefName} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="info" onClick={addItem}>Add Goal</Button>
    </Form>
  );
}

export default BasicExample;