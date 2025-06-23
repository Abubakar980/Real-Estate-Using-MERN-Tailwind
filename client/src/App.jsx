import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import Listing from './pages/Listing'
import EditListing from './pages/EditListing'
import MyMessages from './pages/MyMessages'
import AllListings from './pages/AllListings'
import Search from './pages/Search'


const App = () => {
  return (
    <BrowserRouter>      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/create-listing" element={<CreateListing/>}/>
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/update-listing/:id" element={<EditListing />} />
          <Route path="/my-messages" element={<MyMessages />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path="/all-listings" element={<AllListings />} />        
      </Routes>
    </BrowserRouter>
  )
}

export default App