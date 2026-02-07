import { useState, useEffect } from 'react';

export default function Inventory() {
    const [coches, setCoches] = useState([]); // Empezamos con una lista vacía

    // Esta función pide los datos al backend
    const obtenerCoches = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/coches/search?disponibilidad=true');
            const datos = await respuesta.json();
            setCoches(datos);
        } catch (error) {
            console.error("Error al traer coches:", error);
        }
    };

    // Se ejecuta una sola vez al abrir la página
    useEffect(() => {
        obtenerCoches();
    }, []);

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">🏎️ Inventario Real</h2>
            <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left font-bold text-gray-600 uppercase">Marca</th>
                        <th className="px-6 py-3 text-left font-bold text-gray-600 uppercase">Modelo</th>
                        <th className="px-6 py-3 text-left font-bold text-gray-600 uppercase">Precio</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {coches.map((coche) => (
                        <tr key={coche._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{coche.marca}</td>
                            <td className="px-6 py-4 text-gray-700">{coche.modelo}</td>
                            <td className="px-6 py-4 text-gray-700 font-semibold">{coche.precio}€</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}