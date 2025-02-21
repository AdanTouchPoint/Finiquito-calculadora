"use client";
import React, { useState, useEffect } from "react";
import { calcularProporcionVacaciones } from "../lib/utilities";

interface FifthStepProps {
  bonusSelect: string;
  setBonusSelect: React.Dispatch<React.SetStateAction<string>>;
  supBonusSelect: number;
  setSupBonusSelect: React.Dispatch<React.SetStateAction<number>>;
  vacationsBonus: number;
  setVacationsBonus: React.Dispatch<React.SetStateAction<number>>;
  vacationsPolitics: number;
  setVacationsPolitics: React.Dispatch<React.SetStateAction<number>>;
  senority: number;
  dailyPay: number;
  setVacationsDaysDebt: React.Dispatch<React.SetStateAction<number>>;
  setVacationDebt: React.Dispatch<React.SetStateAction<number>>;
  vacationDebt: number;
  pendientBonus: number;
  setPendientBonus: React.Dispatch<React.SetStateAction<number>>;
}
export default function FifthStep({
  bonusSelect,
  setBonusSelect,
  supBonusSelect,
  setSupBonusSelect,
  vacationsBonus,
  setVacationsBonus,
  vacationsPolitics,
  setVacationsPolitics,
  senority,
  dailyPay,
  setVacationsDaysDebt,
  setVacationDebt,
  vacationDebt,
  pendientBonus,
  setPendientBonus,
}: FifthStepProps) {
  const [disable, setDisable] = useState(true);
  const [disableBonus, setDisableBonus] = useState(true);

  const [bonusVacation, setBonusVacation] = useState("");
  const lawPolicy = (
    e: React.ChangeEvent<HTMLSelectElement>,
    senority: number
  ): void => {
    if (!senority || senority < 0) return; // Evita valores no válidos
    if (e.target.value === "sup") {
      setDisable(false);
      return;
    }
    if (e.target.value === "ley") {
      setDisable(true);

      const vacationProportion = calcularProporcionVacaciones(senority);
      const roundedSenority =
        (senority - Math.floor(senority)) * vacationProportion * dailyPay;

      console.log(roundedSenority);
      setVacationsPolitics(roundedSenority);
    }
  };

  const superiorPolicy = (
    e: React.ChangeEvent<HTMLInputElement>,
    senority: number
  ): void => {
    if (!senority || senority < 0) return; // Evita valores no válidos

    const policyValue = parseFloat(e.target.value); // Asegura que sea número
    if (policyValue > 0) {
      setDisable(false);

      const roundedSenority =
        (senority - Math.floor(senority)) * policyValue * dailyPay;

      console.log(roundedSenority);
      setVacationsPolitics(roundedSenority);
    }
  };
  const getLawVacationsBonus = (
    e: React.ChangeEvent<HTMLSelectElement>,
    vacationsPolitics: number
  ): void => {
    if (!vacationsPolitics || vacationsPolitics < 0) return;
    setBonusSelect(e.target.value);
    if (e.target.value === "sup") {
      setDisableBonus(false);
      return;
    }
    if (e.target.value === "ley") {
      setDisableBonus(true);
      setVacationsBonus(vacationsPolitics * 0.25);
    }
  };
  const getSupVacationsBonus = (
    e: React.ChangeEvent<HTMLInputElement>,
    vacationsPolitics: number
  ): void => {
    if (!vacationsPolitics || vacationsPolitics < 0) return;
    const bonus = parseFloat(e.target.value);

    if (bonus > 0) {
      setSupBonusSelect(bonus);
      setDisableBonus(false);
      setVacationsBonus((vacationsPolitics * bonus) / 100);
    }
  };
  const getVacationDebt = (
    e: React.ChangeEvent<HTMLInputElement>,
    dailyPay: number
  ): void => {
    const debt = parseFloat(e.target.value);
    if (debt > 0) {
      console.log(debt);
      setVacationsDaysDebt(debt);
      setVacationDebt(debt * dailyPay);
    }
  };
  useEffect(() => {
    if (bonusVacation === " ") {
      return;
    }
    if (bonusVacation !== "days") {
      console.log(supBonusSelect, "aniv");
      return setPendientBonus(vacationDebt * 0);
    }
    if (bonusSelect === "ley") {
      console.log(bonusVacation, vacationDebt);
      return setPendientBonus(vacationDebt * 0.25);
    } else {
      return setPendientBonus((vacationDebt * supBonusSelect) / 100);
    }
  }, [
    bonusVacation,
    vacationDebt,
    bonusSelect,
    supBonusSelect,
    setPendientBonus,
  ]);
  return (
    <div className="mb-6">
            <h2 className="text-red-600 text-lg font-semibold mb-3">Vacaciones y Prima vacacional</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Política de Vacaciones */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            Política de Vacaciones
          </label>
          <select
            onChange={(e) => lawPolicy(e, senority)}
            id="holidays"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
          >
            <option>Selecciona una opción</option>
            <option value="ley">De Acuerdo a Ley</option>
            <option value="sup">Superior</option>
          </select>
        </div>

        {/* Política de Prima Vacacional */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            Política de Prima Vacacional
          </label>
          <select
            onChange={(e) => getLawVacationsBonus(e, vacationsPolitics)}
            id="holidaysPay"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
          >
            <option>Selecciones una opción</option>
            <option value="ley">De Acuerdo a Ley</option>
            <option value="sup">Superior</option>
          </select>
        </div>

        {/* Porcentaje de Prima Vacacional */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            ¿Cuál es el porcentaje de prima vacacional?
          </label>
          <input
            type="number"
            onChange={(e) => getSupVacationsBonus(e, vacationsPolitics)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese el porcentaje"
            disabled={disableBonus}
            defaultValue={30}
          />
        </div>

        {/* Forma de Pago de Prima Vacacional */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            ¿Cómo se paga la prima vacacional?
          </label>
          <select
            id="holidaysPayWay"
            className="border border-gray-300 rounded-lg p-3 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white mb-3 text-[#848484]"
            onChange={(e) => setBonusVacation(e.target.value)}
          >
            <option>Seleccione una opción</option>
            <option value="days">Por dias de vacaciones tomados</option>
            <option value="aniv">Al cuimplimiento del aniversario </option>
          </select>
        </div>
        </div>

        {/* Días de Vacaciones */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            ¿Cuántos días de vacaciones te corresponden?
          </label>
          <input
            type="number"
            onChange={(e) => superiorPolicy(e, senority)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese los días"
            disabled={disable}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
          <label className="font-semibold text-gray-700 mb-0 text-xs">
            ¿Cuántos días de vacaciones de años anteriores se te adeudan?
          </label>
          <input
            type="number"
            onChange={(e) => getVacationDebt(e, dailyPay)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese los días"
          />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs ">
            Vacaciones proporcionales:
          </label>
          <input
          className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
          disabled
          value={vacationsPolitics?.toFixed(2)}/>
          
        </div>
        {/* Resultados */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            Prima vacacional proporcional:{" "}
          </label>
          <input
          className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
          disabled
          value={vacationsBonus?.toFixed(2)}/>
        </div>
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            Vacaciones pendientes de disfrutar:{" "}
          </label>
          <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
          disabled
          value={vacationDebt?.toFixed(2)}/>
        </div>
        <div>
          {/* Vacaciones Adeudadas */}
      <label className="font-semibold text-gray-700 mb-2 text-xs">
        Prima vacacional de vacaciones pendientes:{" "}
      </label>
      <input
          className=" w-full border border-gray-300 rounded-lg p-2 mb-4 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
          disabled
          value={pendientBonus?.toFixed(2)}/>
        </div>
      </div>
      
    </div>
  );
}
