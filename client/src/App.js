import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Login } from './login';
import { Register } from './register';
import {Home} from './home';

function App() {
  const user = localStorage.getItem('token')
  return (
    <BrowserRouter>
        <Routes>
          {user && <Route path = '/home' exact element={<Home/>} />}
          <Route path='/' exact element={<Login/>}/>
          <Route path='/register' exact element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;