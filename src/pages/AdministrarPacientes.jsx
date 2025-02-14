// Dependencias
import { useState } from "react";

// Componentes
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {

    const [mostrarForm, setMostrarForm] = useState(false);

    return(
        <div className="flex flex-col md:flex-row">
            <button
                type="button"
                className="bg-indigo-600 text-white font-bold mx-10 p-3 rounded-md mb-10 md:hidden"
                onClick={ () => setMostrarForm(!mostrarForm)}
            >{`${mostrarForm ? 'Ocultar' : 'Mostrar' }`} Formulario</button>
            <div className={`${mostrarForm ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
                <Formulario/>
            </div>
            <div className="md:w-1/2 lg:w-3/5">
                <ListadoPacientes/>
            </div>
        </div>
    )
}

export default AdministrarPacientes;