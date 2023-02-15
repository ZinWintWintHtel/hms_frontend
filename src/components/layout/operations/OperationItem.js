import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import {deleteOperation} from './operationSlice';
import { useState } from 'react';
import ConfirmModal from '../utility/ConfirmModal';
import Backdrop from '../utility/Backdrop';

function OperationItem(props) {

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
        dispatch(deleteOperation(props.patientId)).unwrap()
        setModalOpen(false);
    }

    return (
      <React.Fragment>
        <div className='container'>
        <div className='card card-body bg-light mb-3'>
            <div className='row'>
                <div className='col-2'>
                    <span className='mx-auto'>Patient ID : {props.patientId}</span><br></br>
                    <span className='mx-auto'>Doctor ID : {props.doctorId}</span>
                </div>
                <div className='col-lg-6 col-md-4 col-8'>
                    <h3>{props.operationName}</h3>
                    <p>{props.operationType}</p>
                    <p>{props.operationDescription} </p>
                    <p>{props.operationDate} </p>
                    <p>{props.operationFees} MMK</p>
                </div>
                <div className='col-md-4 d-none d-lg-block'>
                    <ul className='list-group'>
                        <a href="#">
                            <li className='list-group-item board'>
                                <i className='fa fa-flag-checkered pr-1'>Operation Lists </i>
                            </li>
                        </a>
                        <Link to={`/operation/edit/${props.patientId}`}>
                            <li className='list-group-item update'>
                                <i className='fa fa-edit pr-1'>Update Operation Info</i>
                            </li>
                        </Link>
                        <a onClick={deleteHandler}>
                            <li className='list-group-item delete'>
                                <i className='fa fa-minus-circle pr-1'>Delete Operation</i>
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

export default OperationItem;