import { useState, useEffect } from 'react';

export default function Inventory() {
    const [coches, setCoches] = useState([]);
    const [nuevoCoche, setNuevoCoche] = useState({ marca: '', modelo: '', precio: '', stock: '', anio: '' });

    const API_URL = 'http://localhost:3000/api/coches';

    const obtenerCoches = async () => {
        try {
            const respuesta = await fetch(API_URL);
            const datos = await respuesta.json();
            setCoches(datos);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => { obtenerCoches(); }, []);

    // 1. Función para Añadir (POST)
    const agregarCoche = async (e) => {
        e.preventDefault();
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoCoche)
            });
            setNuevoCoche({ marca: '', modelo: '', precio: '', stock: '', anio: '' });
            obtenerCoches(); // Recargar tabla
        } catch (error) { console.error("Error al añadir:", error); }
    };

    // 2. Función para Eliminar (DELETE)
    const eliminarCoche = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este coche?")) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            obtenerCoches();
        } catch (error) { console.error("Error al eliminar:", error); }
    };

    // 3. Función para Editar Precio (PUT)
    const editarPrecio = async (id) => {
        const nuevoPrecio = prompt("Introduce el nuevo precio:");
        if (!nuevoPrecio) return;
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ precio: Number(nuevoPrecio) })
            });
            obtenerCoches();
        } catch (error) { console.error("Error al editar:", error); }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
            {/* --- FORMULARIO PARA AÑADIR --- */}
            <h2 className="text-2xl font-bold mb-4">🆕 Añadir Vehículo</h2>
            <form onSubmit={agregarCoche} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10 p-4 bg-gray-50 rounded-lg">
                <input type="text" placeholder="Marca" className="p-2 border rounded" value={nuevoCoche.marca} onChange={e => setNuevoCoche({...nuevoCoche, marca: e.target.value})} required />
                <input type="text" placeholder="Modelo" className="p-2 border rounded" value={nuevoCoche.modelo} onChange={e => setNuevoCoche({...nuevoCoche, modelo: e.target.value})} required />
                <input type="number" placeholder="Precio" className="p-2 border rounded" value={nuevoCoche.precio} onChange={e => setNuevoCoche({...nuevoCoche, precio: e.target.value})} required />
                <input type="number" placeholder="Stock" className="p-2 border rounded" value={nuevoCoche.stock} onChange={e => setNuevoCoche({...nuevoCoche, stock: e.target.value})} required />
                <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 font-bold">Añadir +</button>
            </form>

            {/* --- TABLA DE INVENTARIO --- */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800">🏎️ Inventario de Vehículos</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Marca</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Modelo</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Precio</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Stock</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {coches.map((coche) => (
                            <tr key={coche._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{coche.marca}</td>
                                <td className="px-6 py-4 text-gray-700">{coche.modelo}</td>
                                <td className="px-6 py-4 text-gray-700 font-semibold">{coche.precio}€</td>
                                <td className="px-6 py-4 text-gray-700">{coche.stock}</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button onClick={() => editarPrecio(coche._id)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">✏️ Editar</button>
                                    <button onClick={() => eliminarCoche(coche._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">🗑️ Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}