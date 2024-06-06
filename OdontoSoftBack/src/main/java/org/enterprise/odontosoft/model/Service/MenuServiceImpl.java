package org.enterprise.odontosoft.model.Service;

import org.enterprise.odontosoft.model.Dao.MenuDao;
import org.enterprise.odontosoft.model.Entity.Menu;

import java.util.List;

public class MenuServiceImpl implements MenuService {

  private MenuDao menuDao;

  @Override
  public List<Menu> findByCodigoUsuario(String codigo) {
    return menuDao.findByCodigoUsuario(codigo);
  }
}
