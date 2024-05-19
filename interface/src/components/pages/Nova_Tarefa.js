import Nova_TarefaForms from "../Nova_Tarefa/Nova_TarefaForms"
import styles from './Nova_Tarefa.module.css'


function Nova_Tarefa(){
    return (
        <div className = {styles.Nova_Tarefa_container}>
            <h1>Nova Tarefa</h1>
            <p>Coloque os dados do seu Cliente se não houver no banco de dados:</p>
            <Nova_TarefaForms btnText="Criar Tarefa" />

        </div>
    )
}

export default Nova_Tarefa