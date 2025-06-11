package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.enterprise.odontosoft.controller.mapper.DetalleOdontogramaMapper;
import org.enterprise.odontosoft.controller.mapper.OdontogramaMapper;
import org.enterprise.odontosoft.model.dao.DetalleOdontogramaDao;
import org.enterprise.odontosoft.model.dao.EstadoDienteDao;
import org.enterprise.odontosoft.model.dao.OdontogramaDao;
import org.enterprise.odontosoft.model.dao.UsuarioDao;
import org.enterprise.odontosoft.model.entity.DetalleOdontograma;
import org.enterprise.odontosoft.model.entity.EstadoDiente;
import org.enterprise.odontosoft.model.entity.Odontograma;
import org.enterprise.odontosoft.model.entity.Usuario;
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
	public OdontogramaResponse getOdontogramByMedicalHistory(Integer idHistoriaClinica) {
		try {
			Odontograma odontograma = odontogramaDao.findByIdhistoriaclinica(idHistoriaClinica).orElse(null);
			if (odontograma == null) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontró el odontograma para la historia clínica con ID: " + idHistoriaClinica);
			}
			return OdontogramaMapper.toResponse(odontograma);
		} catch (Exception e) {
			logger.error("Error getting medical history.", e);
		}
		return null;
	}

	@Override
	public void saveOdontogram(OdontogramaRequest odontogramaRequest) {
		try {
			Odontograma odontograma = OdontogramaMapper.toEntity(odontogramaRequest);
			List<DetalleOdontograma> detalleOdontograma = odontogramaRequest.getDetalleodontogramas().stream()
				.map(DetalleOdontogramaMapper::toEntity)
				.collect(Collectors.toList());
			odontograma.setDetalleodontogramas(null);
			odontograma.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(odontograma.getIdusuariocreacion().getCodigo()).getId()).build());
			odontograma.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(odontograma.getIdusuariomodificacion().getCodigo()).getId()).build());
			odontograma = odontogramaDao.save(odontograma);
			saveDetalleOdontograma(detalleOdontograma, odontograma.getId());
		} catch (Exception e) {
			logger.error("Error saving odontogram.", e);
		}
	}

	private void saveDetalleOdontograma(List<DetalleOdontograma> detalleOdontograma, int idOdontograma) {
		List<DetalleOdontograma> detalleEliminar = new ArrayList<>();
		detalleOdontograma.forEach(detalle -> {
			if (Objects.nonNull(detalle.getIdestado()) && Strings.isNotBlank(detalle.getIdestado().getCodigo()) && Objects.nonNull(detalle.getIdestado().getCodigo())) {
				detalle.setIdestado(EstadoDiente.builder().id(estadoDienteDao.findByCodigo(detalle.getIdestado().getCodigo()).orElse(null).getId()).build());
				detalle.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(detalle.getIdusuariocreacion().getCodigo()).getId()).build());
				if (Objects.nonNull(detalle.getIdusuariomodificacion())) {
					detalle.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(detalle.getIdusuariomodificacion().getCodigo()).getId()).build());
				}
				detalle.setIdodontograma(Odontograma.builder().id(idOdontograma).build());
				detalleOdontogramaDao.save(detalle);
			} else if (Objects.nonNull(detalle.getId())) {
				detalleEliminar.add(detalle);
			}
		});

		detalleEliminar.forEach(detalleOdontogramaDao::delete);
	}
}
