import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import ServiceItem from './ServiceItem';
import {selectAllServices,getServiceError,getServiceStatus,fetchService} from './serviceSlice'

function ServiceList() {
    const service = useSelector( selectAllServices)
    const serviceStatus = useSelector(getServiceStatus)
    const serviceError = useSelector(getServiceError)

    const dispatch = useDispatch();

    useEffect(()=>{
        if(serviceStatus === 'idle'){
            dispatch(fetchService())
        }
    },[serviceStatus,dispatch])

    let content;

    if( serviceStatus === 'loading'){
        content = (<p>Loading...</p>)
    }

    if (serviceStatus === 'succeeded'){
        content = service.map( service => <ServiceItem 
            patientId = {service.patientId}
            doctorId = {service.doctorId}
            serviceDate = {service.serviceDate}
            doctorFees = {service.doctorFees}
            medicineFees = {service.medicineFees}
            nursingFees = {service.nursingFees}
            assetFees = {service.assetFees}
            operationFees = {service.operationFees}
            checkupFees = {service.checkupFees}
            serviceAmount = {service.serviceAmount}
        />
        )
    }

    if(serviceStatus === 'failed'){
        content = (<p>{serviceError}</p>)
    }

    return content;

}

export default ServiceList;