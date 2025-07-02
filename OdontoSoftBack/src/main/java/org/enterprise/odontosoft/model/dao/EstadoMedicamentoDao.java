package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.EstadoMedicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoMedicamentoDao extends JpaRepository<EstadoMedicamento, Long> {
}
