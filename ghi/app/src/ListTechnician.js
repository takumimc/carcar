import React, { useState, useEffect} from "react";


function ListTechnicians() {
    const [technicians, setTechnicians] = useState([])

    const loadTechs = async() => {
        const url = 'http://localhost:8080/api/technicians/'
        const response = await fetch(url)
        if (!response.ok){
            console.error('Error getting technicians')
        } else {
            const data = await response.json()
            // console.log(data)
            setTechnicians(data.technicians)
        }
    }


    useEffect(() => {loadTechs()}, [])

    return (
        <div className="container mt-4">
            <h1>Technicians</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map(tech => {
                        return (
                            <tr key={tech.id}>
                                <td>{tech.employee_id}</td>
                                <td>{tech.first_name}</td>
                                <td>{tech.last_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListTechnicians
