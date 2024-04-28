import React, {useEffect, useState} from 'react';
import {Button, Container, Dropdown, Nav, Navbar} from 'react-bootstrap';
import './cabecalho.module.css';

const Cabecalho = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Button variant="light">Novo Cliente</Button>
                        <Button variant="light">Novo Projeto</Button>
                        <Button variant="light">Nova Tarefa</Button>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">Meu Trabalho</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/clientes">Clientes</Dropdown.Item>
                                <Dropdown.Item href="/projetos">Projetos</Dropdown.Item>
                                <Dropdown.Item href="/tarefas">Tarefas</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Cabecalho;