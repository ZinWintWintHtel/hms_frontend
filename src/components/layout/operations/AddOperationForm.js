import React from "react";
import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { useParams,useNavigate } from "react-router-dom";
import {addNewOperation,selectOperationByPatientId,updateOperation} from './operationSlice';

function AddOperationForm(props) {

    const {patientIdentifier} = useParams()
    const operation = useSelector((state)=> selectOperationByPatientId(state,Number(patientIdentifier)))
    const navigate = useNavigate()

    const [operationName,setOperationName] = useState(operation?.operationName)
    const [operationType,setOperationType] = useState(operation?.operationType)
    const [operationFees,setOperationFees] = useState(operation?.operationFees)
    const [operationDescription,setOperationDescription] = useState(operation?.operationDescription)
    const [patientId,setPatientId] = useState(operation?.patientId)
    const [doctorId,setDoctorId] = useState(operation?.doctorId)
    const [operationDate,setOperationDate] = useState(operation?.operationDate)
    const [addRequestStatus,setAddRequestStatus] = useState('idle')

    const onOperationNameInputChange = e => setOperationName(e.target.value)
    const onOperationTypeInputChange = e => setOperationType(e.target.value)
    const onOperationFeesInputChange = e => setOperationFees(e.target.value)
    const onOperationDescriptionInputChange = e => setOperationDescription(e.target.value)
    const onPatientIdInputChange = e => setPatientId(e.target.value)
    const onDoctorIdInputChange = e => setDoctorId(e.target.value)
    const onOperationDateInputChange = e => setOperationDate(e.target.value)

    const dispatch = useDispatch()

    const canSave = [operationName,operationType,operationFees,operationDescription,patientId,doctorId,operationDate].every(Boolean) && addRequestStatus === 'idle'
    const isEdit = props.mode === 'edit'
    

    const onOperationSubmit = e =>{
        e.preventDefault()

        setAddRequestStatus('pending')

        try{
        dispatch(
            isEdit ? 
            updateOperation({
                operationName,
                operationType,
                operationFees,
                operationDescription,
                patientId,
                doctorId,
                operationDate
            }):
            addNewOperation({
            operationName,
            operationType,
            operationFees,
            operationDescription,
            patientId,
            doctorId,
            operationDate
            })).unwrap()

            navigate('/dashboard')
        }catch(error){
            console.log(error)
        }finally{
            setAddRequestStatus('idle')
            setOperationName('')
            setOperationType('')
            setOperationFees('')
            setOperationDescription('')
            setPatientId('')
            setDoctorId('')
            setOperationDate('') 
        }
        
    }

    return (
        <React.Fragment>
        <div className='project'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <h5 claclassNamess='display-4 text-center'>Create / Edit Operation Details</h5>
                    <hr />
                    <form onSubmit={onOperationSubmit}>
                        
                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' 
                            placeholder="Operation Name" 
                            value={operationName}
                            onChange={onOperationNameInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' 
                            placeholder="Operation Type"
                            value={operationType}
                            onChange={onOperationTypeInputChange}
                            />
                        </div>

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

                        <div className='form-group'>
                            <input type="text" className='form-control form-control-lg' 
                            placeholder="Operation Fees"
                            value={operationFees}
                            onChange={onOperationFeesInputChange}
                            />
                        </div>
                        
                        <div className='form-group'>
                            <textarea className='form-control form-control-lg' 
                            placeholder="Operation Description"
                            value={operationDescription}
                            onChange={onOperationDescriptionInputChange}
                            ></textarea>
                        </div>
                        <h6>Operation Date</h6>
                        <div className='form-group'>
                            <input type="date" className='form-control form-control-lg'
                            value={operationDate}
                            onChange={onOperationDateInputChange}
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

export default AddOperationForm;