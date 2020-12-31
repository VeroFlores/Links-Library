import React from 'react';
import './App.css';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import Links from './components/links'
import { ToastContainer} from 'react-toastify';
// componente que ayuda a mostrar 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container p-4">
      <div className="row">
        <Links/>
      </div>
      <ToastContainer/>
    </div>

    );
}

export default App;
