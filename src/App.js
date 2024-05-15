import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/homePage/HomePage'
import 'reactjs-popup/dist/index.css';
import EditPopUp from './pages/edit/EditPopUp';
import {storage} from "./firebase";
import DashBoard from './pages/dashBoard/DashBoard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Edit' element={<EditPopUp/>}/>  
        <Route path='/Dashboard' element={<DashBoard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
