import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import Table from '../components/Table';
import axios from 'axios';

const Produced_product = ({ device }: { device : string}) => {
    const columns_produced = ['serial nr.', 'date', 'produced by'];
    const [data_produced, setDataProduced] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`/api/product_template?id=${device}`)
            .then(res => {
                console.log(res.data);
                setDataProduced(res.data["produced_products"]);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (

    <div>
        <Navbar />
        <div className='mt-36 max-w-[30rem] m-auto'>
            <Table 
                columns={columns_produced} 
                data={data_produced}
                desc={false}
                selectedColumn={-1}/>
        </div>
        
    </div>
    );
}
// export type TableProps = {
//     columns: string[];
//     data: any[];
//     selectedColumn: number;
//     desc: boolean;
// };

export default Produced_product;
