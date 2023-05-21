import { useState } from 'react';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Table from './components/Table';

export interface properties {
  listActive: number;
  setListActive: Function;
  searchQuery: string;
  setSearchQuery: Function;
}

function App() {

  // Shared state between Filter and Table
  // 0 = products, 1 = produced products
  const [listActive, setListActive] = useState(0);
  const [search, setSearch] = useState('');  
  
  return (
    <div>
      <Navbar />
      <Filter listActive={listActive} setListActive={setListActive} searchQuery={search} setSearchQuery={setSearch} />
      <div className='mt-8'>
        <Table listActive={listActive} setListActive={setListActive} searchQuery={search} setSearchQuery={setSearch} />
      </div>
    </div>
  );
}

export default App;
