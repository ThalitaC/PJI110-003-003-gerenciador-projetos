import Input from '../forms/Input'
import Select from '../forms/Select'
import SubmitButton from '../forms/SubmitButton'

import styles from './Novo_ClienteForms.module.css'

function Novo_ClienteForms({btnText}){
    return (
        <form className ={styles.forms}>
            <Input 
             type="text"
             text="Nome do Cliente"
             name="name"
             placeholder="Insira o nome do Cliente"
            /> 
           <Input 
             type="text"
             text="Empresa do Cliente"
             name="budget"
             placeholder="Insira o nome da empresa"
            /> 
            <Select name ="category_id" text="Selecione a categoria"/>
            <SubmitButton text={btnText}/>
        </form>
    )
}


export default Novo_ClienteForms