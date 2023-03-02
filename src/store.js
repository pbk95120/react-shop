import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
        changeName(state){
            state.name ='park'
        },

        increase(state){
            state.age += 1
        },
    }
})

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action){
            let num =state.findIndex((a)=>{ return a.id == action.payload})
            state[num].count++
        },

        addItem(state, action){
            state.push(action.payload)
        }
    }
    
})

export default configureStore({
  reducer: { 
    user : user.reducer,
    cart : cart.reducer
  }
})

export let { changeName, increase } = user.actions
export let { addCount, addItem } = cart.actions  