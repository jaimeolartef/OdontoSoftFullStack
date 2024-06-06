package org.enterprise.odontosoft.model.Service;

import org.enterprise.odontosoft.model.Entity.Menu;

import java.util.List;

public interface MenuService {

  List<Menu> findByCodigoUsuario(String codigo);
}
