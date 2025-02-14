import React from 'react'
import {calcularProporcionVacaciones} from '../lib/utilities'
export default function SevenStep({vacationBonus,pendientBonus,senorityBonus,vacationsPolitics,aguinaldo,dailySalary,senority,aguinaldoDays,debt,vacationDebt,vacationsDaysDebt,bonusSelect,supBonusSelect,totalDebt}) {
    const util = (bonusSelect,supBonusSelect) => {
        return bonusSelect === 'ley' ? '25%' : supBonusSelect
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
        <span className="text-gray-600">{dailySalary}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Total de años trabajados:</span>
        <span className="text-gray-600">{senority}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Política vacaciones por antigüedad:</span>
        <span className="text-gray-600">{calcularProporcionVacaciones(senority)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Política de prima vacacional por antigüedad:</span>
        <span className="text-gray-600">{ util(bonusSelect,supBonusSelect) }</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Aguinaldo:</span>
        <span className="text-gray-600">{aguinaldoDays ? aguinaldoDays?.toFixed(2) : 0}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pagos pendientes</h3>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Días pendientes de pago: </span>
        <span className="text-gray-600">{debt}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Días de vacaciones pendientes de pago:</span>
        <span className="text-gray-600">{vacationsDaysDebt}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Prima vacacional pendiente de pago:</span>
        <span className="text-gray-600">{vacationDebt === 0 ? 0 : vacationsDaysDebt* util(bonusSelect,supBonusSelect) }</span>
      </div>
    </div>

    {/* Desgloses adicionales */}
    <div className="space-y-2">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Desglose de pagos de finiquito</h3>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Sueldo:</span>
        <span className="text-gray-600">{totalDebt.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Aguinaldo:</span>
        <span className="text-gray-600">{aguinaldo?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Vacaciones:  </span>
        <span className="text-gray-600">{vacationsPolitics + vacationDebt}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Prima vacacional: </span>
        <span className="text-gray-600">{vacationBonus * pendientBonus }</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Prima de antigüedad:</span>
        <span className="text-gray-600">{senorityBonus}</span>
      </div>
    </div>

    {/* Total de finiquito */}
    <div className="mt-6 border-t border-gray-300 pt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-blue-600">Total de finiquito:</h2>
        <span className="text-gray-900 font-bold">________</span>
      </div>
    </div>
  </div>
</div>






    )
    }