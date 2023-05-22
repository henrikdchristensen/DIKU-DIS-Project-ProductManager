import axios from 'axios';

export const numToFetch: number = 500;

export const fetchData = async (table: string, columns: string[], sortBy: string, offset: number, search: string) => {
  try {
    let c = columns.join(',');
    const response = await axios.get(
      `/api/data?table=${table}&columns=${c}&sortBy=${sortBy}&offset=${offset}&search=${search}&limit=${numToFetch}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};