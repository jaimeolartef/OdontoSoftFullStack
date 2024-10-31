import React, { useEffect, useState } from 'react';
import axios from "axios";
import config from "../../config";

const Diagnosticos = ({ formMedicalHistory }) => {
    const [TipoDiagnostico, setTipoDiagnostico] = useState({
        id: 0,
        codigo: '',
        descripcion: '',
        habilitado: true
    });

    const [diagnosticos, setDiagnosticos] = useState(formMedicalHistory.diagnosticos);

    useEffect(() => {
        console.log('paso 1: cargo el tipos diagnosticos: ');
        const fetchTipoDiagnostico = async () => {
            let token = localStorage.getItem('jsonwebtoken');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axios.get(`${config.baseURL}/tipodiagnostico/consultar`);
                console.log('tipo diagnostico consultar:', response.data);
                if (response.status === 200) {
                    setTipoDiagnostico(response.data);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        }

        console.log('paso 1: por useEffect:', formMedicalHistory);
        fetchTipoDiagnostico();
    }, [formMedicalHistory]);

    const handleCheckboxChange = (index) => {
        const newDiagnosticos = [...diagnosticos];
        newDiagnosticos[index].definitivo = !newDiagnosticos[index].definitivo;
        setDiagnosticos(newDiagnosticos);
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2>Diagnósticos</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="diagnostico">Diagnóstico</label>
                    <input type="text" id="diagnostico" className="form-control" />
                </div>
                <div className="form-group">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Diagnóstico</th>
                                <th>Confirmado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formMedicalHistory.diagnosticos.length === 0 ? (
                                <p>No hay diagnósticos disponibles.</p>
                            ) : (
                                formMedicalHistory.diagnosticos.map((diagnostico, index) => (
                                  console.log('diagnostico:', diagnostico),
                                    <tr key={diagnostico.id}>
                                        <td><label>{diagnostico.codtipodiagnostico}</label></td>
                                        <td>{diagnostico.descripciontipodiagnostico}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={diagnostico.definitivo}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                        </td>
                                        <td>
                                            <button className="btn btn-danger">Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Diagnosticos;