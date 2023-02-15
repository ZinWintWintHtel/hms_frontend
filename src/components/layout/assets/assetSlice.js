import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GET_ALL_ASSET = 'http://localhost:8484/api/asset/all';
const POST_NEW_ASSET = 'http://localhost:8484/api/asset/create';
const DELETE_ASSET = 'http://localhost:8484/api/asset/delete/';

export const fetchAsset = createAsyncThunk('asset/fetchAsset',async ()=>{
    const response = await axios.get(GET_ALL_ASSET)
    return response.data
})

export const addNewAsset = createAsyncThunk('asset/addNewAsset',async(initialAsset)=>{
    const response = await axios.post(POST_NEW_ASSET,initialAsset)
    return response.data
})

export const updateAsset = createAsyncThunk('asset/updateAsset',async(initialAsset)=>{
    const response = await axios.post(POST_NEW_ASSET,initialAsset)
    return response.data
})

export const deleteAsset = createAsyncThunk('asset/deleteAsset',async(patientIdentifier)=>{
    const response = await axios.delete(`${DELETE_ASSET}${patientIdentifier}`)
    return response.data
})

const initialState = {
    asset : [],
    status : 'idle',
    error:null
}

export const assetSlice = createSlice({
    name : 'assetSlice',
    initialState,
    reducers:{
        addAsset : {
            reducer(state,action){
                state.push(action.payload)
            },
            prepare(assetName,assetCategory,assetDescription,patientId,assetFees,startDate,endDate){
                return {
                    payload:{
                        assetName,
                        assetCategory,
                        assetDescription,
                        patientId,
                        assetFees,
                        startDate,
                        endDate
                    }   
                }
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchAsset.pending,(state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchAsset.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.asset = action.payload
            })
            .addCase(fetchAsset.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewAsset.fulfilled,(state,action)=>{
                state.asset.push(action.payload)
            })
            .addCase(updateAsset.fulfilled,(state,action) =>{
                const asset = action.payload
                const assets = state.asset.filter(a => a.patientId !== asset.patientId)
                state.asset = [asset,...assets]
            })
            .addCase(deleteAsset.fulfilled,(state,action)=>{
                const patientIdentifier = action.payload
                const assets = state.asset.filter(a => a.patientId !== patientIdentifier)
                state.asset = assets
            })
    }
})


export const selectAllAssets = state => state.asset.asset
export const getAssetStatus = state => state.asset.status
export const getAssetError = state => state.asset.error
export const selectAssetByPatientId = (state,patientIdentifier) => state.asset.asset.find(asset => asset.patientId === patientIdentifier)

export const {addAsset} = assetSlice.actions
export default assetSlice.reducer
