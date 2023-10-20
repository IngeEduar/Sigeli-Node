import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { SINGIN_POST_ENDPOINT } from "../connections/helpers/endpoints";

const SinginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [conditions, setConditions] = useState(false);
    const navegar = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConditionsChange = (event) => {
        setConditions(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault()

        if (username.trim() === '' || password.trim() === '' || !conditions) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, complete todos los campos y acepte los términos y condiciones',
            });
        } else {
            axios.post(
                SINGIN_POST_ENDPOINT,
                { username, password, conditions },
                {
                    headers: {
                        'Accept' : 'applicaton/json',
                        'Content-Type': 'applicaton/json'
                    }
                }
                ).then(response => {
                    console.log(response)
                    localStorage.setItem('token', username)
                    localStorage.setItem('user', username)
                    navegar('/dashboard')
                }).catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ha ocurrido este error: ' + error,
                    });
                })
            setUsername('');
            setPassword('');
            setConditions(false);
        }
    };

    return (
        <form
            className="h-100 my-form"
            onSubmit={handleSubmit}
        >
            <div className="d-flex justify-content-center align-items-center my-div-logo">
                <img src="/images/logoFesc.png" alt="Logo fesc" className="my-logo"/>
            </div>
            <div>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="   Username"
                    autoComplete="false"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="   Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="d-flex align-items-center mt-3">
                <input
                    type="checkbox"
                    id="allowConditions"
                    name="allowConditions"
                    checked={conditions}
                    onChange={handleConditionsChange}
                />
                <label htmlFor='allowConditions'>Aceptar los terminos y condiciones</label>
            </div>
            
            <div className="w-100 mt-4 d-flex justify-content-center">
                <button type="submit" variant="none" className="my-btn-login">Ingresar</button>
            </div>
      </form>
    )
}

export {SinginForm}