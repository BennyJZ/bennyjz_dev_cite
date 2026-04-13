import {BrowserRouter ,Routes, Route} from "react-router-dom"

import TestForm from "./components/TestForm.jsx"
import LoginForm from "./components/Login.jsx"
import Home from "./components/home.jsx"
import Owner from "./components/owner.jsx"


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<TestForm />}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/owner" element={<Owner />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
