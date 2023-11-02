import React from 'react'
import { WineClassInterface } from '../../../utils/types/wine-class.interface'

type props = {
  groupedData: [WineClassInterface[]] | null
}

const GammaDataTable:React.FC<props> = ({groupedData}) => {
  return (
    <div>
        <h1 className='tabular_heading'>Gamma Data Table</h1>
    </div>
  )
}

export default GammaDataTable