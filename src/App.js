import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import CompanyForm from './CompanyDetails';
import React from 'react';

// function App() {
//   return <CompanyForm />;
// }

// export default App;


// import Sidebar from './Sidebar';

// function App() {
//   return (
//     <div style={{ display: 'flex' }}>
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f4f7fe' }}>
//         <h1>Empty Page</h1>
//         <p>This is just an empty page to demonstrate the sidebar navigation.</p>
//       </div>
//     </div>
//   );
// }

// export default App;


// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginButton from './LoginButton';
import Callback from './Callback';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/company" element={<CompanyForm />} /> {/* 👈 Add this route */}
        <UploadAndList userSub="cognito-user-sub-from-token" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
