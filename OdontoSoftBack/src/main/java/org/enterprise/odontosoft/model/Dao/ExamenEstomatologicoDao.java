package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.ExamenEstomatologico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamenEstomatologicoDao extends JpaRepository<ExamenEstomatologico, Long> {
}
