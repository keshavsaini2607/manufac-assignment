import React from "react";
import { ClassWiseDataInterface } from "../../utils/types/classwise-data.interface";

type props = {
   data: ClassWiseDataInterface[];
   heading: string;
};

const Table: React.FC<props> = ({ data, heading }) => {
   function TableRow({ title, dataKey }: any) {
      return (
         <tr>
            <td>{title}</td>
            {data.map((data: any, index: number) => (
               <td key={index}>{data[dataKey].toFixed(3)}</td>
            ))}
         </tr>
      );
   }

   return (
      <table>
         <thead>
            <tr>
               <th>Measure</th>
               {data.map((data: any, index: any) => (
                  <th key={index}>{`Class ${index + 1}`}</th>
               ))}
            </tr>
         </thead>
         <tbody>
            <TableRow title={`${heading} Mean`} dataKey="mean" />
            <TableRow title={`${heading} Mode`} dataKey="mode" />
            <TableRow title={`${heading} Median`} dataKey="median" />
         </tbody>
      </table>
   );
};

export default Table;
