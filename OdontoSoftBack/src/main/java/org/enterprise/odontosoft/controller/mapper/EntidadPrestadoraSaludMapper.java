package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.EntidadPrestadoraSalud;
import org.enterprise.odontosoft.model.entity.Regimen;
import org.enterprise.odontosoft.model.entity.TipoDocumento;
import org.enterprise.odontosoft.model.entity.TipoEntidad;
import org.enterprise.odontosoft.view.dto.request.EntidadPrestadoraSaludRequest;
import org.enterprise.odontosoft.view.dto.response.EntidadPrestadoraSaludResponse;

@UtilityClass
public class EntidadPrestadoraSaludMapper {

    public static EntidadPrestadoraSalud toEntity(EntidadPrestadoraSaludRequest request) {
        return EntidadPrestadoraSalud.builder()
            .id(request.getId())
            .tipoDocumento(TipoDocumento.builder().id(Integer.valueOf(request.getTipodocumento())).build())
            .numeroDocumento(Integer.valueOf(request.getNumerodocumento()))
            .nombre(request.getNombre())
            .tipoEntidad(TipoEntidad.builder().id(Integer.valueOf(request.getTipoentidad())).build())
            .codigoHabilitacionMinsalud(request.getCodigominsalud())
            .regimenAdministra(Regimen.builder().id(Integer.valueOf(request.getRegimenadministra())).build())
            .direccion(request.getDireccion())
            .telefono(request.getTelefono())
            .sitioWeb(request.getSitioWeb())
            .correo(request.getCorreo())
            .canalesAtencion(request.getCanalesAtencion())
            .habilitado(request.getHabilitado())
            .build();
    }

    public static EntidadPrestadoraSaludResponse toResponse(EntidadPrestadoraSalud entidad) {
        return EntidadPrestadoraSaludResponse.builder()
                .id(entidad.getId())
                .tipodocumento(entidad.getTipoDocumento().getNombre())
                .nombre(entidad.getTipoDocumento().getNombre())
                .numerodocumento(entidad.getNumeroDocumento().toString())
                .nombre(entidad.getNombre())
                .tipoentidad(entidad.getTipoEntidad().getDescripcion())
                .codigominsalud(entidad.getCodigoHabilitacionMinsalud())
                .regimenadministra(entidad.getRegimenAdministra().getDescripcion())
                .direccion(entidad.getDireccion())
                .telefono(entidad.getTelefono())
                .sitioweb(entidad.getSitioWeb())
                .correo(entidad.getCorreo())
                .canalesatencion(entidad.getCanalesAtencion())
                .habilitado(entidad.getHabilitado())
                .build();
    }
}