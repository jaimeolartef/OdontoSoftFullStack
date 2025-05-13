package org.enterprise.odontosoft.model.dao;

import org.enterprise.odontosoft.model.entity.ContactoOclusalesMov;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactoOclusalMovDao extends JpaRepository<ContactoOclusalesMov, Long> {
}
