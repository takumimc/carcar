import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ListManufacturers';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './ListAutomobiles';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="manufacturers/create" element={<ManufacturerForm />} />
          <Route path="automobiles" element={<AutomobileList />} />
         </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
