import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import AdminProductSlice from './admin/products/product-slice'
import shopProductSlice from "./shop/product-slice"
import shopCartSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts : AdminProductSlice,
    shopProducts : shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress : shopAddressSlice
  }
})


export default store;