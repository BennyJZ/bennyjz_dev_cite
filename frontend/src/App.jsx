import {BrowserRouter ,Routes, Route} from "react-router-dom"

import TestForm from "./components/Buttons/TestForm.jsx"
import LoginForm from "./components/Buttons/Login.jsx"
import Home from "./components/Home/home.jsx"


function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<TestForm />}/>
        <Route path="/login" element={<LoginForm />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
