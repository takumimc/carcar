import React, { useState} from "react";


function CreateTechnician() {
    const [first, setFirst] = useState('')
    function handleFirst(e){
        const value = e.target.value
        setFirst(value)
    }

    const [last, setLast] = useState('')
    function handleLast(e){
        const value = e.target.value
        setLast(value)
    }

    const [id, setID] = useState('')
    function handleID(e){
        const value = e.target.value
        setID(value)
    }

    async function handleSubmit(e){
        e.preventDefault()

        const data = {}
        data.first_name = first
        data.last_name = last
        data.employee_id = id

        const url = 'http://localhost:8080/api/technicians/'
        const fetchConfig = {
            method:'post',
            body:JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
            }
        }
        const response = await fetch(url,fetchConfig)
        if(!response.ok){
            const error = await response.json()
            console.error(error['message'])
        } else {
            // const newTech = await response.json()
            setFirst('')
            setLast('')
            setID('')
        }
}
    return (
        <div className='row'>
        <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
            <h1>Add a Technician</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='first'>First Name:</label>
                    <input value={first} onChange={handleFirst} placeholder='First Name' required type='text' name='first' id='first' className='form-control'></input>
                </div>
                <div>
                    <label htmlFor='last'>Last Name:</label>
                    <input value={last} onChange={handleLast} placeholder='Last Name' required type='text' name='last' id='last' className='form-control'></input>
                </div>
                <div>
                    <label htmlFor='id'>Employee ID:</label>
                    <input value={id} onChange={handleID} placeholder='Employee ID' required type='text' name='id' id='id' className='form-control'></input>
                </div>
                <div className='mt-4'><button className='btn btn-dark'>Create</button></div>
            </form>
        </div>
        </div>
        </div>
    )
}

export default CreateTechnician
