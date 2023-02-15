import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const GET_ALL_OPERATION = 'http://localhost:8484/api/operation/all';
const POST_NEW_OPERATION = 'http://localhost:8484/api/operation/create';
const DELETE_OPERATION = 'http://localhost:8484/api/operation/delete/';

export const fetchOperation = createAsyncThunk('operation/fetchOperation',async ()=>{
    const response = await axios.get(GET_ALL_OPERATION)

    return response.data
})

export const addNewOperation = createAsyncThunk('operation/addNewOperation', async(initialOperation)=>{
    const response = await axios.post(POST_NEW_OPERATION,initialOperation);

    return response.data
})

export const updateOperation = createAsyncThunk('operation/updateOperation', async(initialOperation)=>{
    const response = await axios.post(POST_NEW_OPERATION,initialOperation);

    return response.data
})

export const deleteOperation = createAsyncThunk('operation/deleteOperation',async(patientIdentifier)=>{
    const response = await axios.delete(`${DELETE_OPERATION}${patientIdentifier}`);

    return response.data
})

const initialState = {
    operation : [],
    status : 'idle',
    error : null
}

export const operationSlice = createSlice({
    name : 'operationSlice',
    initialState,
    reducers:{
        addOperation : {
            reducer(state,action){
                state.push(action.payload)
            },
            prepare(operationName,operationType,operationFees,operationDescription,patientId,doctorId,operationDate){
                return{
                    payload:{
                        operationName,
                        operationType,
                        operationFees,
                        operationDescription,
                        patientId,
                        doctorId,
                        operationDate
                    }
                }
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchOperation.pending,(state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchOperation.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.operation = action.payload
            })
            .addCase(fetchOperation.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewOperation.fulfilled,(state,action)=>{
                state.operation.push(action.payload)
            })
            .addCase(updateOperation.fulfilled,(state,action)=>{
                const operation = action.payload
                const operations = state.operation.filter(op => op.patientId !== operation.patientId)
                state.operation = [operation,...operations]
            })
            .addCase(deleteOperation.fulfilled,(state,action)=>{
                const patientIdentifier = action.payload
                const operations = state.operation.filter(op => op.patientId !== patientIdentifier)
                state.operation = operations
            })
    }
})

export const selectAllOperation = state => state.operation.operation
export const getOperationStatus = state => state.operation.status
export const getOperationError = state => state.operation.error
export const selectOperationByPatientId = (state,patientIdentifier) => state.operation.operation.find(operation => operation.patientId === patientIdentifier)

export const {addOperation} = operationSlice.actions
export default operationSlice.reducer