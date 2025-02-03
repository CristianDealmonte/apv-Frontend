import { Outlet } from 'react-router-dom';


const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto lg:grid lg:grid-cols-2 mt-12 lg:mt-0 lg:gap-10 p-5 items-center min-h-screen">

                {/* indica que se insertara contenido adicional aqui */}
                <Outlet/> 

            </main>

        </>
    )
}

export default AuthLayout;