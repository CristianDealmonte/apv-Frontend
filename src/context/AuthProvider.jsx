import { useState, useEffect, createContext } from 'react';


import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    // Verifica que el usuario este autenticado
    useEffect(() => {
        const autenticarUsuario = async () => {
            // toma el JWT de local storage
            const token = localStorage.getItem('token');

            // en caso de que no encuentre el token detiene la ejecucion del codigo
            if(!token) {
                setCargando(false);
                return;
            } 

            // configura los encabezados de la peticion a backend
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                // realiza peticion a backend y se le asigna la configuracion establecida
                const { data }  = await clienteAxios.get('/veterinarios/perfil', config);

                // Agregamos al estado global el JWT
                setAuth(data); 

            } catch (error) {
                
                console.log(error.response.data.msg)
                setAuth({});
            }

            setCargando(false);
        }

        autenticarUsuario();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token');
        if(!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Context-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clienteAxios.put(url, datos, config);

            return {
                msg: 'Almacenado Correctamente'
            }

        } catch (error) {
            return({
                msg: error.response.data.msg,
                error: true,
            })
        }

    }

    const guardarPassword = async ( datos ) => {
        const token = localStorage.getItem('token');
        if(!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Context-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password';

            const { data } = await clienteAxios.put(url, datos, config)
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword,
            }}
        >
            {children}
        </AuthContext.Provider>


    );
}






export {
    AuthProvider
}

export default AuthContext;

