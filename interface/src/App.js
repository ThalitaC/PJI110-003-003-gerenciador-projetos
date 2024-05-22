import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Meu_Trabalho from './components/pages/Meu_Trabalho';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Meu_Trabalho" element={<Meu_Trabalho />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;