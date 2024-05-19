import Input from '../forms/Input'
import Select from '../forms/Select'
import SubmitButton from '../forms/SubmitButton'

import styles from './Nova_TarefaForms.module.css'

function Nova_TarefaForms({btnText}){
    return (
        <form className ={styles.forms}>
            <Input 
             type="text"
             text="Nome da Tarefa"
             name="name"
             placeholder="Insira o nome da Tarefa"
            /> 
           <Input 
             type="number"
             text="Duração da Tarefa em horas"
             name="duracao"
             placeholder="Insira o tempo total em horas"
            /> 
            <Select name ="category_id" text="Selecione a categoria"/>
            <SubmitButton text={btnText}/>
        </form>
    )
}


export default Nova_TarefaForms