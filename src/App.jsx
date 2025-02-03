import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import AuthLayout from './layout/AuthLayout';
import AdminLayout from './layout/AdminLayout';

// Pages
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import ResetPassword from './pages/ResetPassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import NuevaContraseña from './pages/NuevaContraseña';
import AdministrarPacientes from './pages/AdministrarPacientes';
import EditarPerfil from './pages/EditarPerfil';
import CambiarPassword from './pages/CambiarPassword';

// Context
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

function App() {

  return (


    // crear enrutador
    <BrowserRouter> 
      <AuthProvider> 
        <PacientesProvider>

          <Routes> {/* crear conjunto derutas */}
            <Route path='/' element={<AuthLayout/>}>{/* indica el layout principal */}
                  {/* asigna varios layouts al layout principal dependiendo de la ruta */}
                <Route index element={ <Login/> }/>
                <Route path='registrar' element={ <Registrar/> }/>
                <Route path='Confirmar/:token' element={ <ConfirmarCuenta/> }/>
                <Route path='reset-password' element={ <ResetPassword/> }/>
                <Route path='reset-password/:token' element={ <NuevaContraseña/> }/>
            </Route>

            {/* Rutas protegidas */}
            <Route path='/admin' element={ <AdminLayout/> }>
              <Route index element={ <AdministrarPacientes/> }/>
              <Route path='perfil' element={ <EditarPerfil/> }/>
              <Route path='perfil/cambiar-password' element={ <CambiarPassword/> }/>

            </Route>
          </Routes>
          
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>


  )
}

export default App
