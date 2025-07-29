package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.Lista;
import org.enterprise.odontosoft.model.entity.ListaDetalle;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListaDetalleDao extends CrudRepository<ListaDetalle, Integer> {

    List<ListaDetalle> findAllByHabilitadoTrue();

    List<ListaDetalle> findByListaAndHabilitadoTrue(Lista lista);

    List<ListaDetalle> findByListaId(Integer idLista);

    List<ListaDetalle> findByListaIdAndHabilitadoTrue(Integer idLista);

    ListaDetalle findByCodigoAndHabilitadoTrue(String codigo);
}