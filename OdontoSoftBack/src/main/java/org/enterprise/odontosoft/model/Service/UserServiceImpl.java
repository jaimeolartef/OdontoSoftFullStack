package org.enterprise.odontosoft.model.Service;

import org.enterprise.odontosoft.model.Dao.UsuarioDao;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserServiceImpl implements UserDetailsService {

  private final UsuarioDao usuarioDao;

  public UserServiceImpl(UsuarioDao usuarioDao) {
    this.usuarioDao = usuarioDao;
  }


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Usuario user = usuarioDao.findByCodigo(username);
    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }
    return new User(user.getCodigo(), user.getClave(), new ArrayList<>());
  }
}
