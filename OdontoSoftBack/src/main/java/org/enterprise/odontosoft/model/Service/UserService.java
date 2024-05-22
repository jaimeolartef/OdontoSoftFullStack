package org.enterprise.odontosoft.model.Service;


import org.enterprise.odontosoft.model.Entity.Usuario;

public interface UserService {
    Usuario loadUserByUsername(String username);
}
