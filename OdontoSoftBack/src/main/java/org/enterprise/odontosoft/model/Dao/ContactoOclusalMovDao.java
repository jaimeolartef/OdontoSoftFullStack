package org.enterprise.odontosoft.model.Dao;

import org.enterprise.odontosoft.model.Entity.ContactoOclusalesMov;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactoOclusalMovDao extends JpaRepository<ContactoOclusalesMov, Long> {
}
