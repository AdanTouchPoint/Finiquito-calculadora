function sumarUnDia(fecha: Date) {
  // Crear una nueva instancia de la fecha para no modificar la original
  const nuevaFecha = new Date(fecha);

  // Sumar un día (24 horas en milisegundos)
  nuevaFecha.setDate(nuevaFecha.getDate() + 1);

  return nuevaFecha;
}
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

  // Sumar un día a cada fecha
  const startDateModificada = sumarUnDia(startDateObj);
  const endDateModificada = sumarUnDia(endDateObj);
  // Calcular la diferencia en milisegundos
  const diferenciaMilisegundos: number =
    endDateModificada.getTime() - startDateModificada.getTime();

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
export function years(senority: number) {
  if (senority < 1 || senority >= 2) return " años";
  return " año";
}

export function calcularProporcionAguinaldo(
  workedDays: number,
  aguinaldoDays: number,
  dailyPay: number
): number {
  return (workedDays / 365) * aguinaldoDays * dailyPay;
}

export function calcularProporcionVacaciones(seniority: number)  {
    if (seniority >= 1 && seniority < 2) return 12;
    if (seniority >= 2 && seniority < 3) return 14;
    if (seniority >= 3 && seniority < 4) return 16;
    if (seniority >= 4 && seniority < 5) return 18;
    if (seniority >= 5 && seniority < 6) return 20;
    if (seniority >= 6 && seniority < 11) return 22;
    if (seniority >= 12 && seniority < 17) return 24;
    if (seniority >= 17 && seniority < 22) return 26;
    if (seniority >= 22 && seniority <= 25) return 28;
    return 0;
}
