import React, { useEffect } from "react";
import { WineClassInterface } from "../../../utils/types/wine-class.interface";
import {
   calculateMedian,
   calculateMode,
} from "../../../utils/helpers/dataFilterMethods";

type props = {
   groupedData: [WineClassInterface[]] | null;
};

const GammaDataTable: React.FC<props> = ({ groupedData }) => {
   const [classGammaData, setClassGammaData] = React.useState<any>([]);

   useEffect(() => {
      if (groupedData && Object.keys(groupedData).length > 0) {
         Object.values(groupedData).map((data: any, index: number) => {
            const alcoholClass = index + 1;
            const gammaValues = data.map(
               (item: any) => (item.Ash * item.Hue) / item.Magnesium
            );
            const mean =
               gammaValues.reduce(
                  (sum: number, value: number) => +sum + +value,
                  0
               ) / gammaValues.length;

            // Calculate mode
            const mode = calculateMode(gammaValues);
            // // Calculate median
            const median = calculateMedian(gammaValues);

            const classDataExists = classGammaData.find(
               (item: any) => item.alcoholClass === alcoholClass
            );
            if (!classDataExists) {
               setClassGammaData((prevState: any) => [
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
            {classGammaData.map((data: any, index: number) => (
               <td key={index}>{data[dataKey]}</td>
            ))}
         </tr>
      );
   }

   return (
      <div>
         <h1 className="tabular_heading">Gamma Data Table</h1>
         <div>
            <table>
               <thead>
                  <tr>
                     <th>Measure</th>
                     {classGammaData.map((data: any, index: any) => (
                        <th key={index}>{`Class ${index + 1}`}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  <TableRow title="Gamma Mean" dataKey="mean" />
                  <TableRow title="Gamma Mode" dataKey="mode" />
                  <TableRow title="Gamma Median" dataKey="median" />
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default GammaDataTable;
