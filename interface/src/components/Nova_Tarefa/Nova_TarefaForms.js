import { useState, useEffect } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import moment from 'moment';
import WeekPicker from '../weekpicker/weekpicker';
import axios from 'axios';

function Nova_TarefaForms({ btnText }) {
  const [startDate, setStartDate] = useState(null);
  const [projetos, setProjetos] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/projetos')
      .then(response => response.json())
      .then(data => setProjetos(data))
      .catch(error => console.error(error));
  }, []);

  const handleWeekChange = (week) => {
    const start = moment().isoWeek(week).startOf('week');
    setStartDate(start);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }

    try {
      const response = await axios.post(`http://localhost:3000/tarefas?${params.toString()}`);

      setSuccessMessage('Tarefa salva com sucesso!');
      form.reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" name="nome" placeholder="Nome da tarefa" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Duração</Form.Label>
        <Form.Control type="text" name="duracao" placeholder="Duração da tarefa no formato 1h ou 1h30m" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descrição</Form.Label>
        <Form.Control type="text" name="descricao" placeholder="Descrição da tarefa" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Projeto</Form.Label>
        <FormControl as="select" name="projetoId">
          <option value="">Selecione um projeto</option>
          {projetos.map(projeto => (
            <option key={projeto.id} value={projeto.id}>{projeto.nome}</option>
          ))}
        </FormControl>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Semana</Form.Label>
        <div>
          <WeekPicker
            value={startDate ? startDate.week() : null}
            onChange={handleWeekChange}
          />
        </div>
      </Form.Group>

      <Button variant="success" type="submit" value={btnText}>
        {btnText}
      </Button>

      {successMessage && <p className="text-success">{successMessage}</p>}

    </Form>
  );
}

export default Nova_TarefaForms;