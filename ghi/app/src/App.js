import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ModelsList from './ModelsList';
import CreateModel from './NewModel';
import ManufacturerList from './ListManufacturers';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './ListAutomobiles';
import CreateAutomobile from './CreateAutomobile';
import ListTechnicians from './ListTechnician';
import CreateTechnician from './TechnicianForm';
import SalespersonForm from './SalespersonForm';
import SalesPeopleList from './ListSalespeople';
import CustomerForm from './CustomerForm';
import CustomersList from './ListCustomers';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* Models URLS */}
          <Route path='/models/'>
            <Route path='' element={<ModelsList />}/>
            <Route path='new/' element ={<CreateModel />}/>
          </Route>
          {/* End Models URLS */}

          {/* Start Technician URLS */}
          <Route path='/technicians/'>
            <Route path ='' element={<ListTechnicians />}/>
            <Route path ='new' element={<CreateTechnician />}/>
          </Route>
          {/* End Technician URLS */}

          {/* Start Appointment URLS */}
          <Route path='/appointments/'>
            {/* Appointments TBA */}
          </Route>
          {/* End Appointment URLS */}
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="manufacturers/create" element={<ManufacturerForm />} />
          <Route path="automobiles" element={<AutomobileList />} />
          <Route path="automobiles/new" element={<CreateAutomobile />} />

          {/* Start Saleperson URLS */}
          <Route path="/salespeople/">
            <Route path="" element={<SalesPeopleList />} />
            <Route path="new" element={<SalespersonForm />} />
          </Route>
          {/* End Salesperson URLS */}

          {/* Start Customer URLS */}
          <Route path="/customers/">
            <Route path="" element={<CustomersList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          {/* End Customer URLS */}
         </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
