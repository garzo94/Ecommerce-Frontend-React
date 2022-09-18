import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
const url = 'http://127.0.0.1:8000/api/products/'

type productType = {
  name: string;
  img: string;
  desc: string;
  rating: number;
  price: number;
  reviews: number;
  id: string;
};

type InitialStateType = {
    loading:boolean,
    singleProduct:any,
    products: productType[],
    error: string
}

const initialState:InitialStateType = {
    loading: false,
    singleProduct:{},
    products:[],
    error:"noError"
}

export const getProducts = createAsyncThunk('products/getProducts',()=>{
    return fetch(url)
    .then((resp) => resp.json())
    .catch((err)=> console.log(err))
})

export const getProduct = createAsyncThunk('products/getProduct', async ({id}:{id:string})=>{
    return fetch(`http://127.0.0.1:8000/api/products/${id}`)
    .then((resp) => resp.json())
    .catch((err)=> console.log(err))
})

export const productSlice = createSlice({

    name:'products',
    initialState,
    reducers:{},
    extraReducers: builder=>{
      builder.addCase(getProducts.pending, state=>{
        state.loading = true
      })

      builder.addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<productType[]>) => {
          state.loading = false
          state.products = action.payload
          state.error = "noError"
        })

        builder.addCase(getProducts.rejected, (state, action) => {
            console.log('heey')
            state.loading = false
            state.products = []
            state.error = action.error.message || 'Something went wrong'
          })


          // fetch a single product

          builder.addCase(getProduct.pending, state=>{
            state.loading = true
          })

          builder.addCase(
            getProduct.fulfilled,
            (state, action: PayloadAction<productType>) => {
              state.loading = false
              state.singleProduct = action.payload
              state.error = "noError"
            })

            builder.addCase(getProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
              })
    }

    })

export default productSlice.reducer