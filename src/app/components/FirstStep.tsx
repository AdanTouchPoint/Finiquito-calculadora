"use client";
import React, { useEffect, useState } from "react";
import {
  calcularAntiguedad,
  checkValidDate,
  diasTrabajadosVacaciones,
  years,
} from "../lib/utilities";
import WarningModal from "./WarningModal";

interface FirstStepProps {
  senority: number;
  setSenority: React.Dispatch<React.SetStateAction<number>>;
  workedDays: number;
  setWorkedDays: React.Dispatch<React.SetStateAction<number>>;
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  diasTrabajadosVacaciones: number;
  setDiasTrabajadosVacaciones: React.Dispatch<React.SetStateAction<number>>;
}
export default function FirstStep({
  senority,
  setSenority,
  setWorkedDays,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setDiasTrabajadosVacaciones,
}: FirstStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  // Obtener los valores de las fechas desde los inputs
  const changeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };
  const changeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value[0] === "0") {
      return
    }
    setEndDate(event.target.value);
  };
  useEffect(() => {
    if (!startDate || !endDate) return;
    if (checkValidDate(startDate, endDate) === false) {
        setIsModalOpen(true);
      return;
    }
    setSenority(calcularAntiguedad(startDate, endDate, 365));
    setWorkedDays(calcularAntiguedad(startDate, endDate, 1));
    setDiasTrabajadosVacaciones(
      diasTrabajadosVacaciones(startDate, endDate) > 1
        ? diasTrabajadosVacaciones(startDate, endDate)
        : 0
    );
  }, [startDate, endDate]);
  return (
    <div className="mb-6">
      <WarningModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message=" La fecha de baja debe ser posterior a la fecha de ingreso. Selecciónala en el calendario."
      />
      <h2 className="text-red-600 text-lg font-bold">Fechas</h2>
      <p className="text-xs text-gray-400 mb-2 mt-2">Haz clic en el icono para desplegar el calendario y elegir fechas de ingreso y de baja.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-700 text-xs mb-2 font-semibold">
            Fecha de ingreso (DD-MM-AA)
          </label>
          <input

            onChange={changeStartDate}
            type="date"
            className="w-full border border-gray-300 rounded-lg p-2 mb-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
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
        value={senority.toFixed(2) + years(senority)}
        className="w-full border border-gray-300 rounded-lg p-2 mb-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
      />
    </div>
  );
}
