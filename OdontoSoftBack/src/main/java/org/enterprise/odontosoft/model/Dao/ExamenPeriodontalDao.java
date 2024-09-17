package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.ExamenPeriodontal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamenPeriodontalDao extends JpaRepository<ExamenPeriodontal, Long> {
}
