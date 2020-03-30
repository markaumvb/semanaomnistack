import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidentes, setIncidents] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
            headers:{
                authorization : ongId
            }
            });

        setIncidents(incidentes.filter(incident=> incident.id !== id));    
        }catch(err){
            alert('Erro ao deletar o caso!!');
        }
    }

    function HandleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be a hero" />
                <span>Bem-vindo, {ongName}</span>
                <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
                <button type="button" onClick={HandleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1> Casos cadastrados</h1>
            <ul>
                {incidentes.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        
                        <strong>DESCRIÇÕES</strong>
                        <p>{incident.description}</p>
                        
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', 
                        {style: 'currency', currency: 'BRL'})
                        .format(incident.value)}</p>

                        <button type="button" onClick={()=>handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}

            </ul>

        </div>
    );
}