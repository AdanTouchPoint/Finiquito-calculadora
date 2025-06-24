
import React, { useEffect } from "react";
interface SixStepProps {
    senority: number;
    dailyPay: number;
    setSenorityBonus: React.Dispatch<React.SetStateAction<number>>;
    sdi: number;
}
export default function SixStep({senority, dailyPay,setSenorityBonus,sdi}: SixStepProps) {
    
    useEffect(() => {
        const receivesSeniorityBonus = (senority: number, sdi: number) => {
            if (senority > 15) {
                const minimumSalary = 278.80;
                const payload =  minimumSalary * 2
                const seniorityPayload = Number(senority.toFixed(2))
                const senorityData = seniorityPayload * 12
                console.log("Seniority Data: ", senorityData , seniorityPayload);
               return sdi > payload ? setSenorityBonus(payload *senorityData) : setSenorityBonus(sdi * senorityData);
            } else {
                return false;
            }
        };
        receivesSeniorityBonus(senority,sdi)
    }, [senority,dailyPay,setSenorityBonus,sdi]);
    return(
        <div >
            <h2 className="text-red-600 text-lg font-semibold mb-3">Prima de antigüedad</h2>
            <label className="font-semibold text-gray-700 mb-2 text-xs">
            ¿Debe recibir prima de antigüedad?
            </label>
            <input
            readOnly
            className="w-full border border-gray-300 rounded-lg p-3 mb-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[#848484]"
            value={senority > 15 ? "Sí" : "No"}
            />
      </div>
    )
}