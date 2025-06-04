"use client";

import React, { useState, useRef, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { calcularProporcionVacaciones, years } from "../lib/utilities";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);
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

  function reset() {
    window.scrollTo(0, 0);
    window.location.reload();
  }
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
  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    if (!templateRef.current) return;
    setIsGenerating(true);
    try {
      const element = contentRef.current;
      const optimalScale = window.devicePixelRatio * 2; // Limitar escala máxima
      const canvas = await html2canvas(element, {
          logging: true,
          //scale: optimalScale,
      });
      const imgData = canvas.toDataURL("image/png");

      const screenshotImg = templateRef?.current.querySelector(
        "#screenshot-img"
      ) as HTMLImageElement;
      if (screenshotImg) {
        screenshotImg.src = imgData;
        // Espera a que la imagen cargue
        await new Promise((resolve) => {
          screenshotImg.onload = resolve;
        });
      }
      // 3. Captura la plantilla completa

      const templateCanvas = await html2canvas(templateRef.current, {
        useCORS: true, // Necesario para imágenes externas
        scale: optimalScale,
        logging: true,
      });
      const pdf = new jsPDF({
        orientation: element.offsetWidth > element.offsetHeight ? "l" : "p",
        unit: "px",
        format: [
          element.offsetWidth * optimalScale,
          element.offsetHeight * optimalScale,
        ],
        compress: true, // Activar compresión PDF
      });

      pdf.addImage(
        templateCanvas,
        "PNG",
        0,
        0,
        element.offsetWidth * optimalScale,
        element.offsetHeight * optimalScale,
        undefined,
        "FAST"
      );

      pdf.save("resultados.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <div ref={contentRef} className="max-w-[1200px] mx-auto p-6 mt-6">
        <h2 className="text-2xl font-semibold text-center text-black">
          Detalle de <span className="text-red-500 font-bold">Finiquito</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            {/* Desglose de pagos de finiquito */}
            <h2 className="text-black text-lg font-semibold mb-3">
              Prestaciones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
              <label className="font-medium text-gray-700 text-xs mb-2 text-justify">
                Salario diario:
              </label>
              <input
                readOnly
                className="bg-gray-100 text-right text-black font-semibold w-full border border-gray-300 rounded-lg p-2 mb-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={
                  dailyPay.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  }) || "0.00"
                }
              />
              <label className="font-medium text-gray-700 text-xs">
                Total de años trabajados:
              </label>
              <input
                readOnly
                className=" text-black font-semibold bg-gray-100 text-right border border-gray-300 rounded-lg p-2 mb-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={senority.toFixed(2) + years(senority)}
              />
              <label className="font-medium text-gray-700 text-xs">
                Política vacaciones por antigüedad:
              </label>
              <input
                readOnly
                className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={
                  calcularProporcionVacaciones(senority) > 0
                    ? calcularProporcionVacaciones(senority) + " días"
                    : 0 + " días"
                }
              />
              <label className="font-medium text-gray-700 text-xs">
                Política de prima vacacional por antigüedad:
              </label>
              <input
                readOnly
                className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={bonusSelect === "ley" ? "25%" : supBonusSelect + " %"}
              />
              <label className="font-medium text-gray-700 text-xs">
                Aguinaldo:
              </label>
              <input
                readOnly
                className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={aguinaldoDays.toFixed(0) + " días"}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Pagos pendientes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <label className="font-medium text-gray-700 text-xs">
                Días pendientes de pago:{" "}
              </label>
              <input
                readOnly
                className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={debt.toFixed(2) + " días"}
              />
              <label className="font-medium text-gray-700 text-xs">
                Días de vacaciones pendientes de pago:
              </label>
              <input
                readOnly
                className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={vacationsDaysDebt.toFixed(2) + " días"}
              />
              <label className="font-medium text-gray-700 text-xs ">
                Prima vacacional pendiente de pago:
              </label>
              <input
                readOnly
                className="bg-gray-100 text-black font-semibold text-right border border-gray-300 rounded-lg p-2 mb-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={bonusVacationSenority.toFixed(2) + " días"}
              />
            </div>
          </div>
          <div className="p-4 rounded-lg">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-center justify-between items-center">
                <h2 className="text-xs font-medium text-gray-500 mb-2">
                  Total de percepciones:
                </h2>
                <div className="text-red-500 font-bold text-3xl">
                  {calculateTotal(
                    totalDebt,
                    aguinaldo,
                    vacationsTotal,
                    vacationsBonusTotal,
                    senorityBonus
                  ).toLocaleString("en-US", { minimumFractionDigits: 2 }) ||
                    "0.00"}
                </div>
              </div>
              <div
                data-html2canvas-ignore
                className="mt-1 border-t border-gray-500 pt-4"
              ></div>
              {/* Desgloses adicionales */}
              <div className="space-y-2">
                <h3 className="font-bold text-black mb-4 text-xs">
                  Desglose de pagos de finiquito
                </h3>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 text-xs">
                    Sueldo:
                  </span>
                  <span className="text-black font-bold">
                    {totalDebt?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    }) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 text-xs">
                    Aguinaldo:
                  </span>
                  <span className="text-black font-bold">
                    {aguinaldo?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    }) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 text-xs">
                    Vacaciones:{" "}
                  </span>
                  <span className="text-black font-bold">
                    {vacationsTotal?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    }) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 text-xs">
                    Prima vacacional:{" "}
                  </span>
                  <span defaultValue={0} className="text-black font-bold">
                    {vacationsBonusTotal?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    }) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 text-xs">
                    Prima de antigüedad:
                  </span>
                  <span defaultValue={0} className="text-black font-bold">
                    {senorityBonus?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    }) || "0.00"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-700 text-xs mt-6 font-medium">
                Copyright © 1998 Solucionic México S.A. de C.V. Todos los
                derechos reservados sobre las marcas de Microsoft mostradas en
                este sitio son únicamente informativas y los derechos
                corresponden a dichas marcas. El resto de marcas registradas son
                propiedad de sus respectivos propietarios. Imágenes creadas por
                rawpixel.com / www.freepik.es
              </p>
              <p className="text-gray-700 text-xs mt-2 font-medium">
                *Este cálculo es aproximado. Son sólo cálculos de las percepciones y no se incluyen el cálculo de impuestos (ISR, IMSS, SAR). Se recomienda consultar con un especialista para obtener información exacta.
              </p>
            </div>
            <div data-html2canvas-ignore>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 mt-4"
                onClick={reset}
              >
                Empezar de nuevo
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 mt-4 ml-5"
              >
                {isGenerating ? "Generando PDF..." : "Descargar PDF"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={templateRef}
        style={{
          position: "absolute",
          left: "-9999px",
          width: "800px",
          height: "600px",
          background: "white",
        }}
      >
        <img
          id="screenshot-img"
          alt="Captura"
          style={{ padding: 20, width: "100%", height: "auto" }}
        />
        <img
          src="/logosolu.png" // Coloca tu logo en /public/logo.png
          alt="Logo"
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            width: 150,
          }}
        />
      </div>
    </div>
  );
}
