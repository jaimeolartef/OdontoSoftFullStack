package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Odontograma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OdontogramaDao extends JpaRepository<Odontograma, Long> {
}
