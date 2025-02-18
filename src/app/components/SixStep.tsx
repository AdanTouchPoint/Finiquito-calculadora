
import React, { useEffect } from "react";
interface SixStepProps {
    senority: number;
    dailyPay: number;
    setSenorityBonus: React.Dispatch<React.SetStateAction<number>>;
}
export default function SixStep({senority, dailyPay,setSenorityBonus}: SixStepProps) {
    
    const receivesSeniorityBonus = (senority: number,dailyPay: number)=>{
        if(senority > 15){
            const minimumSalary = 248.93 * 2
            return dailyPay > minimumSalary ? setSenorityBonus(minimumSalary) : setSenorityBonus(dailyPay*12*senority)
        }
        else{
            return false;
        }
    }
    useEffect(() => {
        receivesSeniorityBonus(senority,dailyPay)
    }, [senority,dailyPay]);
    return(
        <div className="mt-4 p-3 bg-gray-100 text-gray-800 rounded-lg text-center font-semibold">
        ¿Debe recibir prima de antigüedad?
       <span className={`font-bold ${senority ? "text-green-600" : "text-red-600"}`}>
          {senority > 15 ? "Sí" : "No"}
        </span> 
      </div>
    )
}