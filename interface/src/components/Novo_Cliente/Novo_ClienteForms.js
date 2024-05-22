import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

function Novo_ClienteForms({btnText}){
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }

    try {
      const response = await fetch(`http://localhost:3000/clientes?${params.toString()}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage("Cliente criado com sucesso!");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" name="nome" placeholder="Nome do cliente" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="text" name="telefone" placeholder="Telefone" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>CNPJ</Form.Label>
        <Form.Control type="text" name="cnpj" placeholder="CNPJ do cliente" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" name="email" placeholder="E-mail do cliente" />
      </Form.Group>
      <Button variant="success" type="submit" value={btnText}>
        { btnText }
      </Button>

      {successMessage && <p className="text-success">{successMessage}</p>}
    </Form>
  )
}
export default Novo_ClienteForms