package org.enterprise.odontosoft.model.service;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.model.dao.ListaDetalleDao;
import org.enterprise.odontosoft.model.entity.Lista;
import org.enterprise.odontosoft.model.entity.ListaDetalle;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ListaDetalleServiceImpl implements ListaDetalleService {

    private final ListaDetalleDao listaDetalleDao;

    @Override
    public List<ListaDetalle> findAll() {
        return (List<ListaDetalle>) listaDetalleDao.findAll();
    }

    @Override
    public Optional<ListaDetalle> findById(Integer id) {
        return listaDetalleDao.findById(id);
    }

    @Override
    public ListaDetalle save(ListaDetalle listaDetalle) {
        return listaDetalleDao.save(listaDetalle);
    }

    @Override
    public void deleteById(Integer id) {
        listaDetalleDao.deleteById(id);
    }

    @Override
    public List<ListaDetalle> findAllActive() {
        return listaDetalleDao.findAllByHabilitadoTrue();
    }

	@Override
    public List<ListaDetalle> findActiveByLista(Lista lista) {
        return listaDetalleDao.findByListaAndHabilitadoTrue(lista);
    }

    @Override
    public List<ListaDetalle> findByListaId(Integer idLista) {
        return listaDetalleDao.findByListaId(idLista);
    }

    @Override
    public List<ListaDetalle> findActiveByListaId(Integer idLista) {
        return listaDetalleDao.findByListaIdAndHabilitadoTrue(idLista);
    }

    @Override
    public ListaDetalle findByCodigo(String codigo) {
        return listaDetalleDao.findByCodigoAndHabilitadoTrue(codigo);
    }
}