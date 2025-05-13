package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.Medico;

import java.util.List;

public interface DoctorService {

	Medico getDoctorById(Integer id);

	List<Medico> getAllDoctors();

	Medico getDoctorByDocumento(String documento);
}
