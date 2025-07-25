"use client";
import React, { useState } from "react";
import FirstStep from "./components/FirstStep";
import FourthStep from "./components/FourthStep";
import ThirdStep from "./components/ThirdStep";
import FifthStep from "./components/FifthStep";
import SixStep from "./components/SixStep";
import SevenStep from "./components/SevenStep";

export default function Home() {
  const [diasTrabajadosVacaciones, setDiasTrabajadosVacaciones] = useState(0);
  const [senority, setSenority] = useState(0);
  const [dailyPay, setDailyPay] = useState(0);
  const [salary, setSalary] = useState(0);
  const [proporcionVacationDays, setProporcionVacationDays] = useState(0);
  const [proporcionVacationBonusDays, setProporcionVacationBonusDays] = useState(0);
  const [porporcionAguinaldoDays, setPorporcionAguinaldoDays] = useState(0);
  const [period, setPeriod] = useState(0);
  const [workedDays, setWorkedDays] = useState(0);
  const [aguinaldo, setAguinaldo] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [senorityBonus, setSenorityBonus] = useState(0);
  const [vacationsDaysDebt, setVacationsDaysDebt] = useState(0);
  const [vacationDebt, setVacationDebt] = useState(0);
  const [aguinaldoDays, setAguinaldoDays] = useState(0);
  const [vacationsPolitics, setVacationsPolitics] = useState(0);
  const [pendientBonus, setPendientBonus] = useState(0);
  const [vacationsBonus, setVacationsBonus] = useState(0);
  const [supBonusSelect, setSupBonusSelect] = useState(0);
  const [bonusSelect, setBonusSelect] = useState("");
  const [sdi,setSdi] = useState(0);
  const [senorityProportion,setSenorityProportion] = useState(0);
  const [totalSalaryDebt, setTotalSalaryDebt] = useState(0);
  const [salaryDebt, setSalaryDebt] = React.useState(0);
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
            diasTrabajadosVacaciones={diasTrabajadosVacaciones}
            setDiasTrabajadosVacaciones={setDiasTrabajadosVacaciones}
          />

          <ThirdStep
            dailyPay={dailyPay}
            setDailyPay={setDailyPay}
            salary={salary}
            setSalary={setSalary}
            period={period}
            setPeriod={setPeriod}
            setTotalSalaryDebt={setTotalSalaryDebt}
            salaryDebt={salaryDebt}
            setSalaryDebt={setSalaryDebt}
          />
          <FourthStep
            aguinaldoDays={aguinaldoDays}
            setAguinaldoDays={setAguinaldoDays}
            aguinaldo={aguinaldo}
            setAguinaldo={setAguinaldo}
            dailyPay={dailyPay}
            workedDays={workedDays}
            setPorporcionAguinaldoDays={setPorporcionAguinaldoDays}
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
            diasTrabajadosVacaciones={diasTrabajadosVacaciones}
            setSdi={setSdi}
            aguinaldoDays={aguinaldoDays}
            setProporcionVacationDays={setProporcionVacationDays}
            setProporcionVacationBonusDays={setProporcionVacationBonusDays}
          />
          <SixStep
            senority={senority}
            dailyPay={dailyPay}
            setSenorityBonus={setSenorityBonus}
            sdi={sdi}
            setSenorityProportion={setSenorityProportion}
          />
        </div>
        <SevenStep
          dailyPay={dailyPay}
          senority={senority}
          aguinaldoDays={aguinaldoDays}
          vacationsDaysDebt={vacationsDaysDebt}
          vacationDebt={vacationDebt}
          proporcionVacationDays={proporcionVacationDays}
          proporcionVacationBonusDays={proporcionVacationBonusDays}
          proporcionAguinaldoDays={porporcionAguinaldoDays}
          aguinaldo={aguinaldo}
          vacationsPolitics={vacationsPolitics}
          senorityBonus={senorityBonus}
          pendientBonus={pendientBonus}
          vacationsBonus={vacationsBonus}
          supBonusSelect={supBonusSelect}
          bonusSelect={bonusSelect}
          senorityProportion={senorityProportion}
          totalSalaryDebt={totalSalaryDebt}
          salaryDebt={salaryDebt}
        />
      </div>
    </div>
  );
}
