import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import Table from '../components/Table';
import axios from 'axios';

export type FilterProps = {
  list: string[];
  listActive: number;
  setListActive: Function;
  searchQuery: string;
  setSearchQuery: Function;
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
  let all_columns = [['']];
  let columns_loaded = false;

  const [listActive, setListActive] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [render_columns, setRenderColumns] = useState<string[]>(['']);
  const [selectedColumn, setSelectedColumn] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState(false);

  const handleSortBy = async (index: number) => {
    if (index === selectedColumn) {
      setDesc((prevDesc) => !prevDesc);
    } else {
      setDesc(false);
      setSelectedColumn(index);
    }
  };

  const numToFetch = 500;

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setLoading(true);
      const newOffset = offset + numToFetch;
      setOffset(newOffset);
    }
  };

  const fetchData = async (resetData: boolean, table: string, offset: number, search: string) => {
    try {
      if (resetData) setOffset(offset);
      let sort = all_columns[listActive][selectedColumn];
      if (desc) sort = '-' + sort;
      const response = await axios.get(
        `/api/data?table=${table}&sortBy=${sort}&offset=${offset}&search=${search}&limit=${numToFetch}`
      );
      const newData = response.data.data;
      if (resetData) setData(newData);
      else
        setData((prevData) => [...prevData, ...newData]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };


  const fetchColumns = async () => {
    try {
      const response = await axios.get(`/api/table_info`);
      const table_info = response.data.table_info;
      for (let i = 0; i < table_info.length; i++) {
        for (let j = 0; j < tables.length; j++) {
          if (table_info[i].table_name == tables[j])
            all_columns[j] = table_info[i].columns;
        }
      }
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  }

  const update =  async () => {
    if (!columns_loaded) {
      await fetchColumns();
      columns_loaded = true;
    }
    setRenderColumns(all_columns[listActive]);
    fetchData(true, tables[listActive], 0, searchQuery);
  }

  // On table change
  useEffect(() => {
    setSearchQuery('');
    setDesc(false);
    update();
  }, [listActive]);

  // On search, sort change
  useEffect(() => {
    fetchData(true, tables[listActive], 0, searchQuery);
  }, [searchQuery, selectedColumn, desc, offset]);

  // On scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


  return (
    
    <div>
      <Navbar />
      <Filter
        list={tables}
        listActive={listActive}
        setListActive={setListActive}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="mt-8">
        <Table
            columns={render_columns}
            data={data}
            selectedColumn={selectedColumn}
            handleSortBy={handleSortBy}
            desc={desc}
        />
      </div>
    </div>
  );
}

export default Overview;
