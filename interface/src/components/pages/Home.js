import styles from './Home.module.css'
import gestao from '../../img/gestao.jpg'
import LinkButton from '../layout/LinkButton'


function Home() {
    return (
        <section className={styles.home_container}>
            <h1>
                Página inicial do <span>Gerenciador de Projetos</span>
            </h1>
            <p>Clique nos links acima para começar a criar novos projetos ou clientes, ou abaixo para gerenciar seus trabalhos!</p>
            <LinkButton to ="/Meu_Trabalho" text="Meu Trabalho"></LinkButton>
            <img src={gestao} alt ="Gestão"/>
        </section>
    )
}

export default Home