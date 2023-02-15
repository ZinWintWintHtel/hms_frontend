import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import {addNewAsset,selectAssetByPatientId,updateAsset} from './assetSlice';

function AddAssetForm(props) {  

    const {patientIdentifier} = useParams()
    const asset = useSelector( (state) => selectAssetByPatientId(state,Number(patientIdentifier)))
    const navigate = useNavigate()

    const [assetName,setAssetName] = useState(asset?.assetName)
    const [assetCategory,setAssetCategory] = useState(asset?.assetCategory)
    const [assetDescription,setAssetDescription] = useState(asset?.assetDescription)
    const [assetFees,setAssetFees] = useState(asset?.assetFees)
    const [patientId,setPatientId] = useState(asset?.patientId)
    const [startDate,setStartDate] = useState(asset?.startDate)
    const [endDate,setEndDate] = useState(asset?.endDate)
    const [addRequestStatus,setAddRequestStatus] = useState('idle')

    const onAssetNameInputChange = e => setAssetName(e.target.value)
    const onAssetCategoryInputChange = e => setAssetCategory(e.target.value)
    const onAssetDescriptionInputChange = e => setAssetDescription(e.target.value)
    const onAssetFeesInputChange = e => setAssetFees(e.target.value)
    const onPatientIdInputChange = e => setPatientId(e.target.value)
    const onStartDateInputChange = e => setStartDate(e.target.value)
    const onEndDateInputChange = e => setEndDate(e.target.value)

    const dispatch = useDispatch()

    const canSave = [assetName,assetCategory,assetDescription,assetFees,patientId,startDate,endDate].every(Boolean) && addRequestStatus === 'idle'
    const isEdit = props.mode === 'edit'


    const onAssetSubmit = e => {
        e.preventDefault()

        setAddRequestStatus('pending')

        try{
        dispatch(
            isEdit ? 
            updateAsset({
                assetName,
                assetCategory,
                assetDescription,
                patientId,
                assetFees,
                startDate,
                endDate
            }):
            addNewAsset({
                assetName,
                assetCategory,
                assetDescription,
                patientId,
                assetFees,
                startDate,
                endDate
        })).unwrap()

        navigate('/dashboard')
        }catch(error){
            console.log(error)
        }finally{
            setAddRequestStatus('idle')
            setAssetName('')
            setAssetCategory('')
            setAssetDescription('')
            setPatientId('')
            setAssetFees('')
            setStartDate('')
            setEndDate('')
        }

        
    }


    return (
        <div className='project'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <h5 claclassNamess='display-4 text-center'>Create / Edit Asset Item</h5>
                    <hr />
                    <form onSubmit={onAssetSubmit}>
                        <div className='form-group'>
                            <input 
                                type="text" 
                                className='form-control form-control-lg' 
                                placeholder="Asset Name" 
                                value={assetName}
                                onChange={onAssetNameInputChange}
                                />
                        </div>

                        <div className='form-group'>
                            <input 
                                type="text" 
                                className='form-control form-control-lg' 
                                placeholder="Category" 
                               value={assetCategory}
                               onChange={onAssetCategoryInputChange}
                                />
                        </div>
                        
                        <div className='form-group'>
                            <textarea className='form-control form-control-lg' 
                            placeholder="Description" 
                            value={assetDescription}
                            onChange={onAssetDescriptionInputChange}
                            ></textarea>
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
                            placeholder="Asset Fees" 
                            value={assetFees}
                            onChange={onAssetFeesInputChange}
                            />
                        </div>
                        <h6>Start Date</h6>
                        <div className='form-group'>
                            <input type="date" className='form-control form-control-lg'
                            value={startDate}
                            onChange={onStartDateInputChange}
                             />
                        </div>
                        <h6>End Date</h6>
                        <div className='form-group'>
                            <input type="date" className='form-control form-control-lg'  
                            value={endDate}
                            onChange={onEndDateInputChange}
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
    );
}

export default AddAssetForm;