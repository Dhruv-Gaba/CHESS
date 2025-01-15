import { Move } from "chess.js";

export const MovesTable = ({ moves }: { moves: Move[] }) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-2">
                From
              </th>
              <th scope="col" className="px-6 py-2">
                To
              </th>
            </tr>
          </thead>
          <tbody>
            {moves.map((move, i) => {
              return (
                <tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {move.from}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {move.to}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <table classNameName="border-b">
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                    </tr>
                </thead>
                <tbody>
                    
                        
                </tbody>
            </table> */}
    </div>
  );
};
