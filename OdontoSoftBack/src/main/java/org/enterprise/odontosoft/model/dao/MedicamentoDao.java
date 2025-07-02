package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicamentoDao extends JpaRepository<Medicamento, Long> {
}
