package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Diagnostico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiagnosticoDao extends JpaRepository<Diagnostico, Long> {
}
