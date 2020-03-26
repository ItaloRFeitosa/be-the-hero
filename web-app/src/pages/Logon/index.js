import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { FiLogIn } from 'react-icons/fi';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Logon({location}){
    const history = useHistory();

    const [id, setId] = useState(location.search ? (new URLSearchParams(location.search)).get("id") : '');

    async function handleLogon(e){
        e.preventDefault();
        try {
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no Logon, tente novamente!')
        }

    }


    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        value={id}
                        onChange={ e => setId(e.target.value) } 
                        placeholder="Sua ID"
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="link" to="/register">
                        <FiLogIn size={28} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
        
    );
}