import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Table from './components/Table';

function App() {
  return (
    <div>
      <Navbar />
      <Filter />
      <div className='mt-8'>
        <Table/>
      </div>
    </div>
  );
}

export default App;
