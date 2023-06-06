import React, { useEffect, useState } from 'react';

function SalesForm(props) {
    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const handleAutomobileChange = (e) => {
        const value = e.target.value;
        setAutomobile(value);
    }

    const handleSalespersonChange = (e) => {
        const value = e.target.value;
        setSalesperson(value);
    }

    const handleCustomerChange = (e) => {
        const value = e.target.value;
        setCustomer(value);
    }

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;

        const saleUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            setAutomobile('');
            setCustomer('');
            setSalesperson('');
            setPrice('');
        }
    }

    const fetchAutomobiles = async () => {
        const url = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setAutomobiles(data.autos)
        }
    }

    const fetchSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salespeople)
        }
    }

    const fetchCustomers = async () => {
        const url = 'http://localhost:8090/api/customers/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setCustomers(data.customers)
        }
    }

    useEffect(() => {
        fetchAutomobiles();
        fetchSalespeople();
        fetchCustomers();
    }, [])


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a New Sale</h1>
                    <form onSubmit={handleSubmit} id="create-customer-form">
                        <div className="mb-3">
                            <select value={automobile} onChange={handleAutomobileChange} required name="automobile" id="automobile" className="form-select">
                                <option value="">Choose an automobile VIN</option>
                                {automobiles.filter(autos => autos.sold == false).map(auto => {
                                    return (
                                        <option key={auto.id} value={auto.id}>
                                            {auto.vin}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={salesperson} onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select">
                                <option value="">Choose a salesperson</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>
                                            {salesperson.first_name} {salesperson.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={customer} onChange={handleCustomerChange} required name="customer" id="customer" className="form-select">
                                <option value="">Choose a customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={price} onChange={handlePriceChange} placeholder="price" required type="number" name="price" id="price" className="form-control"/>
                            <label htmlFor="phone_number">Price:</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SalesForm;
