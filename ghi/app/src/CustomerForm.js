import React, { useEffect, useState } from 'react';

function CustomerForm(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setAddress(value);
    }

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Customer</h1>
                    <form onSubmit={handleSubmit} id="create-customer-form">
                        <div className="form-floating mb-3">
                            <input value={firstName} onChange={handleFirstNameChange} placeholder="first name" required type="text" name="first_name" id="first_name" className="form-control"/>
                            <label htmlFor="first_name">First Name:</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={lastName} onChange={handleLastNameChange} placeholder="last name" required type="text" name="last_name" id="last_name" className="form-control"/>
                            <label htmlFor="last_name">Last Name:</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={address} onChange={handleAddressChange} placeholder="address" required type="text" name="address" id="address" className="form-control"/>
                            <label htmlFor="address">Address:</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="phone number" required type="number" name="phone_number" id="phone_number" className="form-control"/>
                            <label htmlFor="phone_number">Phone Number:</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomerForm;
