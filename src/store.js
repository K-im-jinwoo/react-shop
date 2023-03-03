import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'


let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12]
})


let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 }
  ],
  reducers: {
    changeCount(state, action) {
      let 번호 = state.findIndex((a)=>{return a.id === action.payload })
        state[번호].count = state[번호].count + 1
    },
    addItem(state, action) {
      let 번호 = state.findIndex((a) => { return a.id === action.payload })
      if (state in action.payload) {
        state[번호].count = state[번호].count + 1
      } else {
        state.push(action.payload);
      }
    },
    deleteItem(state, action) {
      delete state[action.payload]
    }
  }
})

export let { changeCount, addItem, deleteItem } = cart.actions



export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer
  }
})