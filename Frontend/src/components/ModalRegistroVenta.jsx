import React, { useState } from 'react';

const ModalRegistroVenta = ({ isOpen, onClose, cocheSeleccionado }) => {
    const [formData, setFormData] = useState({
        clienteNombre: '',
        clienteDNI: '',
        fecha: new Date().toISOString().split('T')[0],
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const ventaData = {
            ...formData,
            cocheId: cocheSeleccionado.id
        };

        try {
            const response = await fetch('http://localhost:3000/api/ventas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ventaData),
            });

            if (response.ok) {
                alert("¡Venta registrada con éxito!");
                onClose();
            }
        } catch (error) {
            console.error("Error al registrar la venta:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Registrar Venta</h2>
                <p><strong>Coche:</strong> {cocheSeleccionado?.marca} {cocheSeleccionado?.modelo}</p>

                <form onSubmit={handleSubmit}>
                    <label>Nombre del Cliente:</label>
                    <input
                        type="text"
                        name="clienteNombre"
                        value={formData.clienteNombre}
                        onChange={handleChange}
                        required
                    />

                    <label>DNI/CIF:</label>
                    <input
                        type="text"
                        name="clienteDNI"
                        value={formData.clienteDNI}
                        onChange={handleChange}
                        required
                    />

                    <div className="acciones">
                        <button type="button" onClick={onClose}>Cancelar</button>
                        <button type="submit">Confirmar Venta</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalRegistroVenta;