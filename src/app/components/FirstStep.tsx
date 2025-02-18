"use client"
import React, {  useEffect } from "react";
import  {calcularAntiguedad}  from "../lib/utilities";
interface FirstStepProps {
  senority: number;
  setSenority: React.Dispatch<React.SetStateAction<number>>;
  workedDays: number;
  setWorkedDays: React.Dispatch<React.SetStateAction<number>>;
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}
export default function FirstStep({ senority, setSenority,setWorkedDays,startDate,endDate,setStartDate,setEndDate }: FirstStepProps) {
  // Obtener los valores de las fechas desde los inputs
  const changeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };
  const changeEndDate = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setEndDate(event.target.value);
  }
  useEffect(() => {
    if(!startDate || !endDate) return
    setSenority(calcularAntiguedad(startDate, endDate,365.25))
    setWorkedDays(calcularAntiguedad(startDate, endDate, 1))   
  }, [startDate, endDate,setSenority,setWorkedDays]);
  // Escuchar los cambios en los inputs de fecha para recalcular la antigüedad
  return (
    <div >
      <label className="font-semibold text-gray-700 mb-2">Fecha de ingreso:</label>
      <input
        onChange={changeStartDate}
        type="date"
        className="border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
      <label className="font-semibold text-gray-700 mb-2">Fecha de baja:</label>
      <input
        onChange={changeEndDate}
        type="date"
        className="border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
      <div className="mt-4 p-3 bg-gray-100 text-gray-800 rounded-lg text-center font-semibold">
        Antigüedad: <span>{senority?.toFixed(2)} años</span>
      </div>
    </div>
  );
}
