package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.HistoriAcaries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoriaCariesDao extends JpaRepository<HistoriAcaries, Long> {
}
