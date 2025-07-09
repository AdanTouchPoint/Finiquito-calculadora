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

    // Use a higher scale for better resolution, and allow for a slight delay
    // to ensure all content is rendered before capturing.
    const originalCanvas = await html2canvas(element, {
      scale: 3, // Increased scale for better quality
      useCORS: true,
      scrollY: -window.scrollY, // Correctly capture visible area
      windowWidth: element.scrollWidth,
      // You might want to consider a short delay here if dynamic content
      // loads after the initial render, e.g., onRendering: (canvas) => { /* some delay */ }
    });

    // Calculate padding dynamically based on content height or a fixed value
    // A fixed padding might still be needed for consistent bottom margin
    const paddingBottomPx = 50; // Reduced padding, adjust as needed
    const extendedCanvas = document.createElement("canvas");
    extendedCanvas.width = originalCanvas.width;
    extendedCanvas.height = originalCanvas.height + paddingBottomPx;

    const ctx = extendedCanvas.getContext("2d");
    if (ctx) { // Ensure context is not null
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, extendedCanvas.width, extendedCanvas.height);
      ctx.drawImage(originalCanvas, 0, 0);
    }

    const imgData = extendedCanvas.toDataURL("image/jpeg", 0.95); // Higher quality JPEG

    // Load the logo securely and efficiently
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
      console.error("Error loading logo:", logoError);
      // Optionally, proceed without the logo or use a placeholder
    }

    const pdf = new jsPDF("p", "mm", "a4", true);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const logoHeight = 20;
    const logoWidth = 30; // Assuming logoWidth is 30 based on your original code
    const topMargin = logoHeight + 10;
    const imgPadding = 10; // Padding for the image within the page

    // Calculate image dimensions to fit the page with padding, maintaining aspect ratio
    const imgAspectRatio = extendedCanvas.width / extendedCanvas.height;
    let imgWidth = pageWidth - 2 * imgPadding;
    let imgHeight = imgWidth / imgAspectRatio;

    // If the calculated height exceeds the usable page height, scale down
    const usablePageHeight = pageHeight - topMargin - imgPadding; // Account for top margin and bottom padding
    if (imgHeight > usablePageHeight) {
      imgHeight = usablePageHeight;
      imgWidth = imgHeight * imgAspectRatio;
    }

    const marginX = (pageWidth - imgWidth) / 2;
    const position = topMargin;

    // Add content to PDF, handling multiple pages
    const currentImgHeight = imgHeight;
    let pageAdded = false;

    // First page
    if (logoData && typeof logoData === "string") {
      pdf.addImage(logoData, "PNG", 10, 10, logoWidth, logoHeight);
    }
    pdf.addImage(imgData, "JPEG", marginX, position, imgWidth, currentImgHeight);

    // Remaining pages
    let heightLeft = imgHeight - (pageHeight - position);
    while (heightLeft > 0) {
      pdf.addPage();
      pageAdded = true; // Mark that a new page was added
      console.log(pageAdded)
      if (logoData && typeof logoData === "string") {
        pdf.addImage(logoData, "PNG", 10, 10, logoWidth, logoHeight);
      }
      const newPosition = topMargin - (imgHeight - heightLeft); // Adjust position for the new page
      pdf.addImage(imgData, "JPEG", marginX, newPosition, imgWidth, currentImgHeight);
      heightLeft -= (pageHeight - topMargin); // Reduce heightLeft by the usable page height
    }
    
    // Set a more descriptive filename
    pdf.save("detalle_finiquito.pdf");

  } catch (error) {
    console.error("Error generating PDF:", error);
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
