package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.Menu;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuDao extends CrudRepository<Menu, Integer> {

  @Query("SELECT pm.idMenu FROM PermisoMenu pm JOIN pm.idRol.usuarios u WHERE pm.idMenu.habilitado = true AND u.habilitado = true AND pm.habilitado = true AND pm.idRol.habilitado = true AND u.codigo = :codigo ORDER BY pm.idMenu.idMenuPadre DESC")
  List<Menu> findByCodigoUsuario(String codigo);
}
