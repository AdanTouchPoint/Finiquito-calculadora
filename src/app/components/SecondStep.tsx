export default function SecondStep() {
return(
<div className="mb-6">
<h2 className="text-red-600 text-lg font-semibold mb-3">Razón de baja</h2>
<div className="grid grid-cols-1 md:grid-cols-1 ">
<label className="text-xs block text-gray-700 font-semibold">Motivo de la separación</label>
<select className="w-full border rounded-lg p-3 mt-1 text-gray-400 focus:ring-2 focus:ring-red-400 text-[#848484]">
  <option>Separación Voluntaria</option>
  <option>Término de contrato</option>
  <option>Otra que no es despido</option>
</select>
  </div>
</div>
)
}
