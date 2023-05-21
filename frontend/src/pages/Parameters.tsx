import { useState } from 'react';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import Table from '../components/Table';

export interface properties {
  listActive: number;
  setListActive: Function;
  searchQuery: string;
  setSearchQuery: Function;
}
  
const Parameters = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Parameters;
