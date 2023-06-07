import React, {useState, useEffect} from "react";

function ListAppointments(){
    const [err, setErr] = useState('')
    const [appointments, setAppointments] = useState([])

    const loadAppointments = async() =>{

        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url)
        if (!response.ok){
            const error = await response.json()
            setErr(error['message'])
            const errTag = document.getElementById('err-not')
            errTag.classList.remove('d-none')

        } else {
            const data = await response.json()
            // console.log(data)
            for (let item of data.appointments){
                const datetime = new Date(item.date_time)
                const date = datetime.toLocaleDateString(undefined,{month:'long', day:'numeric',year:'numeric'})
                const time = datetime.toLocaleTimeString('en-US')
                // console.log(time)
                // console.log(datetime)
                item['time'] = time
                item['date'] = date
            }
            setAppointments(data['appointments'])
            // console.log(data.appointments)
        }
    }

    const finishService = (id) => async() => {
        const url = `http://localhost:8080/api/appointments/${id}/finish/`
        const fetchConfig = {
            method:'put',
        }
        const response = await fetch(url,fetchConfig)

        if(!response.ok){
            const error = await response.json()
            setErr(error['message'])
            const errTag = document.getElementById('err-not')
            errTag.classList.remove('d-none')
        } else {
            // console.log('finished')
            loadAppointments()

            const errTag = document.getElementById('err-not')
            errTag.classList.add('d-none')
        }
    }

    const cancelService = (id) => async() => {
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`
        const fetchConfig = {
            method:'put',
        }
        const response = await fetch(url,fetchConfig)

        if(!response.ok){
            const error = await response.json()
            setErr(error['message'])
            const errTag = document.getElementById('err-not')
            errTag.classList.remove('d-none')
        } else {
            // console.log('finished')
            loadAppointments()

            const errTag = document.getElementById('err-not')
            errTag.classList.add('d-none')
        }
    }
    useEffect(() => {loadAppointments()},[])

    return (
        <div className="container mt-4">
            <h1>Service Appointments</h1>
            <div className='alert alert-warning d-none' id='err-not'>{err}</div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>VIP Status</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        if (appointment.status === 'Scheduled')
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.vip ? 'Yes' : 'No'}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                                <td><button onClick={cancelService(appointment.id)} className='btn btn-danger'>Cancel</button><button onClick={finishService(appointment.id)}className='btn btn-success'>Finish</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListAppointments
