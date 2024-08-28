const PacienteTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Documento</th>
          <th>Nombre</th>
          <th>Primer Apellido</th>
          <th>Segundo Apellido</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {data.map((paciente, index) => (
          <tr key={index}>
            <td>{paciente.documento}</td>
            <td>{paciente.primernombre} {paciente.segundonombre}</td>
            <td>{paciente.primerapellido}</td>
            <td>{paciente.segundoapellido}</td>
            <td>{paciente.telefono}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PacienteTable;