import Novo_ProjetoForms from "../Novo_Projeto/Novo_ProjetoForms"
import styles from './Novo_Projeto.module.css'


function Novo_Projeto(){
    return (
        <div className = {styles.Novo_Projeto_container}>
            <h1>Novo Projeto</h1>
            <p>Crie seu projetos para depois adicionar as tarefas:</p>
            <Novo_ProjetoForms btnText="Criar projeto" />

        </div>
    )
}

export default Novo_Projeto