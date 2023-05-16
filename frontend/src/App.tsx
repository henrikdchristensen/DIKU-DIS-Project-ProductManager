import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Table from './components/Table';

function App() {
  const [listActive, setListActive] = useState(0);
  
  return (
    <div>
      <Navbar />
      <Filter listActive={listActive} setListActive={setListActive} />
      <div className='mt-8'>
        <Table listActive={listActive} setListActive={setListActive} />
      </div>
    </div>
  );
}

export default App;
