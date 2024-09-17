package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.PlanTratamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanTratamientoDao extends JpaRepository<PlanTratamiento, Long> {
}