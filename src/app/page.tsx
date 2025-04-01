'use client'
import React, { useState } from 'react';
import FirstStep from "./components/FirstStep";
import FourthStep from "./components/FourthStep";
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
      const [pendientBonus, setPendientBonus] = useState(0);
      const [vacationsBonus, setVacationsBonus] = useState(0);
      const [supBonusSelect,setSupBonusSelect] = useState(0);
      const [bonusSelect,setBonusSelect] = useState('');
  return (
<div className="bg-[#F5F6F8]">
<div className="max-w-[1200px] mx-auto bg-[#F5F6F8]  p-8">
      <div className="max-w-[1200px] mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-8">
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
          aguinaldo={aguinaldo}
          setAguinaldo={setAguinaldo}
          dailyPay={dailyPay}
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
          pendientBonus={pendientBonus}
          setPendientBonus={setPendientBonus}
          vacationsBonus={vacationsBonus}
          setVacationsBonus={setVacationsBonus}
          supBonusSelect={supBonusSelect}
          setSupBonusSelect={setSupBonusSelect}
          bonusSelect={bonusSelect}
          setBonusSelect={setBonusSelect}
          />
          <SixStep
          senority={senority}
          dailyPay={dailyPay}
          setSenorityBonus={setSenorityBonus}
          />
      </div>
      <SevenStep
      dailyPay={dailyPay}
      senority={senority}
      aguinaldoDays={aguinaldoDays}
      debt={debt}
      vacationsDaysDebt={vacationsDaysDebt}
      vacationDebt={vacationDebt}
      totalDebt={totalDebt}
      aguinaldo={aguinaldo}
      vacationsPolitics={vacationsPolitics}
      senorityBonus={senorityBonus}
      pendientBonus={pendientBonus}
      vacationsBonus={vacationsBonus}
      supBonusSelect={supBonusSelect}
      bonusSelect={bonusSelect}
      />
    </div>
</div>
  );
}

