import React, { useEffect, useState } from 'react';

function SalesPeopleList(props) {
    const [salespeople, setSalespeople] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setSalespeople(data.salespeople)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container mt-4">
            <h1>Salespeople</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(person => {
                        return (
                            <tr key={person.id}>
                                <td>{person.employee_id}</td>
                                <td>{person.first_name}</td>
                                <td>{person.last_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SalesPeopleList;
