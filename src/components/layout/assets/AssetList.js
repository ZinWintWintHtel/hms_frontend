import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import AssetItem from './AssetItem';
import {selectAllAssets,getAssetError,getAssetStatus,fetchAsset} from './assetSlice';

function AssetList() {
    const asset = useSelector( selectAllAssets )
    const assetStatus = useSelector(getAssetStatus)
    const assetError = useSelector(getAssetError)
    
    const dispatch = useDispatch();

    useEffect(()=>{
        if(assetStatus === 'idle'){
            dispatch(fetchAsset())
        }
    },[assetStatus,dispatch])

    let content;

    if(assetStatus === 'loading'){
        content = (<p>Loading....</p>)
    }
    if(assetStatus === 'succeeded'){
        content = asset.map( asset => <AssetItem 
            assetName = {asset.assetName}
            assetCategory = {asset.assetCategory}
            assetDescription = {asset.assetDescription}
            assetFees = {asset.assetFees}
            patientId = {asset.patientId}
            startDate = {asset.startDate}
            endDate = {asset.endDate}
        />    
        )
    }

    if( assetStatus === 'failed'){
        content =(<p>{assetError}</p>)
    }
    return content

}

export default AssetList;