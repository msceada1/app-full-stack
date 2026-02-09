import { useState, useEffect } from 'react';
import ModalRegistroVenta from './ModalRegistroVenta';

export default function Inventory() {
    const [coches, setCoches] = useState([]);
    const [nuevoCoche, setNuevoCoche] = useState({ marca: '', modelo: '', precio: '', stock: '', anio: '' });
    const [cargando, setCargando] = useState(false);

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
                alert("¡Coche guardado correctamente!");
                setNuevoCoche({ marca: '', modelo: '', precio: '', stock: '', anio: '' });
                obtenerCoches(); // Recarga inmediata
            }
        } catch (error) {
            alert("Error de conexión");
        }
    };

    const eliminarCoche = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este vehículo? Esta acción no se puede deshacer.")) {
            return;
        }

        try {
            const respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (respuesta.ok) {
                alert("Vehículo eliminado correctamente");
                obtenerCoches(); // Refrescamos la lista
            } else {
                alert("No se pudo eliminar el vehículo");
            }
        } catch (error) {
            console.error(error);
            alert("Error al intentar eliminar");
        }
    };


    const editarPrecio = async (id, precioActual) => {
        const nuevoPrecio = prompt("Introduce el nuevo precio:", precioActual);

        // Validamos que haya valor y que sea numérico
        if (nuevoPrecio !== null && nuevoPrecio !== "" && !isNaN(nuevoPrecio)) {
            try {
                const respuesta = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ precio: Number(nuevoPrecio) })
                });

                if (respuesta.ok) {
                    alert("Precio actualizado");
                    obtenerCoches();
                } else {
                    alert("Error al actualizar el precio");
                }
            } catch (error) {
                console.error(error);
                alert("Error de conexión");
            }
        }
    };

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
                                    <div className="flex justify-center items-center gap-2">
                                        {/* boton vender */}
                                        <button 
                                            onClick={() => abrirVenta(coche)}
                                            className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-bold hover:bg-green-600 hover:text-white transition-all disabled:opacity-50"
                                            disabled={coche.stock <= 0}
                                        >
                                            {coche.stock > 0 ? "VENDER" : "AGOTADO"}
                                        </button>

                                        {/* boton editar */}
                                        <button 
                                            onClick={() => editarPrecio(coche._id, coche.precio)}
                                            className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-500 hover:text-white transition-all"
                                            title="Editar Precio"
                                        >
                                            ✏️
                                        </button>

                                        {/* boton eliminar */}
                                        <button 
                                            onClick={() => eliminarCoche(coche._id)}
                                            className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition-all"
                                            title="Eliminar Coche"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalRegistroVenta 
                isOpen={modalAbierto} 
                onClose={() => setModalAbierto(false)} 
                cocheSeleccionado={cocheParaVender}
                actualizarTabla={obtenerCoches}
            />
        </div>
    );
}