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
  handleSortBy: Function;
  selectedColumn: number;
  desc: boolean;
};

const Overview = () => {
  const tables = ['product_templates', 'produced_products'];
  const columns = [['id', 'name', 'owned_by'], ['serial_number', 'of_type', 'date', 'produced_by']];

  const [tableSelected, setTableSelected] = useState<number>(0);
  const [columnSelected, setColumnSelected] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>(columns[0][0]);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  let loading = false;


  const handleSortBy = (column: number) => {
    if (column === columnSelected)
      setSortBy((prevSortBy) => (prevSortBy[0] === '-' ? prevSortBy.slice(1) : '-' + prevSortBy));
    else {
      setColumnSelected(column);
      setSortBy(columns[tableSelected][column]);
    }
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      fetchAndUpdate(false);
    }
  };

  const fetchAndUpdate = async (reset: boolean) => {
    try{
      loading = true;
      let _offset = offset;
      if (reset){
        _offset = 0;
      };
      const newData = await fetchData(tables[tableSelected], columns[tableSelected], sortBy, _offset, search); // Fix the parameter to 'columns[tableSelected]'
      if (reset) setData(newData);
      else
        setData((prevData) => [...prevData, ...newData]);
      setOffset(_offset + numToFetch);
      loading = false;
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (!loading) fetchAndUpdate(true);
  }, [tableSelected, columnSelected, sortBy, search]);
  
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
          handleSortBy={handleSortBy}
          selectedColumn={columnSelected}
          desc={sortBy[0] === '-'}
        />
      </div>
    </div>
  );
};

export default Overview;
