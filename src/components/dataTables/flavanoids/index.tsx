import React, { useEffect, useState } from "react";
import { WineClassInterface } from "../../../utils/types/wine-class.interface";
import { calculateMean, calculateMedian, calculateMode } from "../../../utils/helpers/dataFilterMethods";
import Table from "../../table";
import { ClassWiseDataInterface } from "../../../utils/types/classwise-data.interface";

type props = {
   groupedData: [WineClassInterface[]] | null;
};



const FlavanoidsDataTable: React.FC<props> = ({ groupedData }) => {
   const [classWiseData, setClassWiseData] = useState<ClassWiseDataInterface[]>([]);
   console.log(groupedData)

   useEffect(() => {
      if (groupedData && Object.keys(groupedData).length > 0) {
         Object.values(groupedData)?.forEach((classData, index) => {
            const alcoholClass = index + 1; // Class numbers start from 1

            const flavanoidsValues = classData.map((item) => Number(item.Flavanoids));
            console.log(flavanoidsValues)

            // Calculate mean
            const mean = calculateMean(flavanoidsValues);

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

   

   return (
      <div>
         <h1 className="tabular_heading">Flavanoids Data Table</h1>
         <div>
            <Table data={classWiseData} heading="Flavanoids" />
         </div>
      </div>
   );
};

export default FlavanoidsDataTable;
