package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.ExamenDental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamenDentalDao extends JpaRepository<ExamenDental, Long> {
}
