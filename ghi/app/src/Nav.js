import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" role="button">
                Car Manufacturer
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/manufacturers/">All Manufacturers</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/manufacturers/create">Create a Manufacturer</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" role="button">
                Car Model
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/models/">All Models</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/models/new/">Create Model</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" role="button">
                Automobiles
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/automobiles/">All Automobiles</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/automobiles/new">Submit an Automobile</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" role="button">
                Technicians
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/technicians/">Technician List</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/technicians/new">Add Technician</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" role="button">
                Service Appointments
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/appointments/new">New Service appointment</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/appointments/">Service appointment List</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/appointments/history">Service History</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" role="button">
                Salespeople
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/salespeople/">All Salespeople</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/salespeople/new">Add a Salesperson</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" role="button">
                Customers
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/customers/">All Customers</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/customers/new">Add a Customer</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" role="button">
                Sales
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/sales/">All Sales</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/sales/new">Add a Sale</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/sales/history">Sales history</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
