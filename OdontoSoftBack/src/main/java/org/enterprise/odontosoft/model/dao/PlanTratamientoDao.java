package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.PlanTratamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanTratamientoDao extends JpaRepository<PlanTratamiento, Long> {
}