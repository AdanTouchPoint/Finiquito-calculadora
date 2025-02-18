
"use client"
import React, {useState, useEffect} from 'react';
import { calcularProporcionAguinaldo } from '../lib/utilities';
interface FourthStepProps {
    aguinaldoDays: number;
    setAguinaldoDays: React.Dispatch<React.SetStateAction<number>>;
    workedDays: number;
    dailyPay: number;
    aguinaldo: number;
    setAguinaldo: React.Dispatch<React.SetStateAction<number>>;
}
export default function FourthStep({ aguinaldoDays,setAguinaldoDays,workedDays,dailyPay, aguinaldo,setAguinaldo,}: FourthStepProps) {
   
    const [disableInput, setDisableInput] = useState('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setDisableInput(e.target.value)
        e.target.value === "ley" ? setAguinaldoDays(15 ) : setAguinaldoDays(15 )
        return
    }
    useEffect(() => {
        return setAguinaldo(calcularProporcionAguinaldo(workedDays, aguinaldoDays, dailyPay))
    }, [workedDays,aguinaldoDays,dailyPay])
    return(
        <div className="flex flex-col gap-4">
        {/* Política de Aguinaldo */}
        <div>
          <label className="font-semibold text-gray-700">Política de Aguinaldo</label>
          <select
            onChange={onChange}
            id="Politic"
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option>Selecciona una opcion</option>
            <option value="ley">De Acuerdo a Ley</option>
            <option value="sup">Superior</option>
          </select>
        </div>

        {/* Días de Aguinaldo */}
        <div>
          <label className="font-semibold text-gray-700">¿Cuántos días de aguinaldo corresponden?</label>
          <input
            onChange={(e) => setAguinaldoDays(Number(e.target.value))}
            type="number"
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese los días"
            defaultValue={15}
            min={15}
            disabled={ disableInput !== 'sup' ? true : false}
          />
        </div>

        {/* Días trabajados */}
        <div className="mt-4 p-3 bg-gray-100 text-gray-800 rounded-lg text-center font-semibold">
          Días trabajados para aguinaldo: <span className="text-blue-600">{workedDays} días</span>
        </div>

        {/* Resultado */}
        <div className="mt-2 p-3 bg-gray-100 text-gray-800 rounded-lg text-center font-semibold">
          Proporción de aguinaldo: <span className="text-green-600">{aguinaldo > 0 ? aguinaldo.toFixed(2) : 0} </span>
        </div>
      </div>
    )
    }