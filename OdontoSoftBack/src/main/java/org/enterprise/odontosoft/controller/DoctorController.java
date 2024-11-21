package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.DoctorResponse;

import java.util.List;

public interface DoctorController {

	List<DoctorResponse> getAllDoctors();

	DoctorResponse getDoctorById(Integer id);
}
