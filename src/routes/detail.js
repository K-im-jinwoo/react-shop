import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';

function Detail(props) {

  let [alert, setAlert] = useState(true);
  let [numAlert, setNumAlert] = useState(false);
  let [num, setNum] = useState(0);
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id
  });
  useEffect(() => {
    let a = setTimeout(() => { setAlert(!alert) }, 2000)
    return () => {
      clearTimeout(a)
    }
  }, [])

  useEffect(() => {
    if (setNum(num) !== Number) {
      setNumAlert(!numAlert);
    }
  },[])

    return (
      <div className="container">
        {
          alert === true ?
            <div className="alert alert-warning">2초이내 구매시 할인</div> : null
        }
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes" + 찾은상품.id + ".jpg"} width="100%" />
          </div>
          <div className="col-md-6">
            {
              numAlert === true ?
              <div>경고: 숫자만 입력하세요!!!!</div> : null
            }
            <input
              onChange={(e) => (
                setNum(e.target.value)
              )}
              type={Text}
            ></input>
            
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    )
  
}

export default Detail