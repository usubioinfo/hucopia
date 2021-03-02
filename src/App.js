import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { HNavbar } from 'components/HNavbar/HNavbar';
import { Home } from 'pages/Home/Home';

function App() {
  return (
    <Container fluid className="App px-0">
      <HNavbar/>
      <Home/>
    </Container>
  );
}

export default App;
