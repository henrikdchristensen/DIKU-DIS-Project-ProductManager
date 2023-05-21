import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import Table from '../components/Table';
import axios from 'axios';
  
export interface properties {
  listActive: number;
  setListActive: Function;
  searchQuery: string;
  setSearchQuery: Function;
}

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
  sortBy: string;
  desc: boolean;
  handleSortBy: Function;
};

const Overview = () => {
  const lowercaseWithUnderscore = (str: string): string => {
    const lowercased = str.toLowerCase();
    const replaced = lowercased.replace(/\s+/g, '_');
    return replaced;
  };

  const [listActive, setListActive] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [tableInfo, setTableInfo] = useState<string[]>();
  const [offset, setOffset] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);

  const numToFetch = 500;

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setLoading(true);
      const newOffset = offset + numToFetch;
      setOffset(newOffset);
    //   fetchData(false, props.listActive, sortBy, newOffset, props.searchQuery);
    }
  };

  const fetchData = async (resetData: boolean, table: number, sort: string, offset: number, search: string) => {
    try {
      if (resetData) setOffset(offset);
      let t = '';
      if (table === 0) t = 'product_templates';
      else if (table === 1) t = 'produced_products';
      const response = await axios.get(
        `/api/data?table=${t}&sortBy=${sort}&offset=${offset}&search=${search}&limit=${numToFetch}`
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

  const fetchTableInfo = async () => {
    try {
      const response = await axios.get(`/api/table_info`);
      const table_info = response.data.table_info;
      for (let i = 0; i < table_info.length; i++) {
        if (table_info[i].table_name === 'product_templates') {
          setTableInfo(table_info[i].columns);
          break;
        }
        else if (table_info[i].table_name === 'produced_products') {
            setTableInfo(table_info[i].columns);
            break;
        }
      }
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
    
  }

  const handleSortBy = (column: string) => {
    const newSortBy = lowercaseWithUnderscore(column);
    // setSortBy((prevSortBy) => {
    //   if (prevSortBy === newSortBy) {
    //     return prevSortBy.startsWith('-') ? newSortBy : `-${newSortBy}`;
    //   } else {
    //     return newSortBy;
    //   }
    // });
  };

  useEffect(() => {
    fetchTableInfo();
    }, []);

  // On table change
  useEffect(() => {
    setSearchQuery('');
    setSortBy('');
    fetchData(true, listActive, '', 0, '');
  }, [listActive]);

  // On search, sort change
  useEffect(() => {
    fetchData(true, listActive, sortBy, 0, searchQuery);
  }, [searchQuery, sortBy]);

  // On scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const s = ['Produkt skabeloner', 'Producerede produkter']

  return (
    
    <div>
      <Navbar />
      <Filter
        list={s}
        listActive={listActive}
        setListActive={setListActive}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="mt-8">
        <Table columns={['hej', 'test']} data={data} sortBy={sortBy} desc={false} handleSortBy={handleSortBy}
        />
      </div>
    </div>
  );
}

export default Overview;
