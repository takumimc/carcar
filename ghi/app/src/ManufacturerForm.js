import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ManufacturerForm(props) {
    const [name, setName] = useState('');

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value)
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};
        data.name = name;
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(manufacturerUrl, fetchConfig);

        if (response.ok) {
            const newManufacturer = await response.json()
            setName('')
            navigate('/manufacturers')
        }

    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input value={name} onChange={handleNameChange} placeholder="name" required type="text" name="name" id="name" className="form-control"/>
                            <label htmlFor="name">Manufacturer Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManufacturerForm;
