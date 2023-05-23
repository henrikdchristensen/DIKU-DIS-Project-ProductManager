import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import Table from '../components/Table';
import { fetchData, numToFetch, settings, columns, table_names } from '../utils/utils';

export type FilterProps = {
  tables: string[];
  settings: settings;
  setSettings: Function;
};

export type TableProps = {
  columns: string[];
  data: any[];
  settings?: settings;
  setSettings?: Function;
  onClick?: Function;
  errMsg?: string;
};

const Overview = () => {
  const initialSettings: settings = {
    table_index: 0,
    columns: columns[0],
    sortBy: 0,
    desc: false,
    offset: 0,
    search: '',
  };

  const [settings, setSettings] = useState<settings>(initialSettings);
  const [data, setData] = useState<any[]>([]);

  var isAtBorrom = false;
  const handleScroll = () => {
    const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (isBottom && !isAtBorrom) {
      isAtBorrom = true;
      setSettings((prevSettings) => ({
        ...prevSettings,
        offset: prevSettings.offset + numToFetch,
      }));
    } else if (!isBottom) {
      isAtBorrom = false;
    }
  };

  var isFetching = false;
  const fetchAndUpdate = async (settings: settings) => {
    if (isFetching) return [];
    isFetching = true;
    try {
      var data = await fetchData(settings);
      isFetching = false;
      return data;
    } catch (error) {
      isFetching = false;
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    console.log('settings changed');
    fetchAndUpdate(settings)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [settings.sortBy, settings.desc, settings.search]);

  useEffect(() => {
    fetchAndUpdate({
      ...settings,
      offset: 0,
      columns: columns[settings.table_index],
      desc: false,
      sortBy: 0,
      search: '',
    }).then((data) => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        offset: 0,
        columns: columns[settings.table_index],
        sortBy: 0,
        desc: false,
        search: '',
      }));
      setData(data);
    });
  }, [settings.table_index]);

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
        <Filter tables={table_names} settings={settings} setSettings={setSettings} />
        <div className="px-10 my-8">
          <Table
            columns={settings.columns}
            data={data}
            settings={settings}
            setSettings={setSettings}
            onClick={(row: any) => {
              if (settings.table_index === 0) {
                window.location.href = `/product_template?id=${row[0]}`;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
