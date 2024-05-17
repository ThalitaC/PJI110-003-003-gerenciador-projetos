import Input from '../forms/Input'
import Select from '../forms/Select'
import SubmitButton from '../forms/SubmitButton'

import styles from './Novo_ProjetoForms.module.css'

function Novo_ProjetoForms({btnText}){
    return (
        <form className ={styles.forms}>
            <Input 
             type="text"
             text="Nome do projeto"
             name="name"
             placeholder="Insira o nome do projeto"
            /> 
           <Input 
             type="number"
             text="Orçamento do projeto"
             name="budget"
             placeholder="Insira o orçamento total"
            /> 
            <Select name ="category_id" text="Selecione a categoria"/>
            <SubmitButton text={btnText}/>
        </form>
    )
}


export default Novo_ProjetoForms