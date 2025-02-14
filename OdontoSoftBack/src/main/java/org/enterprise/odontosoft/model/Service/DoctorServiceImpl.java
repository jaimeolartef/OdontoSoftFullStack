package org.enterprise.odontosoft.model.Service;

import org.enterprise.odontosoft.model.Dao.MedicoDao;
import org.enterprise.odontosoft.model.Entity.Medico;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {

	private final MedicoDao medicoDao;

	public DoctorServiceImpl(MedicoDao medicoDao) {
		this.medicoDao = medicoDao;
	}

	@Override
	public Medico getDoctorById(Integer id) {
		return medicoDao.findById(id).orElseThrow();
	}

	@Override
	public List<Medico> getAllDoctors() {
		return (List<Medico>) medicoDao.findAll();
	}

	@Override
	public Medico getDoctorByDocumento(String documento) {
		return medicoDao.getMedicoByDocumento(documento).orElseThrow();
	}


}
