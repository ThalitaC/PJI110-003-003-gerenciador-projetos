import { Link } from "react-router-dom";
import Container from "./Container";

import styles from "./Navbar.module.css";
import logo from "../../img/logo.jpg"

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Container>
        <Link to="/Home">
          <img src={logo} alt="Logo" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
           <Link to="/Home">Home</Link>    
          </li>
          <li className={styles.item}>
            <Link to="/Novo_Projeto">Novo Projeto</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Novo_Cliente">Novo Cliente</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Nova_Tarefa">Nova Tarefa</Link>
          </li>
          <li className={styles.item}>
            <Link to="/Meu_Trabalho">Meu Trabalho</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Navbar;

