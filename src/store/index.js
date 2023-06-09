import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../api/apiSlice";
import authUser from "../api/userSlice";
import getProduct from "../components/products/productSlice";
import getOrders from "../components/orders/orderSlice";
import getCart from "../components/clientCart/cartSlice";
import getReview from "../components/reviews/reviewsSlice"
// Server side with csurf middleware
const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
}

const store = configureStore({
    reducer: {authUser, getProduct, getOrders, getCart, getReview, [apiSlice.reducerPath]: apiSlice.reducer,},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;