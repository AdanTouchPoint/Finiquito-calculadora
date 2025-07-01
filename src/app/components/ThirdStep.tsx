'use client'
import React, { useEffect } from 'react';
interface ThirdStepProps {
dailyPay: number;
setDailyPay: React.Dispatch<React.SetStateAction<number>>;
salary: number;
setSalary: React.Dispatch<React.SetStateAction<number>>;
period: number;
setPeriod: React.Dispatch<React.SetStateAction<number>>;
setTotalSalaryDebt: React.Dispatch<React.SetStateAction<number>>;
salaryDebt: number;
setSalaryDebt: React.Dispatch<React.SetStateAction<number>>;
}
export default function ThirdStep({dailyPay,setDailyPay,salary,setSalary, setTotalSalaryDebt,salaryDebt,setSalaryDebt}: ThirdStepProps) {

    useEffect(() => {
        if(salary === 0){
            return
        }
    setDailyPay(salary);
    setTotalSalaryDebt( salaryDebt * salary);
    }, [salary,dailyPay,setDailyPay,salaryDebt]);
    return(
<div className="mb-6">
        {/* Salario */}
        <h2 className="text-red-600 text-lg font-semibold mb-3">Salario</h2>
        <div className="grid grid-cols-1 mb-2 md:grid-cols-1 gap-4">
          <div>
          <label className="block text-gray-700 font-semibold text-xs">Salario Diario</label>
          <input
            type="number"
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 mb-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese el salario"
            min={0}
          />
          </div>
        </div>
             <div className="grid grid-cols-1 mb-2 md:grid-cols-1 gap-4">
          <div>
          <label className="block text-gray-700 font-semibold text-xs">Días de Salario Adeudados</label>
          <input
            type="number"
            onChange={(e) => setSalaryDebt(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 mb-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese los días adeudados"
            min={0}
          />
          </div>
        </div>
      </div>
    )
    }