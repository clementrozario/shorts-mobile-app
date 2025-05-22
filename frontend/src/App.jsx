import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Login from './pages/Login'
import { Toaster } from "react-hot-toast";

function App(){
  return(
    <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;