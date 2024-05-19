import Novo_ClienteForms from "../Novo_Cliente/Novo_ClienteForms"
import styles from './Novo_Cliente.module.css'


function Novo_Cliente(){
    return (
        <div className = {styles.Novo_Cliente_container}>
            <h1>Novo Cliente</h1>
            <p>Coloque os dados do seu Cliente se não houver no banco de dados:</p>
            <Novo_ClienteForms btnText="Criar Cliente" />

        </div>
    )
}

export default Novo_Cliente