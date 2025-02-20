'use client'
import React, { useEffect } from 'react';
interface ThirdStepProps {
dailyPay: number;
setDailyPay: React.Dispatch<React.SetStateAction<number>>;
salary: number;
setSalary: React.Dispatch<React.SetStateAction<number>>;
debt: number;
setDebt: React.Dispatch<React.SetStateAction<number>>;
totalDebt: number;
setTotalDebt: React.Dispatch<React.SetStateAction<number>>;
period: number;
setPeriod: React.Dispatch<React.SetStateAction<number>>;
}
export default function ThirdStep({dailyPay,setDailyPay,salary,setSalary,debt,setDebt,totalDebt,setTotalDebt,period,setPeriod}: ThirdStepProps) {

    useEffect(() => {
        if(period === 0 || salary === 0 || debt === 0){
            return
        }
    setDailyPay(salary/period);
    setTotalDebt(debt*dailyPay);
    }, [salary,debt,period,dailyPay,setDailyPay,setTotalDebt]);
    return(
<div className="mb-6">
        {/* Salario */}
        <h2 className="text-red-600 text-lg font-semibold mb-3">Salario</h2>
        <div className="grid grid-cols-1 mb-2 md:grid-cols-2 gap-4">
          <div>
          <label className="block text-gray-700 font-semibold text-xs">Importe</label>
          <input
            type="number"
            onChange={(e) => setSalary(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese el salario"
          />
          </div>
          
        {/* Periodicidad */}
        <div>
          <label className="block text-gray-700 font-semibold text-xs">Periodicidad</label>
          <select
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-red-500 text-[#848484]">
            <option>Seleccione una opción</option>
            <option value="1">Diario</option>
            <option value="30">Mensual</option>
            <option value="365">Anual</option>
          </select>
        </div>
        </div>
        {/* Días adeudados */}
        <div className="mb-4">
          <label className="font-semibold text-gray-700 text-xs">¿Cuántos días de la quincena/mes se adeudan?</label>
          <input
            type="number"
            onChange={(e) => setDebt(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese los días adeudados"
          />
        </div>
        <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-4 mt-4">
        <div>
        <label className="block text-gray-700 font-semibold text-xs">
          Salario diario:
        </label>
        <input
        readOnly
        value={dailyPay.toFixed(2)}
        className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
        />
        </div>
     <div>
     <label className="block text-gray-700 font-semibold text-xs">
          Importe de salario pendiente:
        </label>
        <input
        readOnly
        value={totalDebt.toFixed(2)}
        className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
        />
     </div>
        </div>
      </div>
    )
    }