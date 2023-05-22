import axios from 'axios';

export const numToFetch: number = 500;

export type settings = {
  table_name: string;
  columns: string[];
  sortBy: string;
  desc: boolean;
  offset: number;
  search: string;
};

export const fetchData = async (settings: settings) => {
  try {
    let c = settings.columns.join(',');
    let s = settings.sortBy;
    if (settings.desc)
      s = '-' + s;
    const response = await axios.get(
      `/api/data?table=${settings.table_name}&columns=${c}&sortBy=${s}&offset=${settings.offset}&search=${settings.search}&limit=${numToFetch}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};