import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import Table from '../components/Table';
import { fetchData, numToFetch } from '../utils/utils';

export type FilterProps = {
  tables: string[];
  tableSelected: number;
  setTableSelected: Function;
  search: string;
  setSearch: Function;
};

export type TableProps = {
  columns: string[];
  data: any[];
  selectedColumn: number;
  desc: boolean;
};



const Overview = () => {

  const tables = ['product_templates', 'produced_products']
  const columns =  [['id', 'name', 'owned_by'], ['serial_number', 'of_type', 'date', 'produced_by']]

  const [tableSelected, setTableSelected] = useState<number>(0);
  const [columnSelected, setColumnSelected] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>(columns[0][0])
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<[string[]][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
    }
  };

  const fetchAndUpdate = async (reset: boolean) => {
    setLoading(true);
    let o = offset;
    if (reset) o = 0;
    const newData = await fetchData(tables[tableSelected], columns[columnSelected], sortBy, o, search);
    if (reset) setData(newData);
    else{
      setData((prevData) => [...prevData, ...newData]);
    }
    setOffset(o + numToFetch);
    setLoading(false);
  };

  useEffect(() => {
    fetchAndUpdate(false);
  }, []);

  useEffect(() => {
    fetchAndUpdate(false);
  }, [tableSelected, columnSelected, sortBy, offset, search]);

  useEffect(() => {
    fetchAndUpdate(true);
  }, [tableSelected, columnSelected, sortBy, offset, search]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (

    <div>
      <Navbar />
      <div className="mt-8">
        <Filter
          tables={tables}
          tableSelected={tableSelected}
          setTableSelected={setTableSelected}
          search={search}
          setSearch={setSearch}
        />
        <Table
          columns={columns[tableSelected]}
          data={data}
          selectedColumn={columnSelected}
          desc={false}
        />
      </div>
    </div>
  );
};

export default Overview;

