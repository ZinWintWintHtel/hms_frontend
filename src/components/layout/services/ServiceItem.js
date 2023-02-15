import React from "react";
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {deleteService} from './serviceSlice';
import { useState } from 'react';
import ConfirmModal from '../utility/ConfirmModal';
import Backdrop from '../utility/Backdrop';

function ServiceItem(props) {

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
        dispatch(deleteService(props.patientId)).unwrap()
        setModalOpen(false);
    }

    return (
        <React.Fragment>
        <div className='container'>
        <div className='card card-body bg-light mb-3'>
            <div className='row'>
                <div className='col-2'>
                    <span className='mx-auto'>PatientID : {props.patientId}</span>
                    <p><span>DoctorID : {props.doctorId}</span></p>
                </div>
                <div className='col-lg-6 col-md-4 col-8'>
                    <h3>Hospital Service Charges</h3>
                    <p><span>Service Date : {props.serviceDate}</span></p>
                    <p><span>Doctor Fees : {props.doctorFees}MMK</span></p>
                    <p><span>Medicine Fees : {props.medicineFees}MMK</span></p>
                    <p><span>Nursing Fees : {props.nursingFees}MMK</span></p>
                    <p><span>Asset Fees : {props.assetFees}MMK</span></p>
                    <p><span>Operation Fees : {props.operationFees}MMK</span></p>
                    <p><span>CheckUp Fees : {props.checkupFees}MMK</span></p>
                    <p><span>Service Amount : {props.serviceAmount}MMK</span></p>
                </div>
                <div className='col-md-4 d-none d-lg-block'>
                    <ul className='list-group'>
                        <a href="#">
                            <li className='list-group-item board'>
                                <i className='fa fa-flag-checkered pr-1'>Service Lists </i>
                            </li>
                        </a>
                        <Link to={`/service/edit/${props.patientId}`}>
                            <li className='list-group-item update'>
                                <i className='fa fa-edit pr-1'>Update Service Info</i>
                            </li>
                        </Link>
                        <a onClick={deleteHandler}>
                            <li className='list-group-item delete'>
                                <i className='fa fa-minus-circle pr-1'>Delete Service</i>
                            </li>
                        </a>
                    </ul>
                    {isModalOpen && <ConfirmModal onCancel={cancelHandler} onConfirm={confirmHandler} />}
                    {isModalOpen && <Backdrop onBackdrop={backdropHandler} />}
                </div>
            </div>
        </div>
    </div>            
        </React.Fragment>
    );
}

export default ServiceItem;