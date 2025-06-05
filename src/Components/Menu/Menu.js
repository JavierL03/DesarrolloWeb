import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



import "./menu.css";
import { useSelector, useDispatch } from 'react-redux';
import { changeOption } from './optionsSlice';

function Menu() {
    const option = useSelector((state) => state.options.value); 
    const dispatch = useDispatch();

    const changeOptionFunction = (e) => {
        e.preventDefault();
        if (option === 'tasks') {
            dispatch(changeOption('goals'));
        } else {
            dispatch(changeOption('tasks'));
        }
    };
}

import "./menu.css";
import { useSelector, useDispatch } from 'react-redux';
import { changeOption } from './optionsSlice'; 
import { Navbar, Container, Nav } from 'react-bootstrap';

function Menu() {
    const option = useSelector((state) => state.options.value);
    const dispatch = useDispatch();

    const changeOptionFunction = (e) => {
        e.preventDefault();
        if (option === 'tasks') {
            dispatch(changeOption('goals'));
        } else {
            dispatch(changeOption('tasks'));
        }
    };

    return (
        <Navbar expand="lg" className="navbar navbar-dark bg-dark">
            <Container>
                <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav defaultActiveKey={option}>
                        <Nav.Link eventKey='tasks' onClick={changeOptionFunction}>Tasks</Nav.Link>
                        <Nav.Link eventKey='goals' onClick={changeOptionFunction}>Goals</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;