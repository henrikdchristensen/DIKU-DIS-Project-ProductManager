import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { TableProps } from '../pages/Overview';

const Table = (props: TableProps) => {
  const handleSortBy = (column: number) => {
    if (!props.setSettings || !props.settings) return;
    if (column === props.settings.sortBy)
      props.setSettings({ ...props.settings, desc: !props.settings.desc });
    else props.setSettings({ ...props.settings, sortBy: column, desc: false });
  };
  var content;
  if (props.data.length === 0 && props.errMsg) {
    content = (
      <div className="shadow-md sm:rounded-lg m-auto max-w-[70rem] w-full border border-gray-200">
        <span className="text-center text-gray-500 text-base py-5 px-8 block">{props.errMsg}</span>
      </div>
    );
  } else {
    content = (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto max-w-[70rem] border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-transparent border-b border-gray-200">
            <tr>
              {props.columns.map((column, index) => (
                <th
                  scope="col"
                  className="px-3 py-3 cursor-pointer"
                  onClick={() => handleSortBy(index)}
                  key={index}
                >
                  <div className="flex items-center">
                    <label className="text-center w-full">{column}</label>
                    {!props.settings ? null : index === props.settings.sortBy &&
                      !props.settings.desc ? (
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    ) : index === props.settings.sortBy && props.settings.desc ? (
                      <ChevronUpIcon className="h-4 w-4 ml-1" />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.map((row, index) => {
              row = typeof row == 'object' ? row : [row];
              return (
                <tr
                  key={index}
                  className="bg-white border-b text-center hover:bg-gray-100"
                  onClick={() => props.onClick && props.onClick(row)}
                >
                  {row.map((value: any, idx: number) => (
                    <td key={idx} className="px-4 py-2 max-w-[10rem]">
                      {value}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return content;
};

export default Table;
