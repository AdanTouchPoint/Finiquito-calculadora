"use client";
import React, { useState, useEffect } from "react";
import {calcularDiasProporcionales, calcularProporcionVacaciones,calcularProporcionPrimaVacacional, calcularVacacionesfiniquito, calcularSDI } from "../lib/utilities";

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
  diasTrabajadosVacaciones?: number;
  setSdi: React.Dispatch<React.SetStateAction<number>>;
  aguinaldoDays?: number;
  setProporcionVacationDays: React.Dispatch<React.SetStateAction<number>>;
  setProporcionVacationBonusDays: React.Dispatch<React.SetStateAction<number>>;
}
export default function FifthStep({
  bonusSelect,
  setBonusSelect,
  supBonusSelect,
  setSupBonusSelect,
  setVacationsBonus,
  setVacationsPolitics,
  senority,
  dailyPay,
  setVacationsDaysDebt,
  setVacationDebt,
  vacationDebt,
  setPendientBonus,
  diasTrabajadosVacaciones,
  setSdi,
  aguinaldoDays,
  setProporcionVacationDays,
  setProporcionVacationBonusDays
}: FifthStepProps) {
  const [disable, setDisable] = useState("ley");
  const [disableBonus, setDisableBonus] = useState(true);
  const [policyValue, setPolicyValue] = useState(0);
  
  const lawPolicy = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    if (e.target.value === "sup") {
      setDisable(e.target.value);
    }
    if (e.target.value === "ley") {
      setDisable(e.target.value);
    }
  };

  useEffect(() => {
    let newVacationsPolitics = 0;
    if (disable === "ley") {
      const vacationProportion = calcularProporcionVacaciones(senority);
      setProporcionVacationDays(calcularDiasProporcionales(vacationProportion, diasTrabajadosVacaciones ?? 0))
      setPolicyValue(vacationProportion)
      setSdi(calcularSDI(dailyPay, 15, 25, vacationProportion));
      newVacationsPolitics = calcularVacacionesfiniquito(vacationProportion, diasTrabajadosVacaciones ?? 0, dailyPay);
    } 
    if(disable === "sup") {
      setProporcionVacationDays(calcularDiasProporcionales(policyValue, diasTrabajadosVacaciones ?? 0))
      newVacationsPolitics = calcularVacacionesfiniquito(policyValue, diasTrabajadosVacaciones ?? 0, dailyPay);
      setSdi(calcularSDI(dailyPay, aguinaldoDays ?? 0, supBonusSelect ?? 0, policyValue ?? 0));
    }
    setVacationsPolitics(newVacationsPolitics);
  }, [disable, senority, dailyPay, policyValue, diasTrabajadosVacaciones]); 



  const getLawVacationsBonus = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setBonusSelect(e.target.value);
    if (e.target.value === "sup") {
      setDisableBonus(false);
    }
    if (e.target.value === "ley") {
      setDisableBonus(true);
    }
  };
  const getSupVacationsBonus = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
 setSupBonusSelect(parseFloat(e.target.value));
  };
  const getVacationDebt = (
    e: React.ChangeEvent<HTMLInputElement>,
    dailyPay: number
  ): void => {
    const debt = parseFloat(e.target.value);
      setVacationsDaysDebt(debt);
      setVacationDebt(debt * dailyPay);
    
  };
  useEffect(() => {
    if (bonusSelect === "ley") {
      const vacationProportion = calcularProporcionVacaciones(senority);
      setSdi(calcularSDI(dailyPay, 15, 25, vacationProportion));
      setProporcionVacationBonusDays(calcularDiasProporcionales(vacationProportion, diasTrabajadosVacaciones ?? 0));
      setVacationsBonus(calcularProporcionPrimaVacacional(vacationProportion, diasTrabajadosVacaciones ?? 0, dailyPay, 25));
      setPendientBonus(vacationDebt * 0.25);
      return 
    } 
   if (bonusSelect === "sup") {
      setSdi(calcularSDI(dailyPay, aguinaldoDays ?? 0, supBonusSelect ?? 0, policyValue ?? 0));
      setProporcionVacationBonusDays(calcularDiasProporcionales(policyValue, diasTrabajadosVacaciones ?? 0));
      setVacationsBonus(calcularProporcionPrimaVacacional(policyValue, diasTrabajadosVacaciones ?? 0, dailyPay, supBonusSelect));
      setPendientBonus((vacationDebt * supBonusSelect) / 100);
      return  
    }
  }, [
    vacationDebt,
    bonusSelect,
    supBonusSelect,
    policyValue,
    dailyPay
  ]);
  return (
    <div className="mb-6">
            <h2 className="text-red-600 text-lg font-semibold mb-3">Vacaciones y Prima vacacional</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
        {/* Política de Vacaciones */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            Política de Vacaciones
          </label>
          <select
            onChange={(e) => lawPolicy(e)}
            id="holidays"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
          >
            <option>Selecciona una opción</option>
            <option value="ley">De Acuerdo a Ley</option>
            <option value="sup">Superior</option>
          </select>
        </div>
        {/* Días de Vacaciones */}
        <div hidden={disable === "ley" ? true : false}>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            ¿Cuántos días de vacaciones te corresponden?
          </label>
          <input
            type="number"
            onChange={(e) => setPolicyValue(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 mb-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese los días"
            min={0}
          />
        </div>
        {/* Política de Prima Vacacional */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            Política de Prima Vacacional
          </label>
          <select
            onChange={(e) => getLawVacationsBonus(e)}
            id="holidaysPay"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
          >
            <option>Selecciona una opción</option>
            <option value="ley">De Acuerdo a Ley</option>
            <option value="sup">Superior</option>
          </select>
        </div>
        <div hidden={disableBonus}>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            ¿Cuál es el porcentaje de prima vacacional?
          </label>
          <input
            type="number"
            onChange={(e) => getSupVacationsBonus(e)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese el porcentaje"
            disabled={disableBonus}
            defaultValue={0}
            min={0}
          />
        </div>
        {/* Forma de Pago de Prima Vacacional */}
        <div hidden>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            ¿Cómo se paga la prima vacacional?
          </label>
          <select
            id="holidaysPayWay"
            className="border border-gray-300 rounded-lg p-3 mt-1 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white mb-3 text-[#848484]"
            //onChange={(e) => setBonusVacation(e.target.value)}
          >
            <option>Seleccione una opción</option>
            <option value="days">Por dias de vacaciones tomados</option>
            <option value="aniv">Al cumplimiento del aniversario </option>
          </select>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <label className="font-semibold text-gray-700 mb-0 text-xs">
            ¿Cuántos días de vacaciones de años anteriores se te adeudan?
          </label>
          <input
            type="number"
            onChange={(e) => getVacationDebt(e, dailyPay)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            placeholder="Ingrese los días"
            min={0}
          />
        </div>

      
    </div>
  );
}
