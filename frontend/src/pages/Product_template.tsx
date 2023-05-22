import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import Table from '../components/Table';
import axios from 'axios';

const Produced_product = ({ device }: { device : string}) => {

    return (

    <div>
        <Navbar />
    </div>
    );
}

export default Produced_product;
