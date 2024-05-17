import Novo_ProjetoForms from "../Novo_Projeto/Novo_ProjetoForms"

function Novo_Cliente(){
    return (
        <div>
            <h1>Novo Cliente</h1>
            <p>Se o cliente não existe no banco de dados, insira abaixo as inforações para criar um cadastro do novo cliente:</p>
            <Novo_ProjetoForms />

        </div>
    )
}

export default Novo_Cliente