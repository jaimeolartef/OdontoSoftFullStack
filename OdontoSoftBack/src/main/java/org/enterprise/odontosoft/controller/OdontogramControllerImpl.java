package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.DetalleOdontogramaMapper;
import org.enterprise.odontosoft.controller.mapper.OdontogramaMapper;
import org.enterprise.odontosoft.model.Dao.DetalleOdontogramaDao;
import org.enterprise.odontosoft.model.Dao.EstadoDienteDao;
import org.enterprise.odontosoft.model.Dao.OdontogramaDao;
import org.enterprise.odontosoft.model.Dao.UsuarioDao;
import org.enterprise.odontosoft.model.Entity.DetalleOdontograma;
import org.enterprise.odontosoft.model.Entity.EstadoDiente;
import org.enterprise.odontosoft.model.Entity.Odontograma;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.OdontogramaRequest;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
public class OdontogramControllerImpl implements OdontogramController {

	private final OdontogramaDao odontogramaDao;

	private final DetalleOdontogramaDao detalleOdontogramaDao;

	private final EstadoDienteDao estadoDienteDao;

	private final UsuarioDao usuarioDao;

	private static final Logger logger = LoggerFactory.getLogger(OdontogramControllerImpl.class);

	@Override
	public ResponseEntity<OdontogramaResponse> getOdontogramByMedicalHistory(Integer idHistoriaClinica) {
		ResponseEntity<OdontogramaResponse> responseEntity = null;
		try {
			Odontograma odontograma = odontogramaDao.findByIdhistoriaclinica(idHistoriaClinica).orElse(null);
			if (odontograma == null) {
				responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(new OdontogramaResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "No se encontró el odontograma"));
				return responseEntity;
			}
			responseEntity = ResponseEntity.status(HttpStatus.OK).body(OdontogramaMapper.toResponse(odontograma));
		} catch (Exception e) {
			responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			logger.error("Error getting medical history.", e);
		}

		return responseEntity;
	}

	@Override
	public ResponseEntity<OdontogramaResponse> saveOdontogram(OdontogramaRequest odontogramaRequest) {
		ResponseEntity<OdontogramaResponse> responseEntity = null;
		try {
			Odontograma odontograma = OdontogramaMapper.toEntity(odontogramaRequest);
			List<DetalleOdontograma> detalleOdontograma = odontogramaRequest.getDetalleodontogramas().stream()
				.map(DetalleOdontogramaMapper::toEntity)
				.collect(Collectors.toList());
			odontograma.setDetalleodontogramas(null);
			odontograma = odontogramaDao.save(odontograma);
			saveDetalleOdontograma(detalleOdontograma, odontograma.getId());
			responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(OdontogramaMapper.toResponse(odontograma));
		} catch (Exception e) {
			responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			logger.error("Error saving odontogram.", e);
		}

		return responseEntity;
	}

	private void saveDetalleOdontograma(List<DetalleOdontograma> detalleOdontograma, int idOdontograma) {
		List<DetalleOdontograma> detalleEliminar = new ArrayList<>();
		detalleOdontograma.forEach(detalle -> {
			if (Objects.nonNull(detalle.getIdestado()) && Objects.nonNull(detalle.getIdestado().getCodigo())) {
				detalle.setIdestado(EstadoDiente.builder().id(estadoDienteDao.findByCodigo(detalle.getIdestado().getCodigo()).orElse(null).getId()).build());
				detalle.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(detalle.getIdusuariocreacion().getCodigo()).getId()).build());
				detalle.setIdodontograma(Odontograma.builder().id(idOdontograma).build());
				detalleOdontogramaDao.save(detalle);
			} else if (Objects.nonNull(detalle.getId())) {
				detalleEliminar.add(detalle);
			}
		});

		detalleEliminar.forEach(detalleOdontogramaDao::delete);
	}
}
