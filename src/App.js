import { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'
import './App.css';
import data from './data.js';

function App() {

  let [shoes] = useState(data)
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Jw의 Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'></div>
      <div className="container">
        <div className="row">
          {
            shoes.map((a, i) => {
              return (
                <List shoes={shoes[i]} i={i+1}></List>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

function List(props) {
  return (    
  <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"} alt="" width='80%' />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
  </div>
  )
}

export default App;
export { List };
