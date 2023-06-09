import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";


const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
    cartLoadingStatus: 'idle',
    cart: []
});


export const fetchCart = createAsyncThunk(
    'products/fetchCart',
     async () => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/cart/`)
    }
)

export const fetchCartInOrders = createAsyncThunk(
    'products/fetchCartInOrders',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:8000/cart_in_orders/`)
    }
)

export const fetchAdminCart = createAsyncThunk(
    'products/fetchAdminCart',
     async () => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/admin_carts/`)
    }
)

export const fetchUpdateCart = createAsyncThunk(
    'products/fetchUpdateCart',
     async (data) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/carts/${data.id}/`, 'PUT', {
            client: data.client,
            weight_selection: data.weight_selection,
            product_count: data.product_count
     })
})

export const fetchProductInCart = createAsyncThunk(
    'products/fetchProductInCart',
     async (data) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/product_cart/${data.product}/${data.weight_selection}/`)
})

export const fetchDeleteProductInCart = createAsyncThunk(
    'products/fetchDeleteProductInCart',
     async (id) => {
         const {request} = useHttp();
         return await request(`http://localhost:8000/carts/${id}/`, 'DELETE')
})


const cartSlice = createSlice({
    name: 'getCart',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchCart.pending, state => {
                state.cartLoadingStatus = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartLoadingStatus = 'success';
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, state => {state.cartLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {reducer} = cartSlice;
export default reducer;
