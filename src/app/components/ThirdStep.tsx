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
<div className="flex flex-col gap-4">
        {/* Salario */}
        <div>
          <label className="font-semibold text-gray-700">Salario</label>
          <input
            type="number"
            onChange={(e) => setSalary(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese el salario"
          />
        </div>

        {/* Periodicidad */}
        <div>
          <label className="font-semibold text-gray-700">Periodicidad</label>
          <select
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option>Seleccione una opción</option>
            <option value="1">Diario</option>
            <option value="30">Mensual</option>
            <option value="365">Anual</option>
          </select>
        </div>

        {/* Días adeudados */}
        <div>
          <label className="font-semibold text-gray-700">¿Cuántos días de la quincena/mes se adeudan?</label>
          <input
            type="number"
            onChange={(e) => setDebt(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese los días adeudados"
          />
        </div>

        {/* Resultados */}
        <div className="mt-4 p-3 bg-gray-100 text-gray-800 rounded-lg text-center font-semibold">
          Salario diario: <span className="text-blue-600">{dailyPay.toFixed(2)}</span>
        </div>
        <div className="mt-2 p-3 bg-gray-100 text-gray-800 rounded-lg text-center font-semibold">
          Importe de salario pendiente: <span className="text-red-600">{totalDebt.toFixed(2)}</span>
        </div>
      </div>
    )
    }