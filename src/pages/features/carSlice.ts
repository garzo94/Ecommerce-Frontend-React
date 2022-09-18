
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";

type carItems = {
    idProduct: number;
    totalProduct: number
  };

type dataType = {
    id_prod:number,
    total:number,
}


type InitialStateType = {
    items:carItems[],
   loading:boolean
}

const initialState:InitialStateType = {
    items:[],
    loading:false
}

export const getCarItems = createAsyncThunk('car/getCarItems', async ({id}:{id:number})=>{
    return fetch(`http://127.0.0.1:8000/api/car/${id}`)
    .then((resp) => resp.json())
    .catch((err)=> console.log(err))
})

export const postCarItems = createAsyncThunk('car/postCarItems', async (data:dataType)=>{
    return fetch(`http://127.0.0.1:8000/api/car/`, {method: 'POST',
    headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)})
    .then((resp) => resp.json())
    .catch((err)=> console.log(err))
})

export const carSlice = createSlice({
    name:'car',
    initialState,
    reducers:{ addCar: (state,{payload} )=>{

       state.items = state.items.filter((ite)=>ite.idProduct !== payload.idProduct)
    //    console.log(payload)
       state.items.push(payload)

    }},
    extraReducers: builder=>{
        // geting data
        builder.addCase(getCarItems.pending, state=>{
          state.loading = true
        })

        builder.addCase(
          getCarItems.fulfilled,
          (state, action: PayloadAction<carItems[]>) => {
            state.loading = false
            state.items = action.payload
          })

        builder.addCase(getCarItems.rejected, (state, action) => {
              console.log('heey')
              state.loading = false
              state.items = []
            })

        // creating data

        builder.addCase(postCarItems.pending, state=>{
            state.loading = true
          })

        builder.addCase(
            postCarItems.fulfilled,
            (state) => {
              state.loading = false
            })

        builder.addCase(postCarItems.rejected, (state, action) => {
                state.loading = false
              })



}})

export default carSlice.reducer
export  const {addCar} = carSlice.actions