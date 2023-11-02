import React, { useEffect, useState } from "react";
import { WineClassInterface } from "../../../utils/types/wine-class.interface";
import { calculateMedian, calculateMode } from "../../../utils/helpers/dataFilterMethods";

type props = {
   groupedData: [WineClassInterface[]] | null;
};

interface ClassWiseDataInterface {
   mean: number;
   mode: number;
   median: number;
}

const FlavanoidsDataTable: React.FC<props> = ({ groupedData }) => {
   const [classWiseData, setClassWiseData] = useState<any>([]);

   useEffect(() => {
      if (groupedData && Object.keys(groupedData).length > 0) {
         Object.values(groupedData)?.forEach((classData, index) => {
            const alcoholClass = index + 1; // Class numbers start from 1

            const flavanoidsValues = classData.map((item) => item.Flavanoids);

            // Calculate mean
            const mean =
               flavanoidsValues.reduce((sum, value) => +sum + +value, 0) /
               flavanoidsValues.length;

            // Calculate mode
            const mode = calculateMode(flavanoidsValues);
            // // Calculate median
            const median = calculateMedian(flavanoidsValues);

            const classDataExists = classWiseData.find(
               (item: any) => item.alcoholClass === alcoholClass
            );
            if (!classDataExists) {
               setClassWiseData((prevState: any) => [
                  ...prevState,
                  { alcoholClass, mean, mode, median },
               ]);
            }
         });
      }
   }, [groupedData]);

   

   function TableRow({ title, dataKey }: any) {
      return (
         <tr>
            <td>{title}</td>
            {classWiseData.map((data: any, index: number) => (
               <td key={index}>{data[dataKey]}</td>
            ))}
         </tr>
      );
   }

   return (
      <div>
         <h1 className="tabular_heading">Flavanoids Data Table</h1>
         <div>
            <table>
               <thead>
                  <tr>
                     <th>Measure</th>
                     {classWiseData.map((data: any, index: any) => (
                        <th key={index}>{`Class ${index + 1}`}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  <TableRow title="Flavanoids Mean" dataKey="mean" />
                  <TableRow title="Flavanoids Mode" dataKey="mode" />
                  <TableRow title="Flavanoids Median" dataKey="median" />
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default FlavanoidsDataTable;
