import { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom'; // para podeer leer los params de la url 


import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';


const NuevaContraseña = () => {
    // Crea un estado para revisar el valor del formulario
    const [password, setPassword] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);
    const [alerta, setAlerta] = useState({});

    // Toma el token de la URL
    const params = useParams();
    const { token } = params;

    // Ejecuta este codigo cunando detecte el token de la URL
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                // Realizar peticion al bakend
                await clienteAxios(`/veterinarios/reset-password/${token}`);

                setAlerta({
                    msg: 'Crea una contraseña nueva'
                })

                setTokenValido(true);
                
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un herror en el enlace',
                    error: true
                })
            }
        }

        comprobarToken();
    }, [])

   // Accion que toma el form al ser enviado
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validacion al Formulario
        if(password.length < 8) {
            setAlerta({msg: 'La Contraseña es muy Corta, Agrega Minimo 8 Caracteres', error: true})
            return;          
        }

        try {
            const URL = `/veterinarios/reset-password/${token}`;

            // comunicacion con backend
            const { data } = await clienteAxios.post(URL, {password});

            setAlerta({
                msg: data.msg
            });

            setPasswordModificado(true);
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta;
    
    return(
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-5xl md:text-6xl">Reestablece tu Contraseña y no Pierdas Acceso a <span className="text-black">Tus Pacientes</span> </h1>
            </div>

            <div className='mt-12 lg:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {/* muestra la alerta de forma condicional */}
                { msg && <Alerta
                    alerta={ alerta }
                />}

                {/* si el token es valido renderiza el formulario */}
                { tokenValido && (

                    <form onSubmit={handleSubmit}>
                    
                        <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Crea una Contraseña Nueva</label>
                        <input
                            type="password"
                            placeholder="Contraseña nueva" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={ password }
                            onChange={ e => setPassword(e.target.value) }
                        />
                        </div>
                        <input 
                            type="submit" 
                            value="Guardar Contraseña Nueva "
                            className="bg-indigo-700 w-full py-3 md:px-16 lg:px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"    
                            />
                    </form>
                ) }

                {/* si se modifico correctamente el password muestra enlace al inisio de sesion */}
                { passwordModificado && (
                    <Link className='block text-center my-5 text-gray-500' to="/"><span className='text-indigo-700 font-bold'>Iniciar Sesión</span></Link>
                )}
            </div>
        </>
    )
}

export default NuevaContraseña;