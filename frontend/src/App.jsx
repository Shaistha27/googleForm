import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormBuilder from './components/FormBuilder';
import ResponseForm from './components/ResponseForm';
import Success from './components/Success';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/form/:id" element={<ResponseForm />} /> 
        <Route path="/success" element={<Success/>} /> 
      </Routes>
    </Router>
  );
};

export default App;
