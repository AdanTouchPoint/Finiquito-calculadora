"use client"
import React, {useState,useEffect} from "react";
import {calcularProporcionVacaciones} from "../lib/utilities";

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
export default function FifthStep({bonusSelect,setBonusSelect,supBonusSelect,setSupBonusSelect,vacationsBonus,setVacationsBonus,vacationsPolitics,setVacationsPolitics,senority,dailyPay,setVacationsDaysDebt,setVacationDebt,vacationDebt,pendientBonus,setPendientBonus}: FifthStepProps) {

const [disable,setDisable] = useState(true);
const [disableBonus,setDisableBonus] = useState(true);



const [bonusVacation,setBonusVacation] = useState('');
const lawPolicy = (e, senority: number): void => {
    if (!senority || senority < 0) return; // Evita valores no válidos
    if(e.target.value === 'sup'){
        setDisable(false)
        return 
    }
    if (e.target.value === 'ley') {
        setDisable(true);
        
        const vacationProportion = calcularProporcionVacaciones(senority);
        const roundedSenority = (senority - Math.floor(senority)) * vacationProportion * dailyPay;

        console.log(roundedSenority);
        setVacationsPolitics(roundedSenority);
    }
};

const superiorPolicy = (e: React.ChangeEvent<HTMLInputElement>, senority: number) : void => {
    if (!senority || senority < 0) return; // Evita valores no válidos

    const policyValue = parseFloat(e.target.value); // Asegura que sea número
    if (policyValue > 0) {
        setDisable(false);

        const roundedSenority = (senority - Math.floor(senority)) * policyValue * dailyPay;

        console.log(roundedSenority);
        setVacationsPolitics(roundedSenority);
    }
};
const getLawVacationsBonus = (e: React.ChangeEvent<HTMLInputElement>,vacationsPolitics: number): void => {
    if( !vacationsPolitics || vacationsPolitics < 0) return;
    setBonusSelect(e.target.value);
    if(e.target.value === 'sup'){
        setDisableBonus(false)
        return 
    }
    if(e.target.value === 'ley' ) {
        setDisableBonus(true);
        setVacationsBonus(vacationsPolitics * 0.25);
    }
}
const getSupVacationsBonus = (e: React.ChangeEvent<HTMLInputElement>,vacationsPolitics: number): void => {
    if( !vacationsPolitics || vacationsPolitics < 0) return;
    const bonus = parseFloat(e.target.value);
    
    if(bonus > 0 ) {
        setSupBonusSelect(bonus)
        setDisableBonus(false);
        setVacationsBonus(vacationsPolitics * bonus / 100);
    }
}
const getVacationDebt = (e: React.ChangeEvent<HTMLInputElement>,dailyPay: number): void=> {
    const debt = parseFloat(e.target.value);
    if(debt > 0) {
        console.log(debt)
        setVacationsDaysDebt(debt);
        setVacationDebt(debt*dailyPay);
    }
}
useEffect(() => { 
if(bonusVacation === " ") {
return
}
if (bonusVacation !== 'days') {
    console.log(supBonusSelect, "aniv")
    return setPendientBonus(vacationDebt * 0)
}
if(bonusSelect === 'ley') {
    console.log(bonusVacation,vacationDebt)
    return setPendientBonus(vacationDebt * 0.25)}
    else {
        return setPendientBonus(vacationDebt * supBonusSelect / 100)
    }

}, [bonusVacation,vacationDebt,bonusSelect,supBonusSelect,setPendientBonus]);
    return(
<div className="flex flex-col gap-4">
        {/* Política de Vacaciones */}
        <div>
          <label className="font-semibold text-gray-700">Política de Vacaciones</label>
          <select
            onChange={(e) => lawPolicy(e, senority)}
            id="holidays"
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option>Selecciona una opción</option>
            <option value="ley">De Acuerdo a Ley</option>
            <option value="sup">Superior</option>
          </select>
        </div>

        {/* Días de Vacaciones */}
        <div>
          <label className="font-semibold text-gray-700">¿Cuántos días de vacaciones te corresponden?</label>
          <input
            type="number"
            onChange={(e) => superiorPolicy(e, senority)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese los días"
            disabled={disable}
          />
        </div>

        {/* Política de Prima Vacacional */}
        <div>
          <label className="font-semibold text-gray-700">Política de Prima Vacacional</label>
          <select
            onChange={(e) => getLawVacationsBonus(e,vacationsPolitics)}
            id="holidaysPay"
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option>Selecciones una opción</option>
            <option value="ley">De Acuerdo a Ley</option>
            <option value="sup">Superior</option>
          </select>
        </div>

        {/* Porcentaje de Prima Vacacional */}
        <div>
          <label className="font-semibold text-gray-700">¿Cuál es el porcentaje de prima vacacional?</label>
          <input
            type="number"
            onChange={(e) => getSupVacationsBonus(e,vacationsPolitics)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese el porcentaje"
            disabled={disableBonus}
            defaultValue={30}
          />
        </div>

        {/* Forma de Pago de Prima Vacacional */}
        <div>
          <label className="font-semibold text-gray-700">¿Cómo se paga la prima vacacional?</label>
          <select
            id="holidaysPayWay"
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            onChange={(e) => setBonusVacation(e.target.value)}
          >
            <option>Seleccione una opción</option>
            <option value="days">Por dias de vacaciones tomados</option>
            <option value="aniv">Al cuimplimiento del aniversario </option>
          </select>
        </div>
        {/* Vacaciones Adeudadas */}
        <div>
          <label className="font-semibold text-gray-700">¿Cuántos días de vacaciones de años anteriores se te adeudan?</label>
          <input
            type="number"
            onChange={(e) => getVacationDebt(e,dailyPay)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese los días"
          />
        </div>

        {/* Resultados */}
        <div className="mt-4 p-3 bg-gray-100 text-gray-800 rounded-lg text-center font-semibold">
          Vacaciones proporcionales: <span className="text-blue-600">{vacationsPolitics?.toFixed(2)}</span>
        </div>
        <div className="mt-2 p-3 bg-gray-100 text-gray-800 rounded-lg text-center font-semibold">
          Prima vacacional proporcional: <span className="text-green-600">{vacationsBonus?.toFixed(2)}</span>
        </div>
        <div className="mt-2 p-3 bg-gray-100 text-gray-800 rounded-lg text-center font-semibold">
          Vacaciones pendientes de disfrutar: <span className="text-red-600">{vacationDebt?.toFixed(2)}</span>
        </div>
        <div className="mt-2 p-3 bg-gray-100 text-gray-800 rounded-lg text-center font-semibold">
          Prima vacacional de vacaciones pendientes: <span className="text-purple-600">{pendientBonus?.toFixed(2)}</span>
        </div>
      </div>
    )
}