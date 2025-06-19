
export function calcularAntiguedad(
  startDate: string,
  endDate: string,
  lapse: number
): number {
  // Verificar que ambas fechas estén seleccionadas
  if (!startDate || !endDate) {
    return 0; // Salir de la función si falta alguna fecha
  }

  // Convertir las fechas de string a objetos Date
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Validar que las fechas sean válidas
  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    return 0;
  }

  // Calcular la diferencia en milisegundos
  const diferenciaMilisegundos: number =
    endDateObj.getTime() - startDateObj.getTime();

  // Convertir la diferencia de milisegundos a años (aproximado, considerando 365.25 días por año para incluir años bisiestos)
  const days = diferenciaMilisegundos / (1000 * 60 * 60 * 24 * lapse);

  if (days > 365) {
    const lastFour = endDate.slice(0, 4);
    const date = `${lastFour}-01-01`;
    const propocionalDays = calcularAntiguedad(date, endDate, 1);
    return propocionalDays;
  }
  return days;
}
export function diasTrabajadosVacaciones(startDate: string, endDate: string) {
  // Verificar que ambas fechas estén seleccionadas
  if (!startDate || !endDate) {
    return 0; // Salir de la función si falta alguna fecha
  }

  // Convertir las fechas de string a objetos Date
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Validar que las fechas sean válidas
  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    return 0;
  }
// Función segura para creación de fechas
function crearAniversario(año: number, mes: number, dia: number) : Date {
  return new Date(Date.UTC(año, mes, dia));
}

// Tus fechas
const currentAniversary = crearAniversario(
  endDateObj.getUTCFullYear(),
  startDateObj.getUTCMonth(),
  startDateObj.getUTCDate() + 1
);

const lastAniversary = crearAniversario(
  endDateObj.getUTCFullYear() - 1,
  startDateObj.getUTCMonth(),
  startDateObj.getUTCDate()+ 1
);
const finishDate = crearAniversario(
  endDateObj.getUTCFullYear(), 
  endDateObj.getUTCMonth(),
  endDateObj.getUTCDate() + 1
);
console.log("Current Aniversary:", currentAniversary);
  console.log("Last Aniversary:", lastAniversary);
// Función para normalizar fechas a UTC (día completo sin horas)
function normalizeToUTCDate(date: Date): Date {
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ));
}

// Crear fechas normalizadas
const normalizedCurrentAniversary = normalizeToUTCDate(currentAniversary);
const normalizedEndDate = normalizeToUTCDate(finishDate);
const normalizedLastAniversary = normalizeToUTCDate(lastAniversary);
const useAniversaryDate = normalizedEndDate > normalizedCurrentAniversary ? normalizedCurrentAniversary : normalizedLastAniversary;
  // Calcular la diferencia en milisegundos
  const diferenciaMilisegundos: number =
    normalizedEndDate.getTime() - useAniversaryDate.getTime();

  // Convertir la diferencia de milisegundos a días
  const days = diferenciaMilisegundos / (1000 * 60 * 60 * 24) ;
  console.log("Días trabajados:", days);
  return days + 1;

}
export function years(senority: number) {
  if (senority < 1 || senority >= 2) return " años";
  return " año";
}

export function calcularProporcionAguinaldo(
  workedDays: number,
  aguinaldoDays: number,
  dailyPay: number
): number {
  return (aguinaldoDays / 365) * workedDays * dailyPay;
}

export function calcularProporcionVacaciones(seniority: number) {
  if (seniority >= 0 && seniority <= 1) return 12;
  if (seniority > 1 && seniority <= 2) return 14;
  if (seniority > 2 && seniority <= 3) return 16;
  if (seniority > 3 && seniority <= 4) return 18;
  if (seniority > 4 && seniority <= 5) return 20;
  if (seniority > 5 && seniority <= 6) return 22;
  if (seniority > 6 && seniority <= 11) return 24;
  if (seniority > 11 && seniority <= 16) return 26;
  if (seniority > 16 && seniority <= 20) return 28;
  if (seniority > 20 && seniority <= 25) return 30;
  if (seniority > 25 && seniority <= 30) return 32;
  if (seniority > 30 && seniority <= 35) return 34;
  if (seniority > 35 && seniority <= 40) return 36;
  if (seniority > 40 && seniority <= 45) return 38;
  if (seniority > 45 && seniority <= 50) return 40;
  return 0;
}
export function calcularProporcionPrimaVacacional(vacaciones: number,diasTrabajadosVacaciones: number,dailyPay: number,primaVacacional: number ): number {
  //primero divides dias de vacaciones / 365 x prima vacacional (dias laborados)
  //despues el resultado lo multiplicas por el salario diario que multiplica a la division de prima vacacional entre 100 
  const data = (vacaciones/365) * diasTrabajadosVacaciones;
  const payload = data * dailyPay * (primaVacacional / 100);
  return payload;
}
export function calcularVacacionesfiniquito(vacaciones: number, diasTrabajadosVacaciones: number,dailyPay: number ): number {
  //primero divides dias de vacaciones / 365 x prima vacacional (dias laborados)
  //despues el resultado lo multiplicas por el salario diario
  const data = (vacaciones / 365) * diasTrabajadosVacaciones;
  const payload = data * dailyPay;
  return payload
}

export function calcularSDI(dailyPay: number, aguinaldoDays: number, supBonusSelect: number, vacationDays: number): number {
  //salario diario + ( salario dario  * (dias de aguinaldo / 365)+ ( salario dario  * (dias de vacacion / 365) + ( salario dario  * (prima vacacional / 365))
  //disable,policyValue
  //bopnusSelect, 
  console.log(vacationDays)
  const aguinaldoData =  dailyPay * ( aguinaldoDays / 365)
  const vacationData = dailyPay * (vacationDays / 365) * (supBonusSelect / 100)
  const sdi = dailyPay + aguinaldoData + vacationData ;
  console.log("aguinaldoData:", aguinaldoData);
  console.log("vacationData:", vacationData);
  console.log("datasdi:", sdi);
  return sdi ? sdi : 0;
}
