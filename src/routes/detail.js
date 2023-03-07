import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav, Card, Button } from 'react-bootstrap'
import { Context1 } from "./../App.js";
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";

function Detail(props) {

  let navigate = useNavigate() 
  let {재고} = useContext(Context1)

  let [탭, 탭변경] = useState(0);
  let [alerts, setAlert] = useState(true);
  let [num, setNum] = useState('');
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id
  });
  let [fade, setFade] = useState('');
  let dispatch = useDispatch();
  let [items, setItems] = useState(false);


  useEffect(() => {
    let a = setTimeout(() => { setAlert(!alerts) }, 2000)
    return () => {
      clearTimeout(a)
    }
  }, [])

  useEffect(() => {
    if (isNaN(num) == true) {
      alert('그러지마세요');
    }
  }, [num])
  
  useEffect(() => {
    setFade('end')
    return () => {
      setFade('');
    }
  }, [])

  useEffect(() => {
    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    if (꺼낸거.length !== 0) {
      setItems(true);
    }
    꺼낸거 = new Set(꺼낸거)
    꺼낸거.add(찾은상품.id)
    꺼낸거 = [...꺼낸거]
    localStorage.setItem('watched', JSON.stringify(꺼낸거));
  }, [])

  let 최근본상품 = localStorage.getItem('watched');
  최근본상품 = JSON.parse(최근본상품)

    return (
      <div className={"container start "+ fade }>
        {
          alert === true ?
            <div className="alert alert-warning">2초이내 구매시 할인</div> : null
        }
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes" + (찾은상품.id+1) + ".jpg"} width="100%" />
          </div>
          <div className="col-md-6 detail-wrap">
            <input
              onChange={(e) => (
                setNum(e.target.value)
              )}
              type={Text}
            ></input>
            {재고}
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}</p>
            <button className="btn btn-danger"
              onClick={() => {
                dispatch(addItem({ id: 찾은상품.id, name: 찾은상품.title , count: 0 }))
                navigate('/cart')
            }}
            >주문하기</button>
            <div className="card-wrap">
              <h4>최근 본 상품</h4>
              {
                최근본상품.map((a, i) => {
                  return(                    
                    items === true ?
                      <>
                        <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={"https://codingapple1.github.io/shop/shoes" + (최근본상품[i] + 1) + ".jpg"} />
                          <Card.Body>
                            <Card.Title>{ props.shoes[최근본상품[i]].title }</Card.Title>
                            <Card.Text>
                              {props.shoes[최근본상품[i]].content}
                            </Card.Text>
                            <Button variant="primary"
                              onClick={() => {
                                navigate('/cart')
                              }}
                            >
                              주문하기
                            </Button>
                          </Card.Body>
                        </Card> 
                      </> : null
                  )
                })
              }
            </div>
          </div>
        </div>

        <Nav defaultActiveKey="link-0" as="ul">
          <Nav.Item as="li">
            <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link-0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link onClick={()=>{ 탭변경(1)}} eventKey="link-1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link onClick={() => { 탭변경(2) }} eventKey="link-2">버튼2</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent 탭={ 탭 }/>
      </div>
    ) 
}

function TabContent({ 탭 }) {
  let [fade, setFade] = useState('')
  let { 재고 } = useContext(Context1)

  useEffect(() => {
    let a = setTimeout(() => { setFade('end') }, 100)
    
    return () => {
      clearTimeout(a);
      setFade('');
    }
  }, [탭])

  return (
    <div className={"start " + fade}>
      { [<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  )
}

export default Detail