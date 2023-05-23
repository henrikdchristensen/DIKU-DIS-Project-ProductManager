import axios from 'axios';

export const numToFetch: number = 100;

export const table_names = ['Templates', 'Produced'];
export const tables = ['product_templates', 'produced_products'];
export const columns = [
  ['id', 'name', 'owned_by'],
  ['serial_number', 'of_type', 'date', 'produced_by'],
];

export type settings = {
  table_index: number;
  columns: string[];
  sortBy: number;
  desc: boolean;
  offset: number;
  search: string;
  data: any[];
};

export const fetchData = async (settings: settings) => {
  try {
    let c = columns[settings.table_index].join(',');
    let s = columns[settings.table_index][settings.sortBy];
    if (settings.desc) s = '-' + s;
    const response = await axios.get(
      `/api/data?table=${tables[settings.table_index]}&columns=${c}&sortBy=${s}&offset=${
        settings.offset
      }&search=${settings.search}&limit=${numToFetch}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
