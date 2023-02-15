import React from "react";
import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { useParams,useNavigate } from "react-router-dom";
import {addNewService,selectServiceByPatientId,updateService} from './serviceSlice';

function AddServiceForm(props) {

    const {patientIdentifier} = useParams()
    const service = useSelector((state) => selectServiceByPatientId(state,Number(patientIdentifier)))
    const navigate = useNavigate()

    const [patientId,setPatientId] = useState(service?.patientId)
    const [doctorId,setDoctorId] = useState(service?.doctorId)
    const [serviceDate,setServiceDate] = useState(service?.serviceDate)
    const [doctorFees,setDoctorFees] = useState(service?.doctorFees)
    const [medicineFees,setMedicineFees] = useState(service?.medicineFees)
    const [nursingFees,setNursingFees] = useState(service?.nursingFees)
    const [assetFees,setAssetFees] = useState(service?.assetFees)
    const [operationFees,setOperationFees] = useState(service?.operationFees)
    const [checkupFees,setCheckupFees] = useState(service?.checkupFees)
    const [serviceAmount,setServiceAmount] = useState(service?.serviceAmount)
    const [addRequestStatus,setAddRequestStatus] = useState('idle')

    const onPatientIdInputChange = e => setPatientId(e.target.value)
    const onDoctorIdInputChange = e => setDoctorId(e.target.value)
    const onServiceDateInputChange = e => setServiceDate(e.target.value)
    const onDoctorFeesInputChange = e => setDoctorFees(e.target.value)
    const onNursingFeesInputChange = e => setNursingFees(e.target.value)
    const onMedicineFeesInputChange = e => setMedicineFees(e.target.value)
    const onAssetFeesInputChange = e => setAssetFees(e.target.value)
    const onCheckupFeesInputChange = e => setCheckupFees(e.target.value)
    const onOperationFeesInputChange = e => setOperationFees(e.target.value)
    const onServiceAmountInputChange = e => setServiceAmount(e.target.value)

    const canSave = [patientId,doctorId,serviceDate,doctorFees,nursingFees,medicineFees,assetFees,checkupFees,operationFees,serviceAmount].every(Boolean) && addRequestStatus === 'idle'
    const isEdit = props.mode === 'edit'

    const dispatch = useDispatch()

    const onServiceSubmit = e =>{
        e.preventDefault()

        setAddRequestStatus('pending')

        try{
        dispatch(
            isEdit ? 
            updateService({
                    patientId,
                    doctorId,
                    doctorFees,
                    serviceDate,
                    medicineFees,
                    nursingFees,
                    assetFees,
                    operationFees,
                    checkupFees,
                    serviceAmount
            }) : 
            addNewService({
            patientId,
            doctorId,
            doctorFees,
            serviceDate,
            medicineFees,
            nursingFees,
            assetFees,
            operationFees,
            checkupFees,
            serviceAmount
        })).unwrap()

        navigate('/dashboard')
        }catch(error){
            console.log(error)
        }finally{
            setAddRequestStatus('idle')
            setPatientId('')
            setDoctorId('')
            setServiceDate('')
            setDoctorFees('')
            setMedicineFees('')
            setNursingFees('')
            setAssetFees('')
            setOperationFees('')
            setCheckupFees('')
            setServiceAmount('')
        }
        
    }

    return (
        <React.Fragment>
        <div className='project'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <h5 claclassNamess='display-4 text-center'>Create / Edit Service Details</h5>
                    <hr />
                    <form onSubmit={onServiceSubmit}>
                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' 
                            placeholder="Patient ID" 
                            value={patientId}
                            onChange={onPatientIdInputChange}
                            disabled={isEdit}
                            />
                        </div>
                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' 
                            placeholder="Doctor ID"
                            value={doctorId}
                            onChange={onDoctorIdInputChange}
                            />
                        </div>
                        
                        <h6>Service Date</h6>
                        <div className='form-group'>
                            <input type="date" className='form-control form-control-lg'
                            value={serviceDate}
                            onChange={onServiceDateInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' 
                            placeholder="Doctor Fees"
                            value={doctorFees}
                            onChange={onDoctorFeesInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' 
                            placeholder="Medicine Fees"
                            value={medicineFees}
                            onChange={onMedicineFeesInputChange}
                             />
                        </div>

                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' placeholder="Nursing Fees" 
                            value={nursingFees}
                            onChange={onNursingFeesInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' placeholder="Asset Fees" 
                            value={assetFees}
                            onChange={onAssetFeesInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' placeholder="Operation Fees" 
                            value={operationFees}
                            onChange={onOperationFeesInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' placeholder="Checkup Fees" 
                            value={checkupFees}
                            onChange={onCheckupFeesInputChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' placeholder="Service Amount"
                            value={serviceAmount}
                            onChange={onServiceAmountInputChange}
                            />
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" 
                        value={isEdit ? 'Update' : 'Save'}
                            disabled={!canSave}
                        />
                    </form>
                </div>
            </div>
        </div>
    </div>
        </React.Fragment>
    );
}

export default AddServiceForm;