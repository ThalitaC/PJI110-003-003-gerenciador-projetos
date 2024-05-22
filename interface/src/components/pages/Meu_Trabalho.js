import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';

function Meu_Trabalho() {
  const [tarefas, setTasks] = useState([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tarefas');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTarefas();
  }, []);

  return (
    <Container className="justify-content-md-center">
      <h1>Minhas Tarefas</h1>
      <ListGroup>
        {tarefas.map((tarefa) => (
          <ListGroup.Item variant="light" key={tarefa.id} className="p-3 mb-2 border-bottom">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span
                  className="font-weight-bold">{tarefa.semana}</span>
              </div>
              <div>
                <span
                  className="font-weight-bold">{tarefa.projeto.cliente.nome}</span>
              </div>
              <div>
                <span
                  className="font-weight-bold">{tarefa.projeto.nome}</span>
              </div>
              <div>
                <span
                  className="font-weight-bold">{tarefa.nome}</span>
              </div>
              <div>
                <span
                  className="text-muted">{tarefa.duracao.hours}h {tarefa.duracao.minutes ? `${tarefa.duracao.minutes}m` : ''}</span>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Meu_Trabalho;