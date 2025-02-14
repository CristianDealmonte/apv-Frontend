import { Link } from "react-router-dom";
import { useState } from "react"; 

import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if(email === '') {
            setAlerta({msg: 'El email es obligatorio', error: true});
            return;
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/reset-password', { email: email });
            
            setAlerta({msg: data.msg})
            
        } catch (error) {
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
                <h1 className="text-indigo-600 font-black text-5xl md:text-6xl">Recupera Tu Acceso y no Pierdas <span className="text-black">Tus Pacientes</span> </h1>
            </div>

            <div className='mt-12 lg:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white'>
                <form onSubmit={handleSubmit}>

                    { msg && 
                        <Alerta
                            alerta={alerta}
                        ></Alerta>
                    }

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input
                            type="email"
                            placeholder="Tu Email" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Enviar Instrucciones"
                        className="bg-indigo-700 w-full py-3 md:px-16 lg:px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"    
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className='block text-center my-5 text-gray-500' to="/">¿Ya tienes una cuenta? <span className='text-indigo-700 font-bold'>Inicia Sesión</span></Link>
                    <Link className='block text-center my-5 text-gray-500' to="/registrar">¿No tienes una cuenta? <span className='text-indigo-700 font-bold'>Registrate</span></Link>
                </nav>
            </div>
        </>
    )
}

export default ResetPassword;