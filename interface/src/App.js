import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/pages/Home'
import Novo_Cliente from './components/pages/Novo_Cliente'
import Nova_Tarefa from './components/pages/Nova_Tarefa'
import Novo_Projeto from './components/pages/Novo_Projeto'
import Meu_Trabalho from './components/pages/Meu_Trabalho'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
        

      <Navbar />
      <Container customClass="min-height">
      <Routes> 
          <Route exact path="/Home" element={<Home />} />
          <Route path="/Novo_Cliente" element={<Novo_Cliente />} />
          <Route path="/Novo_Projeto" element={<Novo_Projeto />} />
          <Route path="/Meu_Trabalho" element={<Meu_Trabalho />} />
          <Route path="/Nova_Tarefa" element={<Nova_Tarefa />} />
      </Routes>
      </Container>
      <Footer />  
    </Router>
  )
}

export default App