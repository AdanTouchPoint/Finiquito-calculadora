'use client'
import React, { useEffect } from 'react';
interface ThirdStepProps {
dailyPay: number;
setDailyPay: React.Dispatch<React.SetStateAction<number>>;
salary: number;
setSalary: React.Dispatch<React.SetStateAction<number>>;
period: number;
setPeriod: React.Dispatch<React.SetStateAction<number>>;
}
export default function ThirdStep({dailyPay,setDailyPay,salary,setSalary}: ThirdStepProps) {

    useEffect(() => {
        if(salary === 0){
            return
        }
    setDailyPay(salary);
    }, [salary,dailyPay,setDailyPay]);
    return(
<div className="mb-6">
        {/* Salario */}
        <h2 className="text-red-600 text-lg font-semibold mb-3">Salario</h2>
        <div className="grid grid-cols-1 mb-2 md:grid-cols-1 gap-4">
          <div>
          <label className="block text-gray-700 font-semibold text-xs">salario diario</label>
          <input
            type="number"
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 mb-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese el salario"
            min={0}
          />
          </div>
        </div>
      </div>
    )
    }