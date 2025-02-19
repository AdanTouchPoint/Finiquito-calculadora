import React, { useEffect, useState } from "react";
import { calcularProporcionVacaciones } from "../lib/utilities";
interface SevenStepProps {
  vacationsBonus: number;
  pendientBonus: number;
  senorityBonus: number;
  vacationsPolitics: number;
  aguinaldo: number;
  dailyPay: number;
  senority: number;
  aguinaldoDays: number;
  debt: number;
  vacationDebt: number;
  vacationsDaysDebt: number;
  bonusSelect: string;
  supBonusSelect: number;
  totalDebt: number;
}
export default function SevenStep({
  vacationsBonus,
  pendientBonus,
  senorityBonus,
  vacationsPolitics,
  aguinaldo,
  dailyPay,
  senority,
  aguinaldoDays,
  debt,
  vacationDebt,
  vacationsDaysDebt,
  bonusSelect,
  supBonusSelect,
  totalDebt,
}: SevenStepProps) {
  const [bonusVacationSenority, setBonusVacationSenority] = useState(0);
  const [vacationsTotal, setVacationsTotal] = useState(0);
  const [vacationsBonusTotal, setVacationsBonusTotal] = useState(0);
  useEffect(() => {
    if (bonusSelect === "") return;
    if (bonusSelect === "ley")
      return setBonusVacationSenority(vacationsDaysDebt * 0.25);
    if (bonusSelect === "sup")
      return setBonusVacationSenority(
        (vacationsDaysDebt * supBonusSelect) / 100
      );
  }, [vacationsDaysDebt, bonusSelect, supBonusSelect]);

  useEffect(() => {
    setVacationsTotal(vacationsPolitics + vacationDebt);
    setVacationsBonusTotal(vacationsBonus + pendientBonus);
  }, [
    ,
    vacationsPolitics,
    vacationsBonus,
    pendientBonus,
    vacationsDaysDebt,
    vacationDebt,
  ]);

  const calculateTotal = (
    totalDebt: number,
    aguinaldo: number,
    vacationsTotal: number,
    vacationsBonusTotal: number,
    senorityBonus: number
  ) => {
    return (
      totalDebt +
      aguinaldo +
      vacationsTotal +
      vacationsBonusTotal +
      senorityBonus
    );
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-black">
        Detalle de <span className="text-red-500 font-bold">Finiquito</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          {/* Desglose de pagos de finiquito */}
          <h2 className="text-black text-lg font-semibold mb-3">Prestaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
            <label className="font-medium text-gray-700 text-xs mb-2 text-xs text-justify">
              Salario diario:
            </label>
            <input
              readOnly
              className="bg-gray-100 text-right text-black font-semibold w-full border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={dailyPay.toFixed(2)}
            />
            <label className="font-medium text-gray-700 text-xs">
              Total de años trabajados:
            </label>
            <input
              readOnly
              className=" text-black font-semibold bg-gray-100 text-right border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={senority.toFixed(2)}
            />
            <label className="font-medium text-gray-700 text-xs">
              Política vacaciones por antigüedad:
            </label>
            <input
              readOnly
              className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={
                calcularProporcionVacaciones(senority) > 0
                  ? calcularProporcionVacaciones(senority)
                  : 0
              }
            />
            <label className="font-medium text-gray-700 text-xs">
              Política de prima vacacional por antigüedad:
            </label>
            <input
              readOnly
              className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={bonusSelect === "ley" ? "25%" : supBonusSelect + " %"}
            />
            <label className="font-medium text-gray-700 text-xs">Aguinaldo:</label>
            <input
              readOnly
              className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={aguinaldoDays.toFixed(2)}
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Pagos pendientes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="font-medium text-gray-700 text-xs">
              Días pendientes de pago:{" "}
            </label>
            <input
              readOnly
              className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={debt.toFixed(2)}
            />
            <label className="font-medium text-gray-700 text-xs">
              Días de vacaciones pendientes de pago:
            </label>
            <input
              readOnly
              className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={vacationsDaysDebt.toFixed(2)}
            />
            <label className="font-medium text-gray-700 text-xs ">
              Prima vacacional pendiente de pago:
            </label>
            <input
              readOnly
              className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={bonusVacationSenority.toFixed(2)}
            />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
        <div className="text-center justify-between items-center">
              <h2 className="text-xs font-medium text-gray-500 mb-2">
                Total de percepciones:
              </h2>
              <div className="text-red-500 font-bold text-3xl">
                {"$" + calculateTotal(
                  totalDebt,
                  aguinaldo,
                  vacationsTotal,
                  vacationsBonusTotal,
                  senorityBonus
                ).toFixed(2)}
              </div>
            </div>
        <div className="mt-1 border-t border-gray-500 pt-4">

          </div>
          {/* Desgloses adicionales */}
          <div className="space-y-2">
            <h3 className="font-bold text-black mb-4 text-xs">
              Desglose de pagos de finiquito
            </h3>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700 text-xs">Sueldo:</span>
              <span className="text-black font-bold">{totalDebt?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700 text-xs">Aguinaldo:</span>
              <span className="text-black font-bold">{aguinaldo?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700 text-xs">Vacaciones: </span>
              <span className="text-black font-bold">
                {vacationsTotal?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700 text-xs">
                Prima vacacional:{" "}
              </span>
              <span defaultValue={0} className="text-black font-bold">
                {vacationsBonusTotal?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700 text-xs">
                Prima de antigüedad:
              </span>
              <span defaultValue={0} className="text-black font-bold">
                {senorityBonus.toFixed(2)}
              </span>
            </div>
          </div>
          {/* Total de finiquito */}
        </div>
      </div>
    </div>
  );
}
