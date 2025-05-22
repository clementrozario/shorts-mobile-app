import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Login from './pages/Login'
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";

function App(){
  return(
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;