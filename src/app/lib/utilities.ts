export function calcularAntiguedad(startDate:string, endDate: string, lapse: number): number {
    // Verificar que ambas fechas estén seleccionadas
    if (!startDate || !endDate) {
      return 0 ; // Salir de la función si falta alguna fecha
    }

    // Convertir las fechas de string a objetos Date
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    // Validar que las fechas sean válidas
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return 0;
    }
    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos: number = endDateObj.getTime() - startDateObj.getTime();
  
    // Convertir la diferencia de milisegundos a años (aproximado, considerando 365.25 días por año para incluir años bisiestos)
   const days = diferenciaMilisegundos / (1000 * 60 * 60 * 24 * lapse);
   
   if (days > 365) {
    const lastFour = endDate.slice(0,4);
    const date = `${lastFour}-01-01`
    const propocionalDays = calcularAntiguedad(date, endDate,1)
    return propocionalDays
   }
  return days
  }

  export function calcularProporcionAguinaldo(workedDays :  number, aguinaldoDays: number, dailyPay: number): number {

   return (workedDays / 365) * aguinaldoDays * dailyPay;
  }


  export function calcularProporcionVacaciones(senority: number) {
    //redondear hacia arriba senority
    const roundedSenority = Math.ceil(senority);
    console.log(roundedSenority)
    switch (roundedSenority) {
      case 1: return 12;
      case 2: return 14;
      case 3: return 16;
      case 4: return 18;
      case 5: return 20;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10: return 22;
      case 12:
      case 13:
      case 14:
      case 15:
      case 16: return 24;
      case 17:
      case 18:
      case 19:
      case 20:
      case 21: return 26;
      case 22:
      case 23:
      case 24:
      case 25: return 28;
      default: return 0
  }
  }