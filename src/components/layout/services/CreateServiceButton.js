import React from 'react';
import { Link } from 'react-router-dom';

function CreateServiceButton() {
    return (
        <React.Fragment>
        <Link to='/service/create' className='btn btn-lg btn-info'>
            Create Service
        </Link>
        </React.Fragment>
    );
}

export default CreateServiceButton;