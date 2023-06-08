import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function CreateAutomobile(){

    const nav = useNavigate()

    const [ color, setColor] = useState('')
    function handleColor(e) {
        const value = e.target.value
        setColor(value)
    }
    const [ year, setYear] = useState('')
    function handleYear(e) {
        const value = e.target.value
        setYear(value)
    }
    const [ vin, setVIN] = useState('')
    function handleVIN(e){
        const value = e.target.value
        setVIN(value)
    }
    const [model, setModel] = useState('')
    function handleModel(e) {
        const value= e.target.value
        setModel(value)
    }

    const [models, setModels] = useState([])

    const loadModels = async() => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url)
        if (!response.ok){
            console.error('Error loading list of models')
        } else {
            const data = await response.json()
            // console.log(data.models)
            setModels(data.models)
        }

    }

    useEffect(() =>{loadModels()},[])

    async function Submit(e) {
        e.preventDefault()

        const data = {}
        data.color = color
        data.year = year
        data.vin = vin
        data.model_id = model

        const url = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method:'post',
            body:JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
            }
        }

        const response = await fetch(url,fetchConfig)
        if (!response.ok){
            console.error('Error creating new automobile')
        } else {
            const newAutomobile = await response.json()

            setColor('')
            setYear('')
            setVIN('')
            setModel('')
            nav('/automobiles')
        }
    }

    return (
        <div className='row'>
        <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
            <h1>Add automobile to inventory</h1>
            <form onSubmit={Submit}>
                <div>
                    <label htmlFor='color'>Color:</label>
                    <input value={color} onChange={handleColor} placeholder='Color' required type='text' name='color' id='color' className='form-control'></input>
                </div>
                <div>
                    <label htmlFor='year'>Year:</label>
                    <input value={year} onChange={handleYear} placeholder='Year' required type='number' name='year' id='year' className='form-control'></input>
                </div>
                <div>
                    <label htmlFor='vin'>VIN:</label>
                    <input value={vin} onChange={handleVIN} placeholder='VIN' required type='text' name='vin' id='vin' className='form-control'></input>
                </div>
                <div>
                    <label htmlFor='model'>Model:</label>
                    <select value={model} onChange={handleModel} required name='model' id='model' className='form-select'>
                        <option value=''>Choose a model</option>
                        {models.map( model =>{
                            return (
                                <option key={model.id} value={model.id}>{model.name}</option>
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

export default CreateAutomobile
