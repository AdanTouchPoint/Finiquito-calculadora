export default function SecondStep() {
return(
<div className="w-full flex flex-col gap-2">
  <label className="font-medium text-gray-700">Razón de baja</label>
  <label className="text-sm text-gray-500">Motivo de la separación</label>
  <select
    id="razon-baja"
    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
  >
    <option value="1">Separación voluntaria</option>
    <option value="2">Término de contrato</option>
    <option value="3">Otra que no es despido</option>
  </select>
</div>
)
}
