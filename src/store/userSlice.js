import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',
  initialState: { name: 'KIM', age: 25 },
  reducers: {
    changeName(state) {
      state.name = 'park'
    },
    changeAge(state, action) {
      state.age = state.age + action.payload
    }
  }
})

export let { changeName, changeAge } = user.actions

export default user