package org.enterprise.odontosoft.model.Service;

import org.enterprise.odontosoft.model.Entity.Medico;

import java.util.List;
import java.util.Optional;

public interface DoctorService {

	Medico getDoctorById(Integer id);

	List<Medico> getAllDoctors();

	Medico getDoctorByDocumento(String documento);
}
