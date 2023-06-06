import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ModelsList from './ModelsList';
import CreateModel from './NewModel';
import ManufacturerList from './ListManufacturers';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './ListAutomobiles';
import CreateAutomobile from './CreateAutomobile';

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
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="manufacturers/create" element={<ManufacturerForm />} />
          <Route path="automobiles" element={<AutomobileList />} />
          <Route path="automobiles/new" element={<CreateAutomobile />} />
         </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
