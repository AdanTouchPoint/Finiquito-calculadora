"use client";
import React, { useState, useEffect } from "react";
import { calcularProporcionAguinaldo } from "../lib/utilities";
interface FourthStepProps {
  aguinaldoDays: number;
  setAguinaldoDays: React.Dispatch<React.SetStateAction<number>>;
  workedDays: number;
  dailyPay: number;
  aguinaldo: number;
  setAguinaldo: React.Dispatch<React.SetStateAction<number>>;
}
export default function FourthStep({
  aguinaldoDays,
  setAguinaldoDays,
  workedDays,
  dailyPay,
  aguinaldo,
  setAguinaldo,
}: FourthStepProps) {
  const [disableInput, setDisableInput] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDisableInput(value);
    if (value === "ley") {
      setAguinaldoDays(15);
    }
  };
  useEffect(() => {
    return setAguinaldo(
      calcularProporcionAguinaldo(workedDays, aguinaldoDays, dailyPay)
    );
  }, [workedDays, aguinaldoDays, dailyPay, aguinaldo, setAguinaldo]);
  return (
    <div className="mb-6">
      <h2 className="text-red-600 text-lg font-semibold mb-3">Aguinaldo</h2>
      {/* Política de Aguinaldo */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <label className="font-semibold text-gray-700 mb-2 text-xs">
            Política de Aguinaldo
          </label>
          <select
            onChange={onChange}
            id="Politic"
            className=" w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"          >
            <option>Selecciona una opcion</option>
            <option value="ley">De Acuerdo a Ley</option>
            <option value="sup">Superior</option>
          </select>
        </div>
        <div hidden={disableInput !== "sup" ? true : false}>
          {/* Días de Aguinaldo */}
          <label  className="font-semibold text-gray-700 mb-2 text-xs">
            ¿Cuántos días de aguinaldo corresponden?
          </label>
          <input
            onChange={(e) => setAguinaldoDays(Number(e.target.value))}
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"            
            placeholder="Ingrese los días"
            defaultValue={15}
            min={15}
            disabled={disableInput !== "sup" ? true : false}
          />
        </div>
        <div hidden>
        {/* Días trabajados */}
        <label  className="font-semibold text-gray-700 mb-2 text-xs">
          Días trabajados para aguinaldo
        </label>
        <input
        readOnly
        value={workedDays + " días"}	
        className="w-full border border-gray-300 rounded-lg p-2 mb-4 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
        />
      </div>

      <div hidden>
        {/* Resultado */}
        <label  className="font-semibold text-gray-700 mb-2 text-xs">
          Proporción de aguinaldo
        </label>
        <input
        readOnly
        className="w-full border border-gray-300 rounded-lg p-2 mb-4 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
        value={aguinaldo > 0 ? aguinaldo.toFixed(2) : 0}
        />
      </div>
      </div>
    </div>
  );
}
