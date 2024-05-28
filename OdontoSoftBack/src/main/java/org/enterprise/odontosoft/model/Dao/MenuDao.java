package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.Menu;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuDao extends CrudRepository<Menu, Integer> {

  @Query("SELECT m FROM Menu m JOIN PermisoMenu pm JOIN pm.idRol r JOIN r.usuarios u WHERE r.habilitado = true AND u.habilitado = true AND u.codigo = :codigo ORDER BY m.idMenuPadre ASC")
  List<Menu> findByCodigoUsuario(String codigo);
}
