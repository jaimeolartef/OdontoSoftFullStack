package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.AntecedentePaciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AntecedentePacienteDao extends JpaRepository<AntecedentePaciente, Long> {
}