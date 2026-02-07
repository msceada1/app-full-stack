const mockCars = [
    { id: 1, marca: "Toyota", modelo: "Corolla", precio: 25000, stock: 5, año: 2023 },
    { id: 2, marca: "Seat", modelo: "Ibiza", precio: 18000, stock: 3, año: 2022 },
    { id: 3, marca: "Renault", modelo: "Clio", precio: 15500, stock: 0, año: 2021 },
];

export default function Inventory() {
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Inventario de Vehículos</h2>
            <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Marca</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Modelo</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Precio</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {mockCars.map((coche) => (
                        <tr key={coche.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{coche.marca}</td>
                            <td className="px-6 py-4 text-gray-700">{coche.modelo}</td>
                            <td className="px-6 py-4 text-gray-700 font-semibold">{coche.precio}€</td>
                            <td className="px-6 py-4 text-gray-700">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${coche.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {coche.stock} u.
                                </span>
                            </td>
                            <td className="px-6 py-4 space-x-3">
                                <button className="text-blue-500 hover:text-blue-700 font-bold">✏️ Editar</button>
                                <button className="text-red-500 hover:text-red-700 font-bold">🗑️ Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}