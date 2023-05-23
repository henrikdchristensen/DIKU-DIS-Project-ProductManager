import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Produced_product = () => {
  const [queryParameters] = useSearchParams();
  var device = queryParameters.get('id');

  const columns_produced = ['serial nr.', 'date', 'produced by'];
  const [data, setData] = useState<Record<string, any>>({
    journal: '',
    produced_products: [],
    parameters: [],
    id: '',
    name: '',
    owned_by: '',
  });

  useEffect(() => {
    axios
      .get(`/api/product_template?id=${device}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="mt-24 max-w-[70rem] m-auto px-10">
        <div className="text-center mb-8">
          <div className="relative">
            <div className="absolute top-0 left-0 py-3 flex items-center justify-start">
              <button
                className="flex items-center space-x-1 p-2 bg-gray-400 text-white rounded-full"
                onClick={() => window.history.back()}
              >
                <ArrowLeftIcon className="h-8 w-8" />
              </button>
            </div>
          </div>
          <label className="block text-2xl font-bold text-blue-950 mb-1">{data['id']}</label>
          <label className="block text-xl text-gray-500">
            {data['name']}, {data['owned_by']}
          </label>
        </div>
        <div className="flex justify-center space-x-[8%] mb-10">
          <div className="w-full max-w-[20rem]">
            <div className="">
              <label className="block pl-2 text-gray-700 font-bold text-lg mb-2" htmlFor="textarea">
                Parameters
              </label>
              <Table columns={[]} data={data['parameters']} errMsg="Has no parameters" />
            </div>
            <div className="mt-6">
              <label className="block pl-2 text-gray-700 font-bold text-lg mb-2" htmlFor="textarea">
                Journal
              </label>
              <textarea
                className="w-full h-32 p-2 border border-gray-300 rounded-lg bg-gray"
                placeholder="Enter text here..."
                defaultValue={data['journal']}
              />
            </div>
          </div>
          <div className="w-full max-w-[20rem]">
            <label className="block pl-2 text-gray-700 font-bold text-lg mb-2" htmlFor="textarea">
              Produced Products
            </label>
            <Table
              columns={columns_produced}
              data={data['produced_products']}
              errMsg="No produced products exist"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produced_product;
