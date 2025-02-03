import { useState } from 'react';
import { Link } from "react-router-dom";

import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        // Validacion del formulario
        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({msg: 'Todos los Lampos son Obligatorios', error: true})
            return;
        }

        if(password !== repetirPassword) {
            setAlerta({msg: 'La Contraseña no Coincide', error: true})
            return;
        }

        if(password.length < 8) {
            setAlerta({msg: 'La Contraseña es muy Corta, Agrega Minimo 8 Caracteres', error: true})
            return;          
        }

        // cambia el estado de la alerta
        setAlerta({});

        // Crea el usuario en la API
        try {
            const url = `/veterinarios`;
            
            // Envia la peticion al backend con axios(dependencia)
            await clienteAxios.post(url, { nombre, email, password });
            setAlerta({
                msg: 'Usuario creado correctamente, revisa tu email',
                error: false
            })

        } catch (error) {
            // console.log(error.response);
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        
    }

    const { msg } = alerta;

    return(
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-5xl md:text-6xl">Crea tu Cuenta y Administra <span className="text-black">Tus Pacientes</span> </h1>
            </div>

            <div className='mt-12 lg:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white'>
                
                {/* muestra la alerta de forma condicional */}
                { msg && <Alerta
                    alerta={ alerta }
                />}
                
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                        <input
                            type="text"
                            placeholder="Tu Nombre" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={ nombre }
                            onChange={ e => setNombre(e.target.value) }
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input
                            type="email"
                            placeholder="Email de Registro" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={ email }
                            onChange={ e => setEmail(e.target.value) }
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Tu contraseña" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={ password }
                            onChange={ e => setPassword(e.target.value) }
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Contraseña</label>
                        <input
                            type="password"
                            placeholder="Repite Tu contraseña" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={ repetirPassword }
                            onChange={ e => setRepetirPassword(e.target.value) }
                        />
                    </div>


                    <input 
                        type="submit" 
                        value="Crear Cuenta"
                        className="bg-indigo-700 w-full py-3 md:px-16 lg:px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"    
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className='block text-center my-5 text-gray-500' to="/">¿Ya tienes una cuenta? <span className='text-indigo-700 font-bold'>Inicia Sesión</span></Link>
                    <Link className='block text-center my-5 text-gray-500' to="/reset-password">Olvide mi contraseña</Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar;