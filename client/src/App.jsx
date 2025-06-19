import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Blog from './pages/Blog'
import Header from './components/Header'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'


const App = () => {
  return (
    <BrowserRouter>
    <Blog/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App