// Dependences 
import { Outlet, Navigate } from "react-router-dom";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const AdminLayout = () => {

    const { auth, cargando } = useAuth();

    if(cargando) return 'cargando...';

    return(
        <>
            <Header/>

            {/* Verifica que auth.id exista y muestra contenido condicionalmente */}
            { auth?._id ? (
                <main className="container mx-auto mt-10">
                    <Outlet/>
                </main>
                ) : <Navigate to='/' />}

            <Footer/>
        </>
    )
}

export default AdminLayout;