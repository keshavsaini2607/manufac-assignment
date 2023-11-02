import React, { useEffect } from "react";
import FlavanoidsDataTable from "./components/dataTables/flavanoids";
import GammaDataTable from "./components/dataTables/gamma";
import wineDataSet from "./utils/Wine-Data.json";
import { WineClassInterface } from "./utils/types/wine-class.interface";

function App() {
   const [groupedData, setGroupedData] = React.useState<[WineClassInterface[]] | null>(null);

   useEffect(() => {
      const groupedData = wineDataSet.reduce((result: any, item) => {
         const alcoholClass = item.Alcohol;
         if (!result[alcoholClass]) {
            result[alcoholClass] = [];
         }
         result[alcoholClass].push(item);
         return result;
      }, {});

      if (groupedData) {
         setGroupedData(groupedData);
      }
   }, []);

   return (
      <div className="App">
         <FlavanoidsDataTable groupedData={groupedData} />
         <div className="seperator" />
         <GammaDataTable groupedData={groupedData} />
      </div>
   );
}

export default App;
