export default function Table(){
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr className="text-xs">
                    <th className="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">Canal</th>
                    <th className="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">Tipo de orden</th>
                    <th className="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">Estatus</th>
                    <th className="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">Tiempo</th>
                    <th className="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">Método de pago</th>
                    <th className="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">Precio</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                <tr className="text-xs">
                    <td className="px-6 py-4 whitespace-nowrap">Pide Directo</td>
                    <td className="px-6 py-4 whitespace-nowrap">#D45 2JS</td>
                    <td className="px-6 py-4 whitespace-nowrap">Maximiliano López</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Para recoger</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">En preparación</td>
                    <td className="px-6 py-4 whitespace-nowrap">Hace 2 min</td>
                    <td className="px-6 py-4 whitespace-nowrap">Efectivo</td>
                    <td className="px-6 py-4 whitespace-nowrap">$249</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}