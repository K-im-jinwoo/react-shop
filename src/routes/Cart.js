import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeAge } from './../store/userSlice.js'
import { changeCount, deleteItem } from './../store.js'

function Cart() {

  let a = useSelector((state) => state )
  let dispatch = useDispatch()

  return (
    <div>
      {a.user.name} {a.user.age}의 장바구니
      <button onClick={() => {
        dispatch(changeAge(1))
      }}>버튼</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {
            a.cart.map((b,i) => {
              return (
                <tr key={i}>
                  <td>{a.cart[i].id}</td>
                  <td>{a.cart[i].name}</td>
                  <td>{a.cart[i].count}</td>
                  <td>
                    <button onClick={() => {
                      dispatch(changeCount(a.cart[i].id))
                    }}>
                      +
                    </button>
                  </td>
                  <td>
                    <button onClick={(e) => {
                      let b = e.target.parentElement;
                      dispatch(deleteItem(b.parentElement))
                    }}>
                      삭제
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Cart