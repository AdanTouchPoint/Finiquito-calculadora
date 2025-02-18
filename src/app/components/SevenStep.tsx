import React,{useEffect,useState} from 'react'
import {calcularProporcionVacaciones} from '../lib/utilities'
interface SevenStepProps {
  vacationsBonus: number;
  pendientBonus: number;
  senorityBonus: number;
  vacationsPolitics: number;
  aguinaldo: number;
  dailyPay: number;
  senority: number;
  aguinaldoDays: number;
  debt: number;
  vacationDebt: number;
  vacationsDaysDebt: number;
  bonusSelect: string;
  supBonusSelect: number;
  totalDebt: number;
}
export default function SevenStep({vacationsBonus,pendientBonus,senorityBonus,vacationsPolitics,aguinaldo,dailyPay,senority,aguinaldoDays,debt,vacationDebt,vacationsDaysDebt,bonusSelect,supBonusSelect,totalDebt}: SevenStepProps) {
const [bonusVacationSenority,setBonusVacationSenority] = useState(0);
const [vacationsTotal,setVacationsTotal]= useState(0);
const [vacationsBonusTotal,setVacationsBonusTotal] = useState(0);
    useEffect(() => {
        if(bonusSelect === '' ) return 
        if(bonusSelect === 'ley') return setBonusVacationSenority(vacationsDaysDebt * 0.25)
        if(bonusSelect === 'sup') return  setBonusVacationSenority(vacationsDaysDebt * supBonusSelect / 100)
    }, [vacationsDaysDebt,bonusSelect,supBonusSelect]);
    
    useEffect( () => {
      setVacationsTotal(vacationsPolitics + vacationDebt)
      setVacationsBonusTotal(vacationsBonus + pendientBonus)
     },[,vacationsPolitics,vacationsBonus,pendientBonus,vacationsDaysDebt,vacationDebt])

    const calculateTotal = (totalDebt:number,aguinaldo: number,vacationsTotal: number,vacationsBonusTotal: number,senorityBonus: number ) => {
        return totalDebt + aguinaldo + vacationsTotal + vacationsBonusTotal + senorityBonus
    }
    return(
<div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Detalle de Finiquito</h2>

  {/* Desglose de pagos de finiquito */}
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Prestaciones</h3>
    
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Salario diario:</span>
        <span className="text-gray-600">{dailyPay.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Total de años trabajados:</span>
        <span className="text-gray-600">{senority.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Política vacaciones por antigüedad:</span>
        <span className="text-gray-600">{calcularProporcionVacaciones(senority) > 0 ? calcularProporcionVacaciones(senority) : 0 }</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Política de prima vacacional por antigüedad:</span>
        <span className="text-gray-600">{ bonusSelect  === 'ley' ? '25%' : supBonusSelect + " %"}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Aguinaldo:</span>
        <span className="text-gray-600">{aguinaldoDays.toFixed(2)}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pagos pendientes</h3>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Días pendientes de pago: </span>
        <span className="text-gray-600">{debt.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Días de vacaciones pendientes de pago:</span>
        <span className="text-gray-600">{vacationsDaysDebt.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Prima vacacional pendiente de pago:</span>
        <span className="text-gray-600">{bonusVacationSenority.toFixed(2)}</span>
      </div>  
    </div>

    {/* Desgloses adicionales */}
    <div className="space-y-2">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Desglose de pagos de finiquito</h3>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Sueldo:</span>
        <span className="text-gray-600">{totalDebt?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Aguinaldo:</span>
        <span className="text-gray-600">{aguinaldo?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Vacaciones:  </span>
        <span className="text-gray-600">{vacationsTotal?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Prima vacacional: </span>
        <span defaultValue={0} className="text-gray-600">{vacationsBonusTotal?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Prima de antigüedad:</span>
        <span defaultValue={0} className="text-gray-600">{senorityBonus.toFixed(2)}</span>
      </div>
    </div>
    {/* Total de finiquito */}
    <div className="mt-6 border-t border-gray-300 pt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-blue-600">Total de finiquito:</h2>
        <span className="text-gray-900 font-bold">{calculateTotal(totalDebt,aguinaldo,vacationsTotal,vacationsBonusTotal,senorityBonus,).toFixed(2)}</span>
      </div>
    </div>
  </div>
</div>
  )
}

