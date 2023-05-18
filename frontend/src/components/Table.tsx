import { useEffect, useState } from 'react';
import axios from 'axios';
import { properties } from '../App';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const Table = (props: properties) => {
  const [data, setData] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOffset(0);
    setData([]);
    fetchData(props.listActive, 0);
  }, [props.listActive]);

  const fetchData = async (table: number, offset: number) => {
    try {
      let t = '';
      if (table === 0) t = 'product_templates';
      else if (table === 1) t = 'produced_products';
      const response = await axios.get(`/api/data?table=${t}&offset=${offset}`);
      const newData = response.data.data;
      setData((prevData) => [...prevData, ...newData]);
      setOffset((prevOffset) => prevOffset + 100);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  const columns = props.listActive === 0
    ? ['Id', 'Name', 'Journal', 'Owned by']
    : ['Serial number', 'Of Type', 'Date', 'Produced by'];

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setLoading(true);
      fetchData(props.listActive, offset);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className='px-10'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto max-w-[70rem] border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-transparent border-b border-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {column}
                       <ChevronUpDownIcon className="h-4 w-4 ml-1" />
                    </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
                <tr key={index} className="bg-white border-b">
                {row.map((value: any, idx: number) => (
                    <td key={idx}>{value}</td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table