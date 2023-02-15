import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GET_ALL_SERVICE = 'http://localhost:8484/api/service/all';
const POST_NEW_SERVICE = 'http://localhost:8484/api/service/create';
const DELETE_SERVICE = 'http://localhost:8484/api/service/delete/';

export const fetchService = createAsyncThunk('service/fetchService',async()=>{
    const response = await axios.get(GET_ALL_SERVICE)
    return response.data
})

export const addNewService = createAsyncThunk('service,addNewService',async(initialService)=>{
    const response = await axios.post(POST_NEW_SERVICE,initialService)

    return response.data
})

export const updateService = createAsyncThunk('service,updateService',async(initialService)=>{
    const response = await axios.post(POST_NEW_SERVICE,initialService)

    return response.data
})

export const deleteService = createAsyncThunk('service/deleteService',async(patientIdentifier)=>{
    const response = await axios.delete(`${DELETE_SERVICE}${patientIdentifier}`)
    return response.data
})

const initialState = {
    service : [],
    status : 'idle',
    error : null
}

export const serviceSlice = createSlice({
    name : 'serviceSlice',
    initialState,
    reducers : {
        addService : {
            reducer(state,action){
                state.push(action.payload)
            },
            prepare(patientId,doctorId,serviceDate,doctorFees,medicineFees,nursingFees,assetFees,operationFees,checkupFees,serviceAmount){
                return{
                    payload:{
                        patientId,
                        doctorId,
                        serviceDate,
                        doctorFees,
                        medicineFees,
                        nursingFees,
                        assetFees,
                        operationFees,
                        checkupFees,
                        serviceAmount
                    }
                }
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchService.pending,(state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchService.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.service = action.payload
            })
            .addCase(fetchService.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewService.fulfilled,(state,action)=>{
                state.service.push(action.payload)
            })
            .addCase(updateService.fulfilled,(state,action)=>{
                const service = action.payload
                const services = state.service.filter(ser => ser.patientId !== service.patientId)
                state.service = [service,...services]
            })
            .addCase(deleteService.fulfilled,(state,action)=>{
                const patientIdentifier = action.payload
                const services = state.service.filter(ser => ser.patientId !== patientIdentifier)
                state.service = services
            })
    }
})

export const selectAllServices = state => state.service.service
export const getServiceStatus = state => state.service.status
export const getServiceError = state => state.service.error
export const selectServiceByPatientId = (state,patientIdentifier) => state.service.service.find( service => service.patientId === patientIdentifier)


export const {addService} = serviceSlice.actions
export default serviceSlice.reducer