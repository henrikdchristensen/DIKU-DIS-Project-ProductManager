import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { TableProps } from '../pages/Overview';

const Table = (props: TableProps) => {

  return (
    <div className="px-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto max-w-[70rem] border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-transparent border-b border-gray-200">
            <tr>
              {props.columns.map((column, index) => (
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  //onClick={() => props.handleSortBy(index)}
                  key={index}
                >
                  <div className="flex items-center">
                    {column}
                    {index === props.selectedColumn && !props.desc ? (
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    ) : index === props.selectedColumn && props.desc ? (
                      <ChevronUpIcon className="h-4 w-4 ml-1" />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.map((row, index) => (
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
};

export default Table;
