import { useState, useEffect } from 'react';
import ModalRegistroVenta from './ModalRegistroVenta'; // 1. IMPORTANTE: Importar el modal

export default function Inventory() {
    const [coches, setCoches] = useState([]);
    const [nuevoCoche, setNuevoCoche] = useState({ marca: '', modelo: '', precio: '', stock: '', anio: '' });
    const [cargando, setCargando] = useState(false);

    // --- 2. ESTADOS PARA CONTROLAR EL MODAL ---
    const [modalAbierto, setModalAbierto] = useState(false);
    const [cocheParaVender, setCocheParaVender] = useState(null);

    const API_URL = 'http://localhost:3000/api/coches';

    const obtenerCoches = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch(API_URL);
            const datos = await respuesta.json();
            const listaLimpia = Array.isArray(datos) ? datos : (datos.coches || []);
            setCoches(listaLimpia);
        } catch (error) {
            console.error("Error al obtener coches:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => { obtenerCoches(); }, []);

    const agregarCoche = async (e) => {
        e.preventDefault();
        const cocheParaEnviar = {
            ...nuevoCoche,
            precio: Number(nuevoCoche.precio),
            stock: Number(nuevoCoche.stock),
            anio: Number(nuevoCoche.anio),
            concesionario_id: "6987ca771b0d49ef27e4175a" 
        };

        try {
            const respuesta = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cocheParaEnviar)
            });

            if (respuesta.ok) {
                alert("✅ ¡Coche guardado correctamente!");
                setNuevoCoche({ marca: '', modelo: '', precio: '', stock: '', anio: '' });
                setTimeout(obtenerCoches, 500); 
            }
        } catch (error) {
            alert("❌ Error de conexión");
        }
    };

    // --- 3. FUNCIÓN PARA ABRIR EL MODAL ---
    const abrirVenta = (coche) => {
        setCocheParaVender(coche);
        setModalAbierto(true);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
            {/* Formulario */}
            <h2 className="text-2xl font-bold mb-4 text-blue-600">🆕 Añadir Nuevo Vehículo</h2>
            <form onSubmit={agregarCoche} className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-10 p-5 bg-blue-50 rounded-lg border border-blue-100">
                <input type="text" placeholder="Marca" className="p-2 border rounded" value={nuevoCoche.marca} onChange={e => setNuevoCoche({...nuevoCoche, marca: e.target.value})} required />
                <input type="text" placeholder="Modelo" className="p-2 border rounded" value={nuevoCoche.modelo} onChange={e => setNuevoCoche({...nuevoCoche, modelo: e.target.value})} required />
                <input type="number" placeholder="Precio" className="p-2 border rounded" value={nuevoCoche.precio} onChange={e => setNuevoCoche({...nuevoCoche, precio: e.target.value})} required />
                <input type="number" placeholder="Stock" className="p-2 border rounded" value={nuevoCoche.stock} onChange={e => setNuevoCoche({...nuevoCoche, stock: e.target.value})} required />
                <input type="number" placeholder="Año" className="p-2 border rounded" value={nuevoCoche.anio} onChange={e => setNuevoCoche({...nuevoCoche, anio: e.target.value})} required />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold">Añadir +</button>
            </form>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">🏎️ Inventario del Concesionario</h2>
                <button onClick={obtenerCoches} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm font-bold transition-all">
                    {cargando ? "Cargando..." : "🔄 Refrescar"}
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Vehículo</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Precio</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Stock</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-widest text-blue-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {coches.map((coche) => (
                            <tr key={coche._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{coche.marca} {coche.modelo}</td>
                                <td className="px-6 py-4 text-sm text-green-600 font-bold">{coche.precio}€</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{coche.stock}</td>
                                <td className="px-6 py-4 text-center">
                                    {/* --- 4. BOTÓN PARA ABRIR EL MODAL --- */}
                                    <button 
                                        onClick={() => abrirVenta(coche)}
                                        className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-black hover:bg-green-600 hover:text-white transition-all"
                                        disabled={coche.stock <= 0}
                                    >
                                        {coche.stock > 0 ? "💰 VENDER" : "SIN STOCK"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- 5. EL COMPONENTE MODAL DEBE IR AQUÍ (AL FINAL) --- */}
            <ModalRegistroVenta 
                isOpen={modalAbierto} 
                onClose={() => setModalAbierto(false)} 
                cocheSeleccionado={cocheParaVender}
                actualizarTabla={obtenerCoches}
            />
        </div>
    );
}