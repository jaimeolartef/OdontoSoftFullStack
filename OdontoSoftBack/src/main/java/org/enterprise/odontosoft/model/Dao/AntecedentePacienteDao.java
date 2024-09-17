package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.AnalisisOclusion;
import org.enterprise.odontosoft.model.Entity.AntecedentePaciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AntecedentePacienteDao extends JpaRepository<AntecedentePaciente, Long> {
}