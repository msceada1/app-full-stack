import React, { useState } from 'react';

const ModalRegistroVenta = ({ isOpen, onClose, cocheSeleccionado, actualizarTabla }) => {
    const [formData, setFormData] = useState({
        clienteNombre: '',
        clienteDNI: '',
        metodoPago: 'Efectivo' // Valor por defecto seguro
    });

    // Si el modal no está abierto o no hay coche, no renderizamos nada
    if (!isOpen || !cocheSeleccionado) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ventaData = {
            cocheId: cocheSeleccionado._id,
            nombreCliente: formData.clienteNombre,
            dniCliente: formData.clienteDNI,
            metodoPago: formData.metodoPago
        };

        try {
            const response = await fetch('http://localhost:3000/api/ventas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ventaData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`¡Venta realizada! El ${cocheSeleccionado.modelo} ha sido vendido por ${formData.metodoPago}.`);
                actualizarTabla(); // Refresca el inventario
                
                // Reseteamos el formulario al estado inicial
                setFormData({ clienteNombre: '', clienteDNI: '', metodoPago: 'Efectivo' }); 
                onClose(); // Cerrar modal
            } else {
                alert(`Error: ${data.mensaje || "No se pudo realizar la venta"}`);
            }
        } catch (error) {
            console.error("Error al registrar la venta:", error);
            alert("Error de conexión. Revisa que el backend esté corriendo.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
            
            {/* Contenedor del modal */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all border border-gray-100">
                
                {/* Cabecera azul */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white text-center">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Registrar Operación</h2>
                    <p className="text-blue-100 text-sm mt-1">Completa los datos para finalizar la venta</p>
                </div>

                <div className="p-8">
                    {/* Resumen del coche seleccionado */}
                    <div className="mb-8 p-5 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Vehículo</p>
                                <h3 className="text-xl font-black text-gray-800">
                                    {cocheSeleccionado.marca} {cocheSeleccionado.modelo}
                                </h3>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-400 uppercase">Precio</p>
                                <p className="text-xl font-black text-green-600">
                                    {cocheSeleccionado.precio.toLocaleString()}€
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de venta */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Input nombre */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del Comprador</label>
                            <input
                                type="text"
                                name="clienteNombre"
                                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all"
                                placeholder="Nombre completo"
                                value={formData.clienteNombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Input DNI */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">DNI / NIE / CIF</label>
                            <input
                                type="text"
                                name="clienteDNI"
                                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all"
                                placeholder="Documento de identidad"
                                value={formData.clienteDNI}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Método de Pago */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Método de Pago</label>
                            <div className="relative">
                                <select
                                    name="metodoPago"
                                    value={formData.metodoPago}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="Efectivo">Efectivo 💵</option>
                                    <option value="Tarjeta">Tarjeta 💳</option>
                                    <option value="Financiación">Financiación 🏦</option>
                                </select>
                                {/* Flecha hacia abajo */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex gap-4 pt-6">
                            <button 
                                type="button" 
                                onClick={onClose}
                                className="flex-1 px-6 py-4 text-gray-500 font-bold hover:text-gray-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                className="flex-1 px-6 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1 transition-all"
                            >
                                CONFIRMAR VENTA
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalRegistroVenta;