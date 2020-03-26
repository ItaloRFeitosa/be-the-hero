import React, {useState, useEffect} from 'react';

import api from '../../services/api';

import {Link, useHistory} from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile(){
    const [incidents, setIncidents] = useState([])

    const history = useHistory();

    const logged_ong = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');


    useEffect( () => {
        api.get('profile', {
            headers: {
                logged_ong
            }
        }).then(response => setIncidents(response.data));
    }, [logged_ong]);

    
    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {logged_ong}
            })

            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (err) {
            alert('Algo aconteceu, tente novamente!');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to='/incidents/new'>Cadastrar novo caso</Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"></FiPower>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p> {Intl.NumberFormat('pt-BR', 
                                { 
                                    style: 'currency', 
                                    currency:'BRL'
                                })
                                .format(incident.value)}</p>

                        <button 
                            type='button'
                            onClick={ () => handleDeleteIncident(incident.id)}
                        >
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                    ))
                }   
            </ul>
        </div>
    );
}