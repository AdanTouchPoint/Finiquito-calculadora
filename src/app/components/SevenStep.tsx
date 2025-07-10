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
  vacationDebt: number;
  vacationsDaysDebt: number;
  bonusSelect: string;
  supBonusSelect: number;
  proporcionVacationDays?: number;
  proporcionVacationBonusDays?: number;
  proporcionAguinaldoDays?: number;
  senorityProportion?: number;
  totalSalaryDebt?: number;
  salaryDebt?: number;
}
export default function SevenStep({
  vacationsBonus,
  senorityBonus,
  vacationsPolitics,
  aguinaldo,
  dailyPay,
  senority,
  aguinaldoDays,
  vacationDebt,
  vacationsDaysDebt,
  bonusSelect,
  supBonusSelect,
  proporcionVacationDays,
  proporcionVacationBonusDays,
  proporcionAguinaldoDays,
  senorityProportion,
  totalSalaryDebt,
  salaryDebt,
}: SevenStepProps) {
  const [bonusVacationSenority, setBonusVacationSenority] = useState(0);
  const [vacationsTotal, setVacationsTotal] = useState(0);
  const [vacationsBonusTotal, setVacationsBonusTotal] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
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
  }, [vacationsPolitics, vacationsDaysDebt, vacationDebt]);

  useEffect(() => {
    setVacationsBonusTotal(vacationsBonus);
  }, [vacationsBonus]);

  function reset() {
    window.scrollTo(0, 0);
    window.location.reload();
  }
  const calculateTotal = (
    aguinaldo: number,
    vacationsTotal: number,
    vacationsBonusTotal: number,
    senorityBonus: number
  ) => {
    return aguinaldo + vacationsTotal + vacationsBonusTotal + senorityBonus;
  };
const handleDownloadPDF = async () => {
  if (!contentRef.current) {
    console.error("Content reference not found for PDF generation.");
    return;
  }
  setIsGenerating(true);

  try {
    const element = contentRef.current;

    // Aumentamos la escala para una mejor resolución general.
    const originalCanvas = await html2canvas(element, {
      scale: 2, // Se puede ajustar a 4 si la calidad es crítica y el rendimiento lo permite.
      useCORS: true,
      scrollY: -window.scrollY,
      windowWidth: element.scrollWidth,
    });

    // Cargar el logo de forma segura
    let logoData: string | ArrayBuffer | null = null;
    try {
      const response = await fetch("/logosolu.png");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      logoData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (logoError) {
      console.error("Error al cargar el logo:", logoError);
      // Podemos decidir si el PDF se genera sin logo o si se detiene aquí.
    }

    const pdf = new jsPDF("p", "mm", "a4", true);
    const pageWidth = pdf.internal.pageSize.getWidth(); // Ancho de la página en mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // Alto de la página en mm
    const logoHeight = 20; // Altura del logo en mm
    const logoWidth = 50; // Ancho del logo en mm
    const topMargin = logoHeight + 10; // Margen superior para el logo y espacio
    const bottomMargin = 35; // Margen inferior
    const imgHorizontalPadding = 10; // Relleno horizontal para la imagen dentro de la página
    const usablePageHeight = pageHeight - topMargin - bottomMargin; // Altura utilizable para el contenido

    // Calcula la relación de aspecto del canvas original
    const canvasAspectRatio = originalCanvas.width / originalCanvas.height;

    // Determina el ancho de la imagen en el PDF para que ocupe el ancho de la página menos el padding
    const imgPdfWidth = pageWidth - 2 * imgHorizontalPadding;
    // Calcula la altura correspondiente en el PDF para mantener la relación de aspecto
    const imgPdfHeight = imgPdfWidth / canvasAspectRatio;
    console.log( imgPdfHeight);
    // Calcula cuántas "páginas" virtuales del canvas original necesitamos
    // para cubrir toda la altura del contenido capturado.
    const totalPagesNeeded = Math.ceil(originalCanvas.height / (originalCanvas.width / imgPdfWidth * usablePageHeight));

    for (let i = 0; i < totalPagesNeeded; i++) {
      if (i > 0) {
        pdf.addPage(); // Añade una nueva página si no es la primera
      }

      // Añadir logo a cada página
      if (typeof logoData === "string") {
        pdf.addImage(logoData, "PNG", 10, 10, logoWidth, logoHeight);
      }

      // Calcula la posición de recorte en el canvas original (en píxeles)
      // Multiplicamos por la relación de escala de la imagen en el PDF vs el canvas original
      const cropY = i * (originalCanvas.width / imgPdfWidth * usablePageHeight);

      // Crea un canvas temporal para la sección de la página actual
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = originalCanvas.width; // Mismo ancho que el original
      pageCanvas.height = Math.min(originalCanvas.height - cropY, (originalCanvas.width / imgPdfWidth) * usablePageHeight); // Altura de la sección actual

      const pageCtx = pageCanvas.getContext('2d');
      if (pageCtx) {
        // Dibuja la sección del canvas original en el canvas temporal
        // Los últimos 4 parámetros son el 'sx', 'sy', 'sWidth', 'sHeight' (origen en el canvas original)
        // y los primeros 4 son el 'dx', 'dy', 'dWidth', 'dHeight' (destino en el canvas temporal)
        pageCtx.drawImage(
          originalCanvas,
          0, cropY, // Punto de inicio del recorte en el original (x, y)
          originalCanvas.width, pageCanvas.height, // Dimensiones del recorte en el original (width, height)
          0, 0, // Punto de destino en el canvas temporal (x, y)
          pageCanvas.width, pageCanvas.height // Dimensiones en el canvas temporal (width, height)
        );
      }

      // Convertir el canvas de la página a una imagen y añadir al PDF
      const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
      pdf.addImage(pageImgData, "JPEG", imgHorizontalPadding, topMargin, imgPdfWidth, pageCanvas.height * (imgPdfWidth / pageCanvas.width));
    }

    // Set a more descriptive filename
    pdf.save("detalle_finiquito.pdf");

  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.");
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
          <div>
            {/* Desglose de pagos de finiquito */}
            <h2 className="text-black text-lg font-semibold mb-3">
              Prestaciones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center ">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
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
                    aguinaldo,
                    vacationsTotal,
                    vacationsBonusTotal,
                    senorityBonus
                  ).toLocaleString("en-US", {   
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }) || "0.00"}
                </div>
              </div>
              <div
                data-html2canvas-ignore
                className="mt-1 border-t border-gray-500 pt-4"
              ></div>
              {/* Desgloses adicionales */}
              <div className="space-y-2">
                <span className="font-bold text-gray-700 text-xs w-1/3">
                  Desglose de pagos de finiquito:
                </span>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700 text-xs w-1/2"></span>
                  <span className="text-gray-700 text-xs text-center w-1/6 font-bold">
                    Proporción de días trabajados
                  </span>
                  <span className="text-gray-700 text-xs w-1/6"></span>
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1 py-2">
                    <span className="w-1/2 font-medium text-left text-gray-700">
                      Sueldo:
                    </span>
                    <span className="w-1/7 text-left text-gray-700">
                      {salaryDebt?.toFixed(2)}
                    </span>
                    <span className="w-1/5 text-right text-black font-bold">
                      {totalSalaryDebt?.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }) || "0.00"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-1 py-2">
                    <span className="w-1/2 font-medium text-gray-700">
                      Aguinaldo:
                    </span>

                    <span className="w-1/7 text-right text-gray-700">
                      {proporcionAguinaldoDays?.toFixed(2)}
                    </span>

                    <span className="w-1/5 text-right text-black font-bold">
                      {aguinaldo?.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }) || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-1 py-2">
                    <span className="w-1/2 font-medium text-gray-700">
                      Vacaciones Pendientes:
                    </span>

                    <span className="w-1/7 text-right text-gray-700">
                      {vacationsDaysDebt.toFixed(2)}
                    </span>

                    <span className="w-1/5 text-right text-black font-bold">
                      {vacationDebt?.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }) || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-1 py-2">
                    <span className="w-1/2 font-medium text-gray-700">
                      Vacaciones Finiquito:
                    </span>

                    <span className="w-1/7 text-right text-gray-700">
                      {proporcionVacationDays?.toFixed(2)}
                    </span>

                    <span className="w-1/5 text-right text-black font-bold">
                      {vacationsPolitics?.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }) || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-1 py-2">
                    <span className="w-1/2 font-medium text-gray-700">
                      Prima vacacional:
                    </span>

                    <span className="w-1/7 text-right text-gray-700">
                      {proporcionVacationBonusDays?.toFixed(2)}
                    </span>

                    <span className="w-1/5 text-right text-black font-bold">
                      {vacationsBonus?.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }) || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-1 py-2">
                    <span className="w-1/2 font-medium text-gray-700">
                      Prima de antigüedad:
                    </span>

                    <span className="w-1/7 text-right text-gray-700">
                      {senorityProportion?.toFixed(2)}
                    </span>

                    <span className="w-1/5 text-right text-black font-bold">
                      {senorityBonus?.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }) || "0.00"}
                    </span>
                  </div>

                  <div className="flex justify-between items-left pt-2 border-t border-gray-300 mt-2">
                    <span className="font-bold text-gray-700 text-xs w-1/3">
                      TOTAL:
                    </span>
                    <span className="text-gray-700 text-xs text-center w-1/3"></span>
                    <div className="w-1/7">
                      <span className="text-black font-bold text-right w-1/3">
                        {(
                          (aguinaldo || 0) +
                          (vacationDebt || 0) +
                          (vacationsPolitics || 0) +
                          (vacationsBonus || 0) +
                          (senorityBonus || 0)
                        )?.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
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
                *Este cálculo es aproximado. Son sólo cálculos de las
                percepciones y no se incluyen el cálculo de impuestos (ISR,
                IMSS, SAR). Se recomienda consultar con un especialista para
                obtener información exacta.
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
      
    </div>
  );
}
