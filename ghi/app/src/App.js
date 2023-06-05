import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ModelsList from './ModelsList';
import CreateModel from './NewModel';
import ManufacturerList from './ListManufacturers';
import ManufacturerForm from './ManufacturerForm';

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
         </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
