import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import OperationItem from './OperationItem';
import {selectAllOperation,fetchOperation,getOperationError,getOperationStatus} from './operationSlice';

function OperationList() {
    const operation = useSelector( selectAllOperation)
    const operationStatus = useSelector( getOperationStatus)
    const operationError = useSelector(getOperationError)

    const dispatch = useDispatch();

    useEffect(()=>{
        if(operationStatus === 'idle'){
            dispatch(fetchOperation())
        }
    },[operationStatus,dispatch])

    let content;

    if(operationStatus === 'loading'){
        content = (<p>Loading....</p>)
    }

    if(operationStatus === 'succeeded'){
        content = operation.map( operation => <OperationItem
            operationName = {operation.operationName}
            operationType = {operation.operationType}
            operationDescription = {operation.operationDescription}
            operationFees = {operation.operationFees}
            operationDate = {operation.operationDate}
            patientId = {operation.patientId}
            doctorId = {operation.doctorId}
        />
        )
    }

    if(operationStatus === 'failed'){
        content=(<p>{operationError}</p>)
    }

    
    return content;
}

export default OperationList;