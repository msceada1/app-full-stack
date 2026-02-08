import React, { useState, useEffect } from 'react';

const Buscador = () => {
    const [termino, setTermino] = useState('');
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(false);

    const API_URL = 'http://localhost:3000/api/coches/search';

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (termino.trim()) {
                realizarBusqueda(termino);
            } else {
                setResultados([]);
            }
        }, 400); // Un poco más rápido el debounce

        return () => clearTimeout(timeoutId);
    }, [termino]);

    const realizarBusqueda = async (query) => {
        setCargando(true);
        try {
            // ✅ Usamos la ruta y parámetro que definimos en el backend
            const response = await fetch(`${API_URL}?marca=${query}`);
            const data = await response.json();
            setResultados(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-12 p-8 bg-gray-50 rounded-2xl shadow-inner">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800">🔍 Buscador de Inventario</h2>
                <p className="text-gray-500 mt-2">Encuentra tu próximo vehículo por marca en tiempo real</p>
            </div>

            {/* BARRA DE BÚSQUEDA ANCHA */}
            <div className="relative mb-10">
                <input
                    type="text"
                    className="w-full p-5 pl-12 text-lg border-2 border-blue-200 rounded-xl shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                    placeholder="Escribe la marca que buscas (ej: Tesla, Ford, Toyota)..."
                    value={termino}
                    onChange={(e) => setTermino(e.target.value)}
                />
                <span className="absolute left-4 top-5 text-2xl">🔎</span>
                
                {cargando && (
                    <div className="absolute right-4 top-5">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    </div>
                )}
            </div>

            {/* REJILLA DE RESULTADOS (GRID) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resultados.length > 0 ? (
                    resultados.map((coche) => (
                        <div key={coche._id} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 hover:scale-105 transition-transform">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{coche.marca}</h3>
                                    <p className="text-gray-600 italic">{coche.modelo}</p>
                                </div>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    {coche.anio}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-end mt-6">
                                <span className="text-2xl font-black text-green-600">
                                    {coche.precio.toLocaleString()}€
                                </span>
                                <span className={`text-sm font-bold ${coche.stock > 0 ? 'text-gray-400' : 'text-red-500'}`}>
                                    {coche.stock > 0 ? `Stock: ${coche.stock}` : 'Sin Stock'}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    termino && !cargando && (
                        <div className="col-span-full text-center p-10 bg-white rounded-xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 text-lg">No hemos encontrado ningún {termino} en nuestro stock. 😕</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Buscador;