import React, { useState } from 'react';

import api from '../../services/api';

import {Link, useHistory} from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Register(){
    const [name, setName] = useState('');
    const [abbreviation, setAbbreviation] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            abbreviation,
            email,
            whatsapp,
            city,
            uf
        }
        try {
            const response = await api.post('ongs', data)
            alert(`Seu ID de acessor: ${response.data.id}`)
            history.push(`/?id=${response.data.id}`);
        } catch (error) {
            alert('Erro, tente novamente!')
            console.log(error);
            
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na platafoma e ajude pessoas a encontrarem casos da sua ONG</p>
                    <Link className="link" to="/">
                        <FiArrowLeft size={28} color="#E02041" />
                        Voltar para Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>

                    <div className="input-group">
                        <input 
                            placeholder="Nome da ONG"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Sigla" style={{ width: 160}}
                            value={abbreviation}
                            onChange={e => setAbbreviation(e.target.value)}
                        />
                    </div>

                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input 
                            placeholder="UF" 
                            style={{ width: 80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className='button' type='submit'>Cadastrar</button>
                </form>


            </div>
        </div>
    );
}