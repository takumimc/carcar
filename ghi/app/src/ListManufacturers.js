import React, { useEffect, useState } from 'react';

function ManufacturerList(props) {
    const [manufacturers, setManufacturers] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setManufacturers(data.manufacturers);
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Manufacturers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return (
                            <tr key={manufacturer.href}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ManufacturerList;
