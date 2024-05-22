import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Novo_ProjetoForms({ btnText }) {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    cliente: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClientSelected, setIsClientSelected] = useState(false);


  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clientes');
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  }, []);

  const handleClientSelect = (eventKey) => {
    const selectedClient = clients.find((client) => client.id === eventKey);
    setSelectedClient(selectedClient);
    setFormData((prevFormData) => ({
      ...prevFormData,
      cliente: selectedClient ? selectedClient.id : '',
    }));
    setIsClientSelected(true);
  };

  const handleChange = (event, fieldName) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
      cliente: selectedClient ? selectedClient.id : '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nome, descricao, cliente } = formData;

    try {
      const response = await axios.post(
        `http://localhost:3000/projetos?nome=${nome}&descricao=${descricao}&cliente=${cliente}`,
        {}
      );

      setFormData({
        nome: '',
        descricao: '',
        cliente: '',
      });
      setIsSubmitted(true);
      setIsClientSelected(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="email"
          name="nome"
          value={formData.nome}
          onChange={(event) => handleChange(event, 'nome')}
          placeholder="Nome do Projeto"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          type="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={(event) => handleChange(event, 'descricao')}
          placeholder="Descrição do Projeto"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cliente</Form.Label>
        <div className="w-50 input-group">
          <Form.Control as="select" onChange={(event) => handleClientSelect(event.target.value)}>
            <option value="">Selecione um cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nome}
              </option>
            ))}
          </Form.Control>
        </div>
      </Form.Group>

      <Button variant="success" type="submit" value={btnText} onClick={handleSubmit}>
        {btnText}
      </Button>

      {isSubmitted && <p className="text-success">Projeto salvo com sucesso!</p>}
    </Form>
  );
}

export default Novo_ProjetoForms;