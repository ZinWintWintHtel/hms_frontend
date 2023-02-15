import React from 'react';
import { Link } from 'react-router-dom';

function CreateOperationButton() {
    return (
        <React.Fragment>
        <Link to='/operation/create' className='btn btn-lg btn-info'>
            Create an Operation
        </Link>
        </React.Fragment>
    );
}

export default CreateOperationButton;