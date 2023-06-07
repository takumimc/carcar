import React, {useState, useEffect} from "react";

function CreateAppointment(){

    const [err, setErr] = useState('')

    const [vin, setVIN] = useState('')
    function handleVIN(e){
        const value = e.target.value
        setVIN(value)
    }

    const [customer, setCustomer] = useState('')
    function handleCustomer(e){
        const value = e.target.value
        setCustomer(value)
    }
    const [reason, setReason] = useState('')
    function handleReason(e){
        const value = e.target.value
        setReason(value)
    }

    const [datetime, setDatetime] = useState('')
    function handleDatetime(e){
        const value = e.target.value
        setDatetime(value)
    }

    const [tech, setTech] = useState('')
    function handleTech(e){
        const value=e.target.value
        setTech(value)
    }

    const [techs, setTechs] = useState([])
    const loadTechs = async () => {
        const url ='http://localhost:8080/api/technicians/'
        const response = await fetch(url)

        if(response.ok){
            const data = await response.json()
            setTechs(data.technicians)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const datadatetime = new Date(datetime)
        // console.log(datadatetime)
        const data = {}
        data.reason = reason
        data.vin = vin
        data.customer = customer
        data.technician = tech
        data.date_time = datadatetime.toISOString()
        // console.log(data)
        const url = 'http://localhost:8080/api/appointments/'
        const fetchConfing = {
            method:'post',
            body: JSON.stringify(data),
            headers : {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(url,fetchConfing)
        if (!response.ok){
            const error = await response.json()
            setErr(error['message'])
            const errTag = document.getElementById('err-not')
            errTag.classList.remove('d-none')
        } else {
            setReason('')
            setVIN('')
            setCustomer('')
            setTech('')
            setDatetime('')

            const errTag = document.getElementById('err-not')
            errTag.classList.add('d-none')
        }
    }
    useEffect(() => {loadTechs()},[])

    return (
        <div className='row'>
        <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
            <h1>Schedule an Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='vin'>Automobile VIN:</label>
                    <input value={vin} onChange={handleVIN} placeholder='VIN' required type='text' name='vin' id='vin' className='form-control'></input>
                </div>
                <div>
                    <label htmlFor='customer'>Customer:</label>
                    <input value={customer} onChange={handleCustomer} placeholder='Customer' required type='text' name='customer' id='customer' className='form-control'></input>
                </div>
                <div>
                    <label htmlFor='datetime'>Time:</label>
                    <input value={datetime} onChange={handleDatetime} required type='datetime-local' name='datetime' id='datetime' className='form-control'></input>
                </div>
                <div>
                    <label htmlFor='tech'>Technician:</label>
                    <select  value={tech} onChange={handleTech} name='tech' id='tech' className='form-select'>
                        <option value=''>Select a technician</option>
                        {techs.map(tech => {
                            return <option key={tech.id} value={tech.id}>{tech.first_name} {tech.last_name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor='reason'>Reason:</label>
                    <textarea value={reason} onChange={handleReason} placeholder='Reason' required type='text' name='reason' id='reason' className='form-control' rows='5'></textarea>
                </div>
                <div className='mt-4'>
                <div className='alert alert-warning d-none' id='err-not'>{err}</div>
                    <button className='btn btn-dark'>Create</button>
                </div>
            </form>
        </div>
        </div>
        </div>
    )
}

export default CreateAppointment
