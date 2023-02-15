import AssetList from "./layout/assets/AssetList";
import CreateAssetButton from "./layout/assets/CreateAssetButton";
import CreateOperationButton from "./layout/operations/CreateOperationButton";
import CreateServiceButton from "./layout/services/CreateServiceButton";
import OperationList from "./layout/operations/OperationList";
import ServiceList from "./layout/services/ServiceList";

function Dashboard() {
    return(
        <div className='projects'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='display-4 text-center'>Asset Item</h1>
                    <br />
                   <CreateAssetButton />
                    <br />
                    <hr />
                    <AssetList />
                    
                </div>
            </div>
        </div>

        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='display-4 text-center'>Operation Lists</h1>
                    <br />
                   <CreateOperationButton />
                    <br />
                    <hr />
                    <OperationList />
                    
                </div>
            </div>
        </div>

        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='display-4 text-center'>Service Lists</h1>
                    <br />
                   <CreateServiceButton />
                    <br />
                    <hr />
                    <ServiceList/>
                </div>
            </div>
        </div>

        </div>
        
    );
}

export default Dashboard;