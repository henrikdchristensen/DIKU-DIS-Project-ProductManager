import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Table from './components/Table';

export interface properties {
  listActive: number;
  setListActive: Function;
}

function App() {

  // Shared state between Filter and Table
  // 0 = products, 1 = produced products
  const [listActive, setListActive] = useState(0);

  const [data, setData] = useState([]);  
  
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
