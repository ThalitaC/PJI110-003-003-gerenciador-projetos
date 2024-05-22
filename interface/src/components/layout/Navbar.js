import { Link } from "react-router-dom";
import Container from "./Container";
import styles from "./Navbar.module.css";
import logo from "../../img/logo.jpg";
import Modal from 'react-modal';
import { useState } from 'react';
import Novo_ProjetoForms from '../Novo_Projeto/Novo_ProjetoForms';
import Novo_ClienteForms from '../Novo_Cliente/Novo_ClienteForms';
import Nova_TarefaForms from '../Nova_Tarefa/Nova_TarefaForms';
import { Button } from 'react-bootstrap';

function CloseButton({ closeModal }) {
  return (
    <Button
      variant="danger"
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
      }}
      onClick={closeModal}
    >
      X
    </Button>
  );
}

function Navbar() {
  const [modal, setModal] = useState(null);

  function openModal(type) {
    console.log(`openModal called for ${type}`);
    setModal(type);
  }

  function closeModal() {
    console.log('closeModal called');
    setModal(null);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '3em',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
    },
  };

  return (
    <div className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item} onClick={() => openModal('projeto')}>
            Novo Projeto
          </li>
          <li className={styles.item} onClick={() => openModal('cliente')}>
            Novo Cliente
          </li>
          <li className={styles.item} onClick={() => openModal('tarefa')}>
            Nova Tarefa
          </li>
          <li className={styles.item}>
            <Link to="/Meu_Trabalho">Meu Trabalho</Link>
          </li>
        </ul>
        {modal === 'projeto' && (
          <Modal
            style={customStyles}
            isOpen={true}
            onRequestClose={closeModal}
            contentLabel="Novo Projeto"
          >
            <h2>Novo Projeto</h2>
            <p>Crie seu projeto para depois adicionar as tarefas:</p>
            <Novo_ProjetoForms btnText="Criar Projeto"/>
            <CloseButton closeModal={closeModal} />
          </Modal>
        )}
        {modal === 'cliente' && (
          <Modal
            style={customStyles}
            isOpen={true}
            onRequestClose={closeModal}
            contentLabel="Novo Cliente"
          >
            <h2>Novo Cliente</h2>
            <Novo_ClienteForms btnText="Criar Cliente" />
            <CloseButton closeModal={closeModal} />
          </Modal>
        )}
        {modal === 'tarefa' && (
          <Modal
            style={customStyles}
            isOpen={true}
            onRequestClose={closeModal}
            contentLabel="Nova Tarefa"
          >
            <h2>Nova Tarefa</h2>
            <Nova_TarefaForms btnText="Criar Tarefa" />
            <CloseButton closeModal={closeModal} />
          </Modal>
        )}
      </Container>
    </div>
  );
}

export default Navbar;
