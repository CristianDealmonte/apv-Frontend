import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from '../components/Alerta';
import useAuth from "../hooks/useAuth";



const CambiarPassword = () => {

    const { guardarPassword } = useAuth(); 

    const [alerta, setAlerta] = useState({}); 
    const [password, setPassword] = useState({
        passActual: '',
        passNuevo: ''
    })

    const handleSubmit = async (e) => { 
        e.preventDefault();

        if( Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        if(password.passNuevo.length < 8) {
            setAlerta({
                msg: 'La contraseña debe tener minimo 8 caracteres',
                error: true
            })
            return;
        }

        const respuesta = await guardarPassword(password);
        setAlerta(respuesta);
    }

     const { msg } = alerta;


    return(
        <>
            <AdminNav/>

            <h2 className="font-black text-center text-3xl mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
                <span className="text-indigo-600 font-bold">Password</span>
            </p>

            <div
                className="flex justify-center"
            >
                <div
                    className="w-full md:1/2 bg-white shadow rounded-lg p-5"
                >
                    {msg && <Alerta alerta={alerta}/>}
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label 
                                htmlFor="nombre" className="uppercase font-bold text-gray-600"
                            >Contraseña Actual</label>
                            <input 
                                type="password"
                                id="passActual"
                                name="passActual"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-none"
                                placeholder="Escribe tu contraseña actual"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label 
                                htmlFor="nombre" className="uppercase font-bold text-gray-600"
                            >Contraseña Nueva</label>
                            <input 
                                type="password"
                                id="passNuevo"
                                name="passNuevo"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-none"
                                placeholder="Escribe tu nueva contraseña"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <input 
                            type="submit"
                            value='Actualizar Contraseña'
                            className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CambiarPassword;