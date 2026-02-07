import React, { useState, useEffect } from 'react';

const Buscador = () => {
    const [termino, setTermino] = useState('');
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            if (termino) {
                realizarBusqueda(termino);
            } else {
                setResultados([]);
            }
        }, 500);


        return () => clearTimeout(timeoutId);
    }, [termino]);

    const realizarBusqueda = async (query) => {
        setCargando(true);
        try {

            const response = await fetch(`http://localhost:3000/api/filtros?search=${query}`);
            const data = await response.json();
            setResultados(data);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="buscador-container">
            <input
                type="text"
                placeholder="Buscar..."
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
            />

            {cargando && <p>Buscando...</p>}

            <ul>
                {resultados.map((item) => (
                    <li key={item.id}>{item.nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default Buscador;