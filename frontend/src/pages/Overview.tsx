import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import Table from '../components/Table';
import { fetchData, numToFetch, settings } from '../utils/utils';

export type FilterProps = {
  tables: string[];
  settings: settings;
  setSettings: Function;
};

export type TableProps = {
  columns: string[];
  data: any[];
  settings: settings;
  setSettings: Function;
};

const Overview = () => {
  const tables = ['product_templates', 'produced_products'];
  const columns = [
    ['id', 'name', 'owned_by'],
    ['serial_number', 'of_type', 'date', 'produced_by'],
  ];
  const initialSettings: settings = {
    table_name: tables[0],
    columns: columns[0],
    sortBy: columns[0][0],
    desc: false,
    offset: 0,
    search: '',
  };

  const [settings, setSettings] = useState<settings>(initialSettings);
  const [data, setData] = useState<any[]>([]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 20 && data.length % numToFetch === 0) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        offset: prevSettings.offset + numToFetch,
      }));
    }
  };

  const fetchAndUpdate = async (settings: settings) => {
    try {
      return await fetchData(settings);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAndUpdate(settings)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [settings.sortBy, settings.desc, settings.search]);

  useEffect(() => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      offset: 0,
      columns: columns[tables.indexOf(settings.table_name)],
      sortBy: columns[tables.indexOf(settings.table_name)][0],
      desc: false,
      search: '',
    }));
  }, [settings.table_name]);

  useEffect(() => {
    fetchAndUpdate(settings)
      .then((data) => {
        setData((prevData) => [...prevData, ...data]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [settings.offset]);

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
        <Filter tables={tables} settings={settings} setSettings={setSettings} />
        <Table
          columns={columns[tables.indexOf(settings.table_name)]}
          data={data}
          settings={settings}
          setSettings={setSettings}
        />
      </div>
    </div>
  );
};

export default Overview;
