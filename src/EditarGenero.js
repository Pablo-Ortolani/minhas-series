import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const EditarGenero = ({match}) => {

    const [name, setName] = useState('');
    const [success, setSucces] = useState(false);

    useEffect(()=>{
        axios.get('/api/genres/'+match.params.id)
        .then(res=>{
            setName(res.data.name);
        })
    },[match.params.id])
    
    const onchange = evt =>{
        setName(evt.target.value);
    }
    
    const save = () =>{
        axios
        .put('/api/genres/'+match.params.id, {name:name})
        .then(res => {
            setSucces(true);
        })
    }

    if(success){
        //Redirecionar para outra página
        return <Redirect to="/generos" />
    }

    return (
        <div className="container">
            <h1>Editar Genêro</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input value={name} onChange={onchange} type="text" className="form-control" id="name" placeholder="Nome"></input>
                </div>
                <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
            </form>
        </div>
    )
};

export default EditarGenero;