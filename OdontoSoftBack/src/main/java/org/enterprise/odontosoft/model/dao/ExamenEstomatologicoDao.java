package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.ExamenEstomatologico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamenEstomatologicoDao extends JpaRepository<ExamenEstomatologico, Long> {
}
