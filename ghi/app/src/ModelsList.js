import React, { useEffect, useState} from "react";

function ModelsList() {

    const [models, setModels] = useState([])

    const loadModels = async () => {
        const modelsURL = 'http://localhost:8100/api/models/'
        const modelResponse = await fetch(modelsURL)
        if (!modelResponse.ok) {
            console.error('Error getting vehicle model data')
        } else {
            const data = await modelResponse.json()
            // console.log(data.models)
            setModels(data.models)

        }
    }

    // const deleteModel = (id) => async() => {
    //     const modelsURL = `http://localhost:8100/api/models/${id}/`
    //     const fetchConfig = {
    //         method:'delete',
    //     }
    //     const modelResponse = await fetch(modelsURL,fetchConfig)
    //     if (!modelResponse.ok){
    //         console.error('Error deleting vehicle model data')
    //     } else {
    //         const data = await modelResponse
    //         // console.log('deleted')
    //         loadModels()
    //     }
    // }
    useEffect(() => {loadModels()},[])

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (
                            <tr  key={model.id}>
                            <td>{model.name}</td>
                            <td >{model.manufacturer.name}</td>
                            <td><img src={model.picture_url}></img></td>
                            {/* <td><button onClick={deleteModel(model.id)} className='btn btn-dark'>Delete</button></td> */}
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ModelsList
