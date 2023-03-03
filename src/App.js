import { createContext, useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'
import './App.css';
import data from './data.js';
import Detail from './routes/detail.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import Cart from './routes/Cart.js';

export let Context1 = createContext()

function App() {

  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(0);
  let [loading, setLoading] = useState(true);
  let [재고] = useState([10, 11, 12]);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Jw의 Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      
      <Routes>
        <Route path='/' element={<div><>
          <div className='main-bg'></div>
          <div className="container">
            <div className="row">
              {
                shoes.map((a, i) => {
                  return (
                    <List
                      shoes={shoes[i]} i={i + 1}
                    ></List>
                  )
                })
              }
            </div>
          </div>
        </></div>} />
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ 재고 }}>
            <Detail shoes={shoes}></Detail>
          </Context1.Provider>
          } />
        
        <Route path='/cart' element={<Cart />} />

        <Route path='*' element={<div>없는 페이지요</div>} />
        <Route path='/about' element={<About />} >
          <Route path="member" element={<div>멤버임</div> } />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path='/event' element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div> } />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
      </Routes>


      {
        loading === false ?
          <div>로딩중입니다.</div> : null
      }
      <button onClick={() => {
        setLoading(!loading);
        if (count === 0) {
          axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
              let copy = [...shoes, ...result.data];
              setCount(count+1)
              setShoes(copy)
              setLoading(true);
            })
            .catch(() => {
              console.log('실패')
              setLoading(true);
          })
        } else if (count === 1) {
          axios.get('https://codingapple1.github.io/shop/data3.json')
            .then((result) => {
              console.log(result.data)
              let copy = [...shoes, ...result.data];
              setCount(count + 1)
              setShoes(copy)
              setLoading(true);
            })
            .catch(() => {
              console.log('실패')
              setLoading(true);
            })
        } else if (count >= 2) {
          alert('더 상품이 없습니다.')
          setLoading(true);
        }
      }}>더보기</button>
    </div>
  );
}
function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


function List(props) {
  let navigate = useNavigate();

  return (    
    <div
      onClick={()=>{navigate('/detail/'+props.shoes.id )}}
      className="col-md-4"
    >
      <img src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"} alt="" width='80%' />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
  </div>
  )
}

export default App;
export { List };
