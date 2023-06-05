import React, {useState, useEffect} from "react";

function CreateModel() {

    const [manus, setManus] = useState([])

    const [manu, setManu] = useState('')
    function handleManu(e){
        const value = e.target.value
        setManu(value)
    }
    const [name, setName] = useState('')
    function handleName(e){
        const value = e.target.value
        setName(value)
    }
    const [picture, setPicture] = useState('')
    function handlePicture(e){
        const value = e.target.value
        setPicture(value)
    }

    const loadManus = async () => {
        const manuURL = 'http://localhost:8100/api/manufacturers/'
        const manuResponse = await fetch(manuURL)

        if (!manuResponse.ok){
            console.error('Error loading manufacturers')
        } else {
            const data = await manuResponse.json()
            // console.log(data)
            setManus(data.manufacturers)
        }
    }

    async function handleSubmit(e){
        e.preventDefault()

        const data={}
        data.name=name
        data.manufacturer_id=manu
        data.picture_url=picture

        // console.log(data)

        const url = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: 'post',
            body:JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
            }
        }
        const response = await fetch(url, fetchConfig)
        if(!response.ok){
            console.error('Error creating new model')
        } else {
            const newModel = await response.json()

            setName('')
            setPicture('')
            setManu('')
        }
    }

    useEffect(() => {loadManus()}, [])
    return (
        <div className='row'>
        <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
            <h1>Create a vehicle model</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input value={name} onChange={handleName} placeholder='Model name' required type='text' name='name' id='name' className='form-control'></input>
                </div>
                <div>
                    <label htmlFor='picture'>Picture URL:</label>
                    <input value={picture} onChange={handlePicture} placeholder='Picture URL' required type='url' name='picture' id='picture' className='form-control'></input>
                </div>
                <div>
                    <label htmlFor='manufacturer'>Manufacturer:</label>
                    <select value={manu} onChange={handleManu} name='manufacturer' id='manufacturer' className='form-select'>
                        <option value=''>Choose a manufacturer</option>
                        {manus.map( manu =>{
                            return (
                                <option key={manu.id} value={manu.id}>{manu.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='mt-4'><button className='btn btn-dark'>Create</button></div>
            </form>
        </div>
        </div>
        </div>
    )
}


export default CreateModel
