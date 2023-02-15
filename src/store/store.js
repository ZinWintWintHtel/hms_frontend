import { configureStore } from '@reduxjs/toolkit';
import assetReducer from '../components/layout/assets/assetSlice';
import operationReducer from '../components/layout/operations/operationSlice';
import serviceReducer from '../components/layout/services/serviceSlice';


export const store = configureStore({
    reducer:{
        asset : assetReducer,
        operation : operationReducer,
        service : serviceReducer
    }
})