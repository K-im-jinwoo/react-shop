import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap'
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
          <div className="col-md-6">
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