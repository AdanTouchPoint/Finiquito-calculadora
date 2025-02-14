"use client"
import React, { useState, useEffect } from "react";
import  {calcularAntiguedad}  from "../lib/utilities";
export default function FirstStep({ senority, setSenority,workedDays,setWorkedDays,startDate,endDate,setStartDate,setEndDate }) {
  // Obtener los valores de las fechas desde los inputs
 
  const changeStartDate = (event) => {
    setStartDate(event.target.value);
  };
  const changeEndDate = (event) => {
    setEndDate(event.target.value);
  }
  useEffect(() => {
    setSenority(calcularAntiguedad(startDate, endDate,365.25))
    setWorkedDays(calcularAntiguedad(startDate, endDate, 1)  )   
  }, [startDate, endDate]);

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
