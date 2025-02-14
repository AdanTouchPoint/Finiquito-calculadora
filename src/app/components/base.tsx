<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculadora de Finiquito - Ley Federal del Trabajo</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: #f5f5f5;
      }

      .container {
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .input-group {
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }

      input,
      select {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .resultados {
        margin-top: 30px;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 5px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th,
      td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      th {
        background-color: #4caf50;
        color: white;
      }

      .total {
        font-weight: bold;
        color: #2c3e50;
        font-size: 1.2em;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Calculadora de Finiquito</h2>
      <!-- comienza paso 1 -->
      <div class="input-group">
        <label>Fecha de ingreso:</label>
        <input type="date" id="fecha-ingreso" required /><br /><br />

        <label>Fecha de baja:</label>
        <input type="date" id="fecha-baja" required /><br /><br />

        <label> Antigüedad: <span id="antiguedad"></span> </label>
        <!-- termina paso 1 -->

        <!-- comienza paso 2 -->
        <label>Razon de baja</label>
        <label>Motivo de la separación</label>
        <select id="razon-baja">
          <option value="1">Separación voluntaria</option>
          <option value="2">Término de contrato</option>
          <option value="3">otra que no es despido</option>
        </select>
        <!-- termina paso 2 -->

        <!-- comienza paso 3 -->
        <label>Salario</label>
        <label>Importe:</label>
        <input type="number" id="salario" value="0" />
        <label>Periodicidad:</label>
        <select id="periodicidad">
          <option value="1">Diario</option>
          <option value="30">Mensual</option>
          <option value="365">Anual</option>
        </select>
        <label>¿Cuántos días de la quincena/mes se adeudan?</label>
        <input type="number" id="dias-adeudo" value="0" />
        <label>Salario diario : variable aqui</label>
        <label>Importe de salario pendiente : variable aqui</label>
        <!-- termina paso 3 -->

        <!-- comienza paso 4 -->
        <label>Aguinaldo</label>
        <label>Política de aguinaldo</label>
        <select id="politica-aguinaldo">
          <option value="1">Acuerdo a la ley</option>
          <option value="2">Superior</option>
        </select>
        <label>¿Cuántos días de aguinaldo corresponden?</label>
        <input type="number" id="dias-aguinaldo" value="0" />
        <label>Días trabajados para aguinaldo<span>variabel here</span></label>
        <!-- termina paso 4 -->

        <!-- comienza paso 5 -->
        <label>Vacaciones y Prima vacacional</label>
        <label>Política de vacaciones</label>
        <select id="politica-vacaciones">
          <option value="1">Acuerdo a la ley</option>
          <option value="2">Superior</option>
        </select>
        <label>Política de prima vacacional</label>
        <select id="politica-prima-vacacional">
          <option value="1">Acuerdo a la ley</option>
          <option value="2">Superior</option>
        </select>
        <label
          >¿Cuál es el porcentaje de prima vacacional que corresponde?</label
        >
        <input type="number" id="porcentaje-prima-vacacional" value="0" />
        <label>¿Cómo se paga la prima vacacional?</label>
        <select id="pago-prima-vacacional">
          <option value="1">Por dias tomados de vacaciones</option>
          <option value="2">Al cumplimiento del aniversario</option>
        </select>
        <label
          >¿Cuántos días de vacaciones de años anteriores se te adeudan?</label
        >
        <input type="number" id="dias-vacaciones-adeudadas" value="0" />
        <label
          >¿Cuántos días de vacaciones de años anteriores se te adeudan?</label
        >
        <input type="number" id="dias-vacaciones-adeudadas" value="0" />
        <label>Vacaciones proporcionales <span>calculo aqui</span></label>
        <label>Vacaciones proporcionales <span>calculo aqui</span></label>
        <label>Vacaciones proporcionales <span>calculo aqui</span></label>
        <label>Vacaciones proporcionales <span>calculo aqui</span></label>
        <!-- termina paso 5 -->

        <!-- comienza paso 6 -->
        <label>Prima de antigüedad</label>
        <label
          >¿Deberá recibir prima de antigüedad? <span>calculo aqui</span></label
        >
        <button onclick="calcularFiniquito()">Calcular</button>
      </div>
      <!-- termina paso 6 -->

      <!-- comienza paso 7 -->
      <div class="resultados">
        <h3>Detalle de finiquito</h3>
        <h3>Prestaciones</h3>
        <table>
          <tr>
            <td>Sueldos pendientes</td>
            <td id="sueldos-pendientes">$0.00</td>
          </tr>
          <tr>
            <td>Aguinaldo proporcional</td>
            <td id="aguinaldo">$0.00</td>
          </tr>
          <tr>
            <td>Vacaciones pendientes</td>
            <td id="vacaciones">$0.00</td>
          </tr>
          <tr>
            <td>Prima vacacional</td>
            <td id="prima-vacacional">$0.00</td>
          </tr>
        </table>
        <h3>Pagos pendientes</h3>
        <table>
          <tr>
            <td>Sueldos pendientes</td>
            <td id="sueldos-pendientes">$0.00</td>
          </tr>
          <tr>
            <td>Aguinaldo proporcional</td>
            <td id="aguinaldo">$0.00</td>
          </tr>
          <tr>
            <td>Vacaciones pendientes</td>
            <td id="vacaciones">$0.00</td>
          </tr>
          <tr>
            <td>Prima vacacional</td>
            <td id="prima-vacacional">$0.00</td>
          </tr>
        </table>
        <h3>Desglose de pagos de finiquito</h3>
        <table>
          <tr>
            <td>Sueldos pendientes</td>
            <td id="sueldos-pendientes">$0.00</td>
          </tr>
          <tr>
            <td>Aguinaldo proporcional</td>
            <td id="aguinaldo">$0.00</td>
          </tr>
          <tr>
            <td>Vacaciones pendientes</td>
            <td id="vacaciones">$0.00</td>
          </tr>
          <tr>
            <td>Prima vacacional</td>
            <td id="prima-vacacional">$0.00</td>
          </tr>
          <tr class="total">
            <td>TOTAL FINIQUITO</td>
            <td id="total">$0.00</td>
          </tr>
        </table>
      </div>
      <!-- termina paso 7 -->
    </div>

    <script>
      function calcularAntiguedad() {
        // Obtener los valores de las fechas desde los inputs
        var fechaIngresoInput = document.getElementById("fecha-ingreso").value;
        var fechaBajaInput = document.getElementById("fecha-baja").value;

        // Verificar que ambas fechas estén seleccionadas
        if (!fechaIngresoInput || !fechaBajaInput) {
          document.getElementById("antiguedad").textContent =
            "Seleccione ambas fechas";
          return; // Salir de la función si falta alguna fecha
        }

        // Convertir las fechas de string a objetos Date
        var fechaIngreso = new Date(fechaIngresoInput);
        var fechaBaja = new Date(fechaBajaInput);

        // Calcular la diferencia en milisegundos
        var diferenciaMilisegundos = fechaBaja - fechaIngreso;

        // Convertir la diferencia de milisegundos a años (aproximado, considerando 365.25 días por año para incluir años bisiestos)
        var diferenciaAnios =
          diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25);

        // Mostrar la antigüedad en el label, redondeando a 2 decimales
        document.getElementById("antiguedad").textContent =
          diferenciaAnios.toFixed(2) + " años";
      }

      // Escuchar los cambios en los inputs de fecha para recalcular la antigüedad
      document
        .getElementById("fecha-ingreso")
        .addEventListener("change", calcularAntiguedad);
      document
        .getElementById("fecha-baja")
        .addEventListener("change", calcularAntiguedad);
      function calcularFiniquito() {
        // Obtener valores de entrada
        const fechaIngreso = new Date(
          document.getElementById("fecha-ingreso").value
        );
        const fechaBaja = new Date(document.getElementById("fecha-baja").value);
        const salarioMensual = parseFloat(
          document.getElementById("salario").value
        );
        const diasPendientes = parseInt(
          document.getElementById("dias-pendientes").value
        );
        const diasVacaciones = parseInt(
          document.getElementById("dias-vacaciones").value
        );

        // Cálculos básicos
        const diferenciaTiempo = fechaBaja - fechaIngreso;
        const diasTrabajados = Math.floor(
          diferenciaTiempo / (1000 * 60 * 60 * 24)
        );
        const salarioDiario = salarioMensual / 30;

        // 1. Sueldos pendientes
        const sueldosPendientes = diasPendientes * salarioDiario;

        // 2. Aguinaldo proporcional
        const aguinaldoProporcional =
          (diasTrabajados / 365) * 15 * salarioDiario;

        // 3. Vacaciones pendientes
        const vacacionesPendientes = diasVacaciones * salarioDiario;

        // 4. Prima vacacional (25% por ley)
        const primaVacacional = vacacionesPendientes * 0.25;

        // Total
        const total =
          sueldosPendientes +
          aguinaldoProporcional +
          vacacionesPendientes +
          primaVacacional;

        // Mostrar resultados
        document.getElementById(
          "sueldos-pendientes"
        ).textContent = `$${sueldosPendientes.toFixed(2)}`;
        document.getElementById(
          "aguinaldo"
        ).textContent = `$${aguinaldoProporcional.toFixed(2)}`;
        document.getElementById(
          "vacaciones"
        ).textContent = `$${vacacionesPendientes.toFixed(2)}`;
        document.getElementById(
          "prima-vacacional"
        ).textContent = `$${primaVacacional.toFixed(2)}`;
        document.getElementById("total").textContent = `$${total.toFixed(2)}`;
      }
    </script>
  </body>
</html>
