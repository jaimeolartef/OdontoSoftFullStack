package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.EntidadPrestadoraSalud;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EntidadPrestadoraSaludDao extends CrudRepository<EntidadPrestadoraSalud, Integer> {

    @Query("SELECT e FROM EntidadPrestadoraSalud e WHERE " +
           "(:numerodocumento IS NULL OR e.numeroDocumento = :numerodocumento) AND " +
           "(:nombre IS NULL OR UPPER(e.nombre) LIKE UPPER(CONCAT('%', :nombre, '%')))")
    List<EntidadPrestadoraSalud> buscarPorNombreODocumento(
            @Param("numerodocumento") Integer numerodocumento,
            @Param("nombre") String nombre);
}