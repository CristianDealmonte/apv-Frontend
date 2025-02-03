import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios';
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const { auth } = useAuth(); 

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                // Extraccion del JWT
                const token = localStorage.getItem('token');

                // Configuracion de envio de peticion a la API
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }

                const { data } = await clienteAxios.get('/pacientes', config);

                setPacientes(data); 

            } catch (error) {
                console.log(error);
            }
        }

        obtenerPacientes();
    }, [auth])


    const guardarPaciente = async paciente => {
        // Extraccion del JWT
        const token = localStorage.getItem('token');

        // Configuracion de envio de peticion a la API
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }

        if(paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState )

                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                // Realizacion de la peticion a la API
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
    
                // Eliminar info inecesaria 
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
    
                setPacientes([pacienteAlmacenado, ...pacientes]);
    
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const setEdicion = paciente => {
        setPaciente(paciente);  
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Seguro que deseas eliminar a este paciente?')

        if(confirmar) {
            try {
                // Extraccion del JWT
                const token = localStorage.getItem('token');

                // Configuracion de envio de peticion a la API
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

                const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== id);

                setPacientes(pacientesActualizado)
                
            } catch (error) {
                console.log(error);
            }
        }
    }


    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;