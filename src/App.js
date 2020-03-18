import React from 'react';
import Navbar from './components/Navbar.js'; 
import Header from './components/Header.js'; 
import SearchBar from './components/SearchBar.js'; 
import EmployeeTable from './components/EmployeeTable.js'; 
import Wrapper from './components/Wrapper.js';  
import './App.css';

function App() {
  return ( 
    <>
      <Navbar /> 
      <Wrapper>
         <Header /> 
         <SearchBar /> 
         <EmployeeTable />
      </Wrapper>
    </>
  );
}

export default App;
