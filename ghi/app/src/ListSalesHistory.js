import React, { useEffect, useState } from 'react';

function SalesHistoryList(props) {
    const [salespeople, setSalespeople] = useState([]);
    const [sales, setSales] = useState([]);
    const [salesperson, setSalesperson] = useState('')


    const fetchSalespeople = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salespeople)
        }
    }

    async function handleSalespersonChange(e) {
        const value = e.target.value;
        setSalesperson(value);

        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);
        const data = await response.json()
        const salesList = data.sales;
        const filteredSales = [];
        for (let sale of salesList) {
            if (sale.salesperson.id == Number(value)) {
                filteredSales.push(sale)
            }
        }
        setSales(filteredSales)
    }

    useEffect(() => {
        fetchSalespeople();
        // fetchSalesHistory();
    }, [])

    console.log()

    return (
        <div className="container mt-4">
            <h1>Salesperson History</h1>
            <select value={salesperson} onChange={handleSalespersonChange} name="salesperson" id="salesperson" className="form-select">
                <option value="">Filter: Salesperson</option>
                {salespeople.map(salesperson => {
                    return (
                        <option key={salesperson.id} value={salesperson.id} id="">
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    )
                })}
            </select>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>${sale.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SalesHistoryList;
