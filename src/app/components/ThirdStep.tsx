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
export default function ThirdStep({dailyPay,setDailyPay,salary,setSalary,debt,setDebt,totalDebt,setTotalDebt}: ThirdStepProps) {

    useEffect(() => {
        if(salary === 0){
            return
        }
    setDailyPay(salary);
    setTotalDebt(debt*dailyPay);
    }, [salary,debt,dailyPay,setDailyPay,setTotalDebt]);
    return(
<div className="mb-6">
        {/* Salario */}
        <h2 className="text-red-600 text-lg font-semibold mb-3">Salario</h2>
        <div className="grid grid-cols-1 mb-2 md:grid-cols-2 gap-4">
          <div>
          <label className="block text-gray-700 font-semibold text-xs">salario diario</label>
          <input
            type="number"
            onChange={(e) => setSalary(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese el salario"
            min={0}
          />
          </div>
         {/* Días adeudados */}
         <div>
          <label className="block font-semibold text-gray-700 text-xs">¿cuántos días de salario se adeudan?</label>
          <input
            type="number"
            onChange={(e) => setDebt(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese los días adeudados"
            min={0}
          />
        </div>
        </div>
        <div hidden={true} className="grid grid-cols-1 mb-2 md:grid-cols-2 gap-4 mt-4">
        <div hidden>
        <label className="block text-gray-700 font-semibold text-xs">
          Salario diario:
        </label>
        <input
        readOnly
        value={dailyPay.toFixed(2)}
        className="border border-gray-300 rounded-lg p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
        />
        </div>
     <div hidden>
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