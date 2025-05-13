package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.ExamenDental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamenDentalDao extends JpaRepository<ExamenDental, Long> {
}
