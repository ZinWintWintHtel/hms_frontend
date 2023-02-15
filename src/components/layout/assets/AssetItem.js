import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteAsset } from './assetSlice';
import { useState } from 'react';
import ConfirmModal from '../utility/ConfirmModal';
import Backdrop from '../utility/Backdrop';

function AssetItem(props) {

    const dispatch = useDispatch()
    const [isModalOpen,setModalOpen] = useState(false)

    function deleteHandler(){
        setModalOpen(true);
    }

    function backdropHandler(){
        setModalOpen(false);
    }

    function cancelHandler(){
        setModalOpen(false);
    }

    function confirmHandler(){
        dispatch(deleteAsset(props.patientId)).unwrap()
        setModalOpen(false);
    }

    return (
        <div className='container'>
        <div className='card card-body bg-light mb-3'>
            <div className='row'>
                <div className='col-2'>
                    <span className='mx-auto'>PatientID : {props.patientId}</span>
                </div>
                <div className='col-lg-6 col-md-4 col-8'>
                    <h3>{props.assetName}</h3>
                    <p><span>{props.assetCategory}</span></p>
                    <p>{props.assetDescription}</p>
                    <p><span>Price : {props.assetFees} MMK</span></p>
                    
                    <p><span>Start Date : {props.startDate}</span></p>
                    <p><span>End Date : {props.endDate}</span></p>
                </div>
                <div className='col-md-4 d-none d-lg-block'>
                    <ul className='list-group'>
                        <a href="index.html">
                            <li className='list-group-item board'>
                                <i className='fa fa-flag-checkered pr-1'>Asset Board </i>
                            </li>
                        </a>
                        <Link to={`/asset/edit/${props.patientId}`}>
                            <li className='list-group-item update'>
                                <i className='fa fa-edit pr-1'>Update Asset Info</i>
                            </li>
                        </Link>
                        <a onClick={deleteHandler}>
                            <li className='list-group-item delete'>
                                <i className='fa fa-minus-circle pr-1'>Delete Asset</i>
                            </li>
                        </a>
                    </ul>
                    {isModalOpen && <ConfirmModal onCancel={cancelHandler} onConfirm={confirmHandler} />}
                    {isModalOpen && <Backdrop onBackdrop={backdropHandler} />}
                </div>
            </div>
        </div>
    </div>
    );
}

export default AssetItem;