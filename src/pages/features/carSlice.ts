
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";



type dataType = {
    id_prod:number,
    total:number,
}

type updateData = {
  id:number,
  total:number
}

type InitialStateType = {
  loading:boolean,
  error:string
  items:dataType[],

}

const initialState:InitialStateType = {
  loading:false,
  error:'',
  items:[],

}
// reading data
export const getCarItems = createAsyncThunk('car/getCarItems', ()=>{
    return fetch('http://127.0.0.1:8000/api/products/car/')
    .then((resp) => resp.json())
    .catch((err)=> console.log(err))
})
// creating data
export const postCarItems = createAsyncThunk('car/postCarItems', async (data:dataType)=>{
    return fetch(`http://127.0.0.1:8000/api/products/car/`, {method: 'POST',
    headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)})
    .then((resp) => resp.json())
    .catch((err)=> console.log(err))
})

// updating data
export const updateCarItems = createAsyncThunk('car/updateCarItems', async (data:updateData,)=>{
  return fetch(`http://127.0.0.1:8000/api/products/car/${data.id}/`, {method: 'PUT',
  headers: { 'Content-Type': 'application/json' }, body:JSON.stringify({total:data.total})})
  .then((resp) => resp.json())
  .catch((err)=> console.log(err))
})

// deleting data
export const deleteCarItems = createAsyncThunk('car/deleteCarItems', async (id:number,)=>{
  return fetch(`http://127.0.0.1:8000/api/products/car/${id}/`, {method: 'DELETE'})

  .then((resp) => resp.json())
  .catch((err)=> console.log(err))
})

export const carSlice = createSlice({

    name:'car',
    initialState,

    reducers:{},
    extraReducers: builder=>{
        // geting data
        builder.addCase(getCarItems.pending, state=>{
          state.loading = true
        })

        builder.addCase(
          getCarItems.fulfilled,
          (state, action: PayloadAction<dataType[]>) => {
            state.loading = false
            state.items = action.payload
            state.error = 'noError'

          })

        builder.addCase(getCarItems.rejected, (state, action) => {
              console.log('heey')
              state.loading = false
              state.items = []
              state.error = action.error.message || 'error'

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

        builder.addCase(postCarItems.rejected, (state, ) => {
                state.loading = false
              })

        // updating data

        builder.addCase(updateCarItems.pending, state=>{
          state.loading = true
        })

      builder.addCase(
          updateCarItems.fulfilled,
          (state) => {
            state.loading = false

          })

      builder.addCase(updateCarItems.rejected, (state, ) => {
              state.loading = false
            })

      // delete data
      builder.addCase(deleteCarItems.pending, state=>{
        state.loading = true
      })

    builder.addCase(
        deleteCarItems.fulfilled,
        (state) => {
          state.loading = false

        })

    builder.addCase(deleteCarItems.rejected, (state, ) => {
            state.loading = false
          })
}})

export default carSlice.reducer
// export  const {addCar} = carSlice.actions