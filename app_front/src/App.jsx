import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import{BrowserRouter , Routes , Route, Router } from 'react-router-dom'
import Users from './Users'
import CreateUser from './CreateUserr'
import Updateuser from './UpdateUser'
import Navbarr from './Navbar'
import Books from './Books'
import Createbook from './CreateBook'
import Updatebook from './UpdateBook'
import Product from './Product'
import Createproduct from './CreateProduct'
import Updateproduct from './UpdateProduct'
import Login from './Login'
import Register from './Register'


const App = () => {
  return (
    <div >
      <BrowserRouter>
      <Navbarr />
        <Routes >
          <Route path='/' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/user' element={<Users />}></Route>
          <Route path='/create' element={<CreateUser />}></Route>
          <Route path='/update/:id' element={<Updateuser />}></Route>
          <Route path='/createb' element={<Createbook />}></Route>
          <Route path='/books' element={<Books />}></Route>
          <Route path='/updateBook/:id' element={<Updatebook />} ></Route>
          <Route path='/products' element={<Product/>}></Route>
          <Route path='/createp' element={<Createproduct />}></Route>
          <Route path='/updateproduct/:id' element={<Updateproduct />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App