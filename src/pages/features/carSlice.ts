
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
  loggedIn:boolean,
  totalPrice:number

}

const initialState:InitialStateType = {
  loading:false,
  error:'',
  items:[],
  loggedIn: false,
  totalPrice:0

}
// reading data
export const getCarItems = createAsyncThunk('car/getCarItems', async (token:string|null,{rejectWithValue, fulfillWithValue})=>{

    const response = await fetch('https://ecommerce-backend-django-production.up.railway.app/api/products/car/',   {
      headers:{
      'Authorization': `Bearer ${token}`,
}
  })
  if(!response.ok){

    return rejectWithValue(response.status);
  }

  return (await response.json())

})
// creating data
export const postCarItems = createAsyncThunk('car/postCarItems', async ({data,token}:{data:dataType,token:string})=>{
    return fetch(`https://ecommerce-backend-django-production.up.railway.app/api/products/car/`, {method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}` },body:JSON.stringify(data)})
    .then((resp) => resp.json())
    .catch((err)=> console.log(err))
})

// updating data
export const updateCarItems = createAsyncThunk('car/updateCarItems', async ({data,token}:{data:updateData, token:string})=>{
  return fetch(`https://ecommerce-backend-django-production.up.railway.app/api/products/car/${data.id}/`, {method: 'PUT',
  headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` }, body:JSON.stringify({total:data.total})})
  .then((resp) => resp.json())
  .catch((err)=> console.log(err))
})

// deleting data
export const deleteCarItems = createAsyncThunk('car/deleteCarItems', async ({id,token}:{id:number|number[],token:string|null},)=>{
  console.log(id,'que pasa aquiii')
  return fetch(`https://ecommerce-backend-django-production.up.railway.app/api/products/car/${id}/`, {method: 'DELETE',
  headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` }})

  .then((resp) => resp)
  .catch((err)=> console.log(err))
})

export const clearCarItems = createAsyncThunk('car/clearCarItems', async ({token}:{token:string|null},)=>{
  console.log(token,'token')
  return fetch(`https://ecommerce-backend-django-production.up.railway.app/api/products/deleteitems/`, {method: 'DELETE',
  headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` }})

  .then((resp) => resp)
  .catch((err)=> console.log(err))
})

export const carSlice = createSlice({

    name:'car',
    initialState,

    reducers:{totalPrice: (state, action)=>{

      state.totalPrice = action.payload
    },
 },
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

            state.loggedIn = true
            state.error = ''

          })

        builder.addCase(getCarItems.rejected, (state, action) => {

              state.loading = false
              state.loggedIn = false

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

      // clreat order items

      builder.addCase(clearCarItems.pending, state=>{
        state.loading = true
      })

    builder.addCase(
        clearCarItems.fulfilled,
        (state) => {
          state.loading = false

        })

    builder.addCase(clearCarItems.rejected, (state, ) => {
            state.loading = false
          })
}})

export default carSlice.reducer
export  const {totalPrice} = carSlice.actions
