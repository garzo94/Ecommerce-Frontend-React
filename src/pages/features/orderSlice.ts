
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";

interface orderType  {
    name: string,
      image: string,
      total: number,
      price: number,
      id_prod: number,
}

interface orderDataType {
    idprod:number,
    qty:number,
    price:number

}

interface addressType{
    address:string,
    city:string,
    postalcode:string,
    country:string
}

interface dataType {
    orderItems:orderDataType[],
    totalPrice:number,
    shippingAddress:addressType
}

interface reviewType {
    rating:number,
    comment:string
}



type InitialStateType = {
  loading:boolean,
  error:string
  orderItems:orderType[],
}

const initialState:InitialStateType = {
  loading:false,
  error:'',
  orderItems:[],
}

// creating data
export const postOrders = createAsyncThunk('orders/postPorders', async ({data,token}:{data:dataType,token:string})=>{
    return fetch(`http://127.0.0.1:8000/api/orders/add/`, {method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}` },body:JSON.stringify(data)})
    .then((resp) => resp.json())
    .catch((err)=> console.log(err))
})

// creating view product
export const postReview = createAsyncThunk('orders/postReview', async ({id,data,token}:{id:number,data:reviewType,token:string},{rejectWithValue,fulfillWithValue})=>{
   try{
    const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/reviews/`, {method: 'POST',
   headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}` },body:JSON.stringify(data)})
console.log(response.status,'statusss')
   if(response.status === 401){
    throw new Error("Pleas login to review this item!")
  }if(response.status === 400){
    throw new Error("You alreadu have review this item")
  }
    return response.json()
}catch(error:any){

    throw new Error(error)
}

})

export const orderSlice = createSlice({

    name:'orders',
    initialState,
    reducers:{orderItems:(state, action)=>{
        state.orderItems = action.payload
    }
},
    extraReducers: builder=>{

        // creating data
        builder.addCase(postOrders.pending, state=>{
            state.loading = true
          })

        builder.addCase(
            postOrders.fulfilled,
            (state) => {
              state.loading = false

            })

        builder.addCase(postOrders.rejected, (state, ) => {
                state.loading = false
              })

    //   creating a product review
      builder.addCase(postReview.pending, state=>{
        state.loading = true
      })

    builder.addCase(
        postReview.fulfilled,
        (state) => {
          state.loading = false

        })

    builder.addCase(postReview.rejected, (state,action ) => {
            state.loading = false

            state.error = action.error.message || 'Something went wrong'
          })
}})

export default orderSlice.reducer
export const {orderItems} = orderSlice.actions
