import axios from 'axios';

export const numToFetch: number = 500;

export const table_names = ['Templates', 'Produced'];
export const tables = ['product_templates', 'produced_products'];
export const columns = [
  ['id', 'name', 'owned_by'],
  ['serial_number', 'of_type', 'date', 'produced_by'],
];

export type settings = {
  table_index: number;
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
    if (settings.desc) s = '-' + s;
    const response = await axios.get(
      `/api/data?table=${tables[settings.table_index]}&columns=${c}&sortBy=${s}&offset=${settings.offset}&search=${settings.search}&limit=${numToFetch}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
