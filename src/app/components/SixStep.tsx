
import React, { useEffect } from "react";
interface SixStepProps {
    senority: number;
    dailyPay: number;
    setSenorityBonus: React.Dispatch<React.SetStateAction<number>>;
}
export default function SixStep({senority, dailyPay,setSenorityBonus}: SixStepProps) {
    
    useEffect(() => {
        const receivesSeniorityBonus = (senority: number, dailyPay: number) => {
            if (senority > 15) {
                const minimumSalary = 248.93 * 2;
                return dailyPay > minimumSalary ? setSenorityBonus(minimumSalary) : setSenorityBonus(dailyPay * 12 * senority);
            } else {
                return false;
            }
        };
        receivesSeniorityBonus(senority,dailyPay)
    }, [senority,dailyPay,setSenorityBonus]);
    return(
        <div >
            <h2 className="text-red-600 text-lg font-semibold mb-3">Prima de antigüedad</h2>
            <label className="font-semibold text-gray-700 mb-2 text-xs">
            ¿Debe recibir prima de antigüedad?
            </label>
            <input
            readOnly
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            value={senority > 15 ? "Sí" : "No"}
            />
      </div>
    )
}