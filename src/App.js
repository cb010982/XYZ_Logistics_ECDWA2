import CompanyForm from './CompanyDetails';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Callback from './Callback';
import UploadAndList from './UploadAndList';
import LoginRedirect from './LoginRedirect'; 
function App() {
  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<LoginRedirect />} />
    <Route path="/callback" element={<Callback />} />
    <Route path="/company" element={<CompanyForm />} />
    <Route path="/upload" element={<UploadAndList />} /> 
  </Routes>
</BrowserRouter>
  );
}

export default App;
