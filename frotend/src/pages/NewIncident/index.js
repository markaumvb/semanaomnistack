import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle]= useState('');
    const [description, setDescription] = useState('');
    const [value, setvalue] = useState('');

    const OngId = localStorage.getItem('ongId');
    const history = useHistory();

    async function HandleNewIncident(e){
        e.preventDefault();
        const data={
            title, description, value
        };
        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: OngId
                }
            })
            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar caso!!!');
        }
    }

    return (<div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="be the hero"/>
                    <h1>
                        Cadastrar novo caso

                    </h1>
                    <p>Descreva o caso detalhadamento para encontrar um herói para resolver isso.</p>
                    
                    <Link className=".back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>

                </section>
                <form onSubmit={HandleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                        />
                    <textarea 
                        placeholder="descrição" 
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                        />
                    <input 
                        placeholder="Valor em Reais" 
                        value={value}
                        onChange={e=>setvalue (e.target.value)}
                        />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}