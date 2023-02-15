import Dashboard from "./components/Dashboard";
import MainNavigation from "./components/layout/MainNavigation";
import { Route,Routes } from "react-router-dom";
import AddAssetForm from "./components/layout/assets/AddAssetForm";
import AddOperationForm from "./components/layout/operations/AddOperationForm";
import AddServiceForm from "./components/layout/services/AddServiceForm";

function App() {
  return (
    <div>
      <MainNavigation />
      

      <Routes>

        <Route path='/'>
          <Route path='dashboard' element={<Dashboard />} />

          <Route path='asset'>
            <Route path='create' element={<AddAssetForm />} />
            <Route path='edit/:patientIdentifier' element={<AddAssetForm mode='edit' />} />
          </Route>

          <Route path='operation'>
            <Route path='create' element={<AddOperationForm />} />
            <Route path='edit/:patientIdentifier' element={<AddOperationForm mode='edit' />} />
          </Route>

          <Route path='service'>
            <Route path='create' element={<AddServiceForm />} />
            <Route path='edit/:patientIdentifier' element={<AddServiceForm mode='edit' />} />
          </Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
