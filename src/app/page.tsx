'use client'
import React, { useState } from 'react';
import FirstStep from "./components/FirstStep";
import FourthStep from "./components/FourthStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";
import FifthStep from "./components/FifthStep";
import SixStep from "./components/SixStep";
import SevenStep from "./components/SevenStep";

export default function Home() {
  const [senority, setSenority] = useState(0); 
      const [dailyPay,setDailyPay] = useState(0);
      const [salary,setSalary] = useState(0);
      const [debt,setDebt] = useState(0);
      const [totalDebt,setTotalDebt] = useState(0);
      const [period, setPeriod] = useState(0);
      const [workedDays, setWorkedDays] = useState(0);
      const [aguinaldo, setAguinaldo] = useState(0);
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [senorityBonus,setSenorityBonus] = useState(0)
      const [vacationsDaysDebt,setVacationsDaysDebt] = useState(0);
      const [vacationDebt, setVacationDebt] = useState(0);
      const [aguinaldoDays, setAguinaldoDays] = useState(0);
      const [vacationsPolitics, setVacationsPolitics] = useState(0);
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
    <FirstStep
    startDate={startDate}
    setStartDate={setStartDate}
    endDate={endDate}
    setEndDate={setEndDate}
    workedDays={workedDays}
    setWorkedDays={setWorkedDays} 
    senority={senority}
    setSenority={setSenority}  
    />
    <SecondStep/>
    <ThirdStep
    dailyPay={dailyPay}
    setDailyPay={setDailyPay}
    salary={salary}
    setSalary={setSalary}
    debt={debt}
    setDebt={setDebt}
    totalDebt={totalDebt}
    setTotalDebt={setTotalDebt}
    period={period}
    setPeriod={setPeriod}
    />
    <FourthStep
    aguinaldoDays={aguinaldoDays}
    setAguinaldoDays={setAguinaldoDays}
    startDate={startDate}
    setStartDate={setStartDate}
    endDate={endDate}
    setEndDate={setEndDate}
    aguinaldo={aguinaldo}
    setAguinaldo={setAguinaldo}
    dailyPay={dailyPay}
    senority={senority}
    setWorkedDays={setWorkedDays}
    workedDays={workedDays}
    />
    <FifthStep
    senority={senority}
    dailyPay={dailyPay}
    setVacationsDaysDebt={setVacationsDaysDebt}
    vacationDebt={vacationDebt}
    setVacationDebt={setVacationDebt}
    vacationsPolitics={vacationsPolitics}
    setVacationsPolitics={setVacationsPolitics}
    />
    <SixStep
    senority={senority}
    dailyPay={dailyPay}
    setSenorityBonus={setSenorityBonus}
    />
    <SevenStep
    dailySalary={dailyPay}
    senority={senority}
    aguinaldoDays={aguinaldoDays}
    debt={debt}
    vacationsDaysDebt={vacationsDaysDebt}
    vacationDebt={vacationDebt}
    setVacationDebt={setVacationDebt}
    totalDebt={totalDebt}
    aguinaldo={aguinaldo}
    vacationsPolitics={vacationsPolitics}
    senorityBonus={senorityBonus}
    />
    </div>
  );
}
