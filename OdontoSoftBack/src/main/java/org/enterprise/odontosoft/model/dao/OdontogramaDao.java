package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.Odontograma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OdontogramaDao extends JpaRepository<Odontograma, Long> {

	@Query(value = "SELECT o FROM  Odontograma o WHERE o.idhistoriaclinica.id = :idHistoriaClinica")
	Optional<Odontograma> findByIdhistoriaclinica(Integer idHistoriaClinica);
}
