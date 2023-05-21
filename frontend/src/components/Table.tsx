import { useEffect, useState } from 'react';
import axios from 'axios';
import { properties } from '../App';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

const Table = (props: properties) => {
  const lowercaseWithUnderscore = (str: string): string => {
    const lowercased = str.toLowerCase();
    const replaced = lowercased.replace(/\s+/g, '_');
    return replaced;
  };

  const columns = props.listActive === 0
    ? ['Id', 'Name', 'Journal', 'Owned by']
    : ['Serial number', 'Of Type', 'Date', 'Produced by'];

  const [data, setData] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [sortBy, setSortBy] = useState(lowercaseWithUnderscore(columns[0]));
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setLoading(true);
      const newOffset = offset + 100;
      setOffset(newOffset);
      fetchData(props.listActive, sortBy, newOffset, props.search);
    }
  };

  const fetchData = async (table: number, sort: string, offset: number, search: string) => {
    try {
      let t = '';
      if (table === 0) t = 'product_templates';
      else if (table === 1) t = 'produced_products'
      const response = await axios.get(`/api/data?table=${t}&sortBy=${sort}&offset=${offset}&search=${search}`);
      const newData = response.data.data;
      setData((prevData) => [...prevData, ...newData]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  const handleSortBy = (column: string) => {
    const newSortBy = lowercaseWithUnderscore(column);
    setSortBy((prevSortBy) => {
      if (prevSortBy === newSortBy) {
        return prevSortBy.startsWith('-') ? newSortBy : `-${newSortBy}`;
      } else {
        return newSortBy;
      }
    });
  };

  // On table change
  useEffect(() => {
    props.setSearch('');
    setSortBy(lowercaseWithUnderscore(columns[0]));
    setOffset(0);
    setData([]);
    fetchData(props.listActive, lowercaseWithUnderscore(columns[0]), 0, props.search);
  }, [props.listActive]);

  // On search change
  useEffect(() => {
    setOffset(0);
    setData([]);
    fetchData(props.listActive, sortBy, 0, props.search);
  }, [props.search]);

  // On sort change
  useEffect(() => {
    setData([]);
    setOffset(0);
    fetchData(props.listActive, sortBy, 0, props.search);
  }, [sortBy]);

  // On scroll
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
              <th
                key={index}
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSortBy(column)}
              >
                <div className="flex items-center">
                {column}
                  {sortBy === `${lowercaseWithUnderscore(column)}` ? (
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                  ) : sortBy === `-${lowercaseWithUnderscore(column)}` ? (
                    <ChevronUpIcon className="h-4 w-4 ml-1" />
                  ) : null}
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