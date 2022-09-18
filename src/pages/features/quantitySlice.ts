
import {createSlice, PayloadAction} from "@reduxjs/toolkit";




type InitialStateType = {
    qty:number,

}

const initialState:InitialStateType = {
    qty: 1,

}

export const quantitySlice = createSlice({

    name:'quantity',
    initialState,
    reducers:{
        quantity: (state,action: PayloadAction<number>)=>{
            state.qty = action.payload
        }
    },

    })

export default quantitySlice.reducer
export  const {quantity} = quantitySlice.actions