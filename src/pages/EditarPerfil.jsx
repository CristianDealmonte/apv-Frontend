import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const EditarPerfil = () => {

    const [alerta, setAlerta] = useState({});
    const { auth, actualizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({});


    useEffect( () => {
        setPerfil(auth);
    }, [auth]);

    // Accion al enviar el form
    const handleSubmit = async e => {
        e.preventDefault(); 

        const { nombre, email } = perfil;

        if([nombre, email].includes('')) {
            setAlerta({
                msg: 'EMAIL y NOMBRE son obligatorios',
                error: true
                
            })
            return; 
        }

        const resultado = await actualizarPerfil(perfil);

        setAlerta(resultado); 
    }

    const { msg } = alerta;

    return(
        <>
            <AdminNav></AdminNav>

            <h2 className="font-black text-center text-3xl mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
                <span className="text-indigo-600 font-bold">Información</span>
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
                            >Nombre</label>
                            <input 
                                type="text"
                                id="nombre"
                                name="nombre"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-none"
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label 
                                htmlFor="web" className="uppercase font-bold text-gray-600"
                            >Sitio Web</label>
                            <input 
                                type="text"
                                id="web"
                                name="web"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-none"
                                value={perfil.web || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label 
                                htmlFor="telefono" className="uppercase font-bold text-gray-600"
                            >Teléfono</label>
                            <input 
                                type="tel"
                                id="telefono"
                                name="telefono"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-none"
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label 
                                htmlFor="email" className="uppercase font-bold text-gray-600"
                            >Email</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg focus:outline-none"
                                value={perfil.email || ''}
                                onChange={e => setPerfil({ 
                                    ...perfil,
                                    [e.target.name] : e.target.value.toLowerCase()
                                })}
                            />
                        </div>

                        <input 
                            type="submit"
                            value='Guardar Cambios'
                            className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil;