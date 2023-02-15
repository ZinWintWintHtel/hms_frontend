import React from 'react';
import { Link } from 'react-router-dom';

function CreateAssetButton() {
    return (
        <React.Fragment>
        <Link to='/asset/create' className='btn btn-lg btn-info'>
            Create an Asset
        </Link>
        </React.Fragment>
    );
}

export default CreateAssetButton;