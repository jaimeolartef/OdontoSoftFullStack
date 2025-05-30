package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.TipoDocumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TipoDocumentoRepository extends JpaRepository<TipoDocumento, Integer> {
	Optional<TipoDocumento> findByCodigo(String codigo);
	boolean existsByCodigo(String codigo);
}