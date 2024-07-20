import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './pages/AccountPage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';


axios.defaults.baseURL = 'https://hustl-app-api.vercel.app';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/account" element={<AccountPage/>}/>
          <Route path="/account/posts" element={<PlacesPage/>}/>
          <Route path="/account/posts/new" element={<PlacesFormPage/>}/>
          <Route path="/account/posts/:id" element={<PlacesFormPage/>}/>
          <Route path="/post/:id" element={<PlacePage/>}/>
          <Route path="/account/favorites" element={<BookingsPage />} />
          <Route path="/account/favorites/:id" element={<BookingPage />} />

        </Route>

      </Routes>
    </UserContextProvider>
  )
}

export default App
