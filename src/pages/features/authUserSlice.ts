import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
type authUserType = {
  refresh:string,
  access:string,
  id:number | null,
  _id:number | null,
  username:string,
  name:string,
  email: string,
  token:string,

}

type initialStateType = {
    loading:boolean,
    error:string,
    authUser:authUserType,
    isAuthenticated : boolean
}

const initialState:initialStateType = {
    loading:false,
    error:'',
    authUser:{ refresh:'',
        access:'',
        id:null,
        _id:null,
        username:'',
        name:'',
        email: '',
        token:'',},
    isAuthenticated:false
}


    // const getToken = localStorage.getItem("authToken")






// Login
export const loginUser = createAsyncThunk('login/user',async (data:{username:string, password:string})=>{

    return fetch(`https://ecommerce-backend-django-production.up.railway.app/api/users/login/`,{
        method:'POST',
        body:JSON.stringify(data),

    headers:{
        'Content-Type': 'application/json',

    }})
    .then((resp)=>{if(!resp.ok){return Promise.reject()}return resp.json()} )
    .catch((err)=>  Promise.reject())
})

// Sign up
export const signupUser = createAsyncThunk('register/user',async (data:{name:string,email:string, password:string})=>{

    return fetch(`https://ecommerce-backend-django-production.up.railway.app/api/users/register/`,{
        method:'POST',
        body:JSON.stringify(data),

    headers:{
        'Content-Type': 'application/json',

    }})
    .then((resp)=>{if(!resp.ok){return Promise.reject()}return resp.json()} )
    .catch((err)=>  Promise.reject())
})



export const authUserSlice = createSlice({
    name:'login',
    initialState,
    reducers:{ logout: (state)=>{
        localStorage.removeItem('authToken')
        state.isAuthenticated = false
    }},
    extraReducers: buillder =>{

        //Login
        buillder.addCase(loginUser.pending, state=>{
            state.loading = true
        })

    buillder.addCase(
            loginUser.fulfilled, (state, action:PayloadAction<authUserType>)=>{
                state.loading = false
                state.authUser = action.payload
                localStorage.setItem("authToken", action.payload.token);
                state.isAuthenticated = true
                state.error = ''

            })

    buillder.addCase(
        loginUser.rejected, (state, action)=>{
            state.isAuthenticated = false
            state.loading = false
            state.error = 'Invalid credentials, try again!'
        })

        // sign up
  buillder.addCase(signupUser.pending, state=>{
    state.loading = true
})

buillder.addCase(
    signupUser.fulfilled, (state, action:PayloadAction<authUserType>)=>{
        state.loading = false
        state.authUser = action.payload
        localStorage.setItem("authToken", action.payload.token);
        state.isAuthenticated = true
        state.error = ''

    })

buillder.addCase(
    signupUser.rejected, (state, action)=>{
    state.isAuthenticated = false
    state.loading = false
    state.error = 'Invalid credentials, try again!'
})


    }})


export default authUserSlice.reducer
export const {logout} = authUserSlice.actions