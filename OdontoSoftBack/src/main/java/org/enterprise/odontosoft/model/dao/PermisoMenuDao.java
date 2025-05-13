package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.PermisoMenu;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PermisoMenuDao extends CrudRepository<PermisoMenu, Integer> {

	@Query("SELECT pm FROM PermisoMenu pm WHERE pm.idRol.id = :idRol AND pm.idMenu.id = :idMenu")
	List<PermisoMenu> findByIdRolAndIdMenu(Integer idRol, Integer idMenu);
}
