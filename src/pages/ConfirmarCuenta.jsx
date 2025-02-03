import { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom'; // para podeer leer los params de la url 


import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';


const ConfirmarCuenta = () => {
    // Crear reactividad 
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});


    // toma el token de la URL
    const params = useParams();
    const { token } = params;

    // Realiza la consulta a backend cuando detecta la url
    useEffect( () => {   

        const confirmarCuenta = async () => {
            try {
                // Construccion de la URL a la que se hara la req
                const URL = `/veterinarios/confirmar/${token}`;

                const { data } = await clienteAxios.get(URL);

                setCuentaConfirmada(true);

                setAlerta({
                    msg: data.msg,
                    error: false
                })

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                }) 
            }
            setCargando(false);
        };

        confirmarCuenta();
    }, []);

    return(
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-5xl md:text-6xl">Confirma tu Cuenta y Comienza a Administrar <span className="text-black">Tus Pacientes</span> </h1>
            </div>

            <div className='mt-12 lg:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white'>
               {!cargando &&
                    <Alerta
                        alerta = {alerta}
                    />
                }

                {cuentaConfirmada && (
                    <Link className='block text-center my-5 text-gray-500' to="/"><span className='text-indigo-700 font-bold'>Inicia Sesión</span></Link>
                )}

            </div>
        </>
    )
}

export default ConfirmarCuenta;