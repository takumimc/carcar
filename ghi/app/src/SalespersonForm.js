import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SalespersonForm(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const handleEmployeeIdChange = (e) => {
        const value = e.target.value;
        setEmployeeId(value);
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesPerson = await response.json()
            setFirstName('');
            setLastName('');
            setEmployeeId('');
            navigate("/salespeople")
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input value={firstName} onChange={handleFirstNameChange} placeholder="first name" required type="text" name="first_name" id="first_name" className="form-control"/>
                            <label htmlFor="first_name">First Name:</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={lastName} onChange={handleLastNameChange} placeholder="last name" required type="text" name="last_name" id="last_name" className="form-control"/>
                            <label htmlFor="last_name">Last Name:</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employeeId} onChange={handleEmployeeIdChange} placeholder="employee id" required type="number" name="employee_id" id="employee_id" className="form-control"/>
                            <label htmlFor="employee_id">Employee ID:</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SalespersonForm;
