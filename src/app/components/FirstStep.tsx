"use client";
import React, { useEffect } from "react";
import { calcularAntiguedad } from "../lib/utilities";
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
export default function FirstStep({
  senority,
  setSenority,
  setWorkedDays,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: FirstStepProps) {
  // Obtener los valores de las fechas desde los inputs
  const changeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };
  const changeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };
  useEffect(() => {
    if (!startDate || !endDate) return;
    setSenority(calcularAntiguedad(startDate, endDate, 365.25));
    setWorkedDays(calcularAntiguedad(startDate, endDate, 1));
  }, [startDate, endDate, setSenority, setWorkedDays]);
  // Escuchar los cambios en los inputs de fecha para recalcular la antigüedad
  return (
    <div className="mb-6">
      <h2 className="text-red-600 text-lg font-bold">Fechas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-700 text-xs mb-2 font-semibold">
          Fecha de ingreso (DD-MM-AA)
          </label>
          <input
            onChange={changeStartDate}
            type="date"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-2">
          Fecha de baja (DD-MM-AA)
          </label>
          <input
            onChange={changeEndDate}
            type="date"
            className="w-full border border-gray-300 rounded-lg mt-1 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            required
          />
        </div>
      </div>
      <label className="block text-gray-700 font-semibold text-xs">
          Antigüedad
        </label>
        <input
        readOnly
        value={senority.toFixed(2) + " años"}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
        />
    </div>
  );
}
