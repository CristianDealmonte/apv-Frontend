// Dependencias
import { useState, useEffect } from "react";

// Componentes 
import Alerta from '../components/Alerta';

// Context
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

    // Campos del formulario
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    // Componente alerta
    const [alerta, setAlerta] = useState({});

    // Estado global de pacientes
    const [id, setId] = useState(null);
    const { guardarPaciente, paciente } = usePacientes();

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha);

        // Formatear la fecha en formato "YYYY-MM-DD"
        const año = nuevaFecha.getFullYear();
        const mes = String(nuevaFecha.getMonth() + 1).padStart(2, '0'); // getMonth() es 0-based
        const dia = String(nuevaFecha.getDate()).padStart(2, '0');
    
        return `${año}-${mes}-${dia}`;
    }

    // 
    useEffect( () => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(formatearFecha(paciente.fecha));
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);

    // Accion del formulario
    const handleSubmit = e => {
        e.preventDefault();

        // Validar Form
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios', 
                error: true
            }); 
            return;
        }

        guardarPaciente({nombre, propietario, email, fecha, sintomas, id});
        
        setAlerta({
            msg: 'Guardado correctamente'
        });

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');
    }

    const { msg } = alerta;

    return(
        <>  
            <h2 className="font-black text-3xl text-center">Registro de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center font-bold">
                Añade tus pacientes y {''} <span className="text-indigo-600 ">administralos</span>
            </p>
            
            <form 
                className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label 
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Mascota</label>
                    <input
                        id="nombre" 
                        type="text" 
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                        value={nombre}
                        onChange={ e => {
                            setNombre(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Propietario</label>
                    <input
                        id="propietario" 
                        type="text" 
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                        value={propietario}
                        onChange={ e => {
                            setPropietario(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >Email</label>
                    <input
                        id="email" 
                        type="email" 
                        placeholder="Email del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                        value={email}
                        onChange={ e => {
                            setEmail( e.target.value.toLowerCase() ); 
                        }}
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    >Fecha Alta</label>
                    <input
                        id="fecha" 
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                        value={fecha}
                        onChange={ e => {
                            setFecha(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    >Sintomas</label>
                    <textarea
                        id="sintomas" 
                        placeholder="Describe los Sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                        value={sintomas}
                        onChange={ e => {
                            setSintomas( e.target.value)
                        }}
                    />
                </div>

                <input 
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={ id ? 'Guardar Cambios' : 'Agregar Paciente'}
                />
            </form>

            {msg && <Alerta alerta={alerta} />}
        </>
    )
}

export default Formulario;