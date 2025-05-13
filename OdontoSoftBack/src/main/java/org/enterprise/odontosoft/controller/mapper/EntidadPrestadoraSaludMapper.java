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
        EntidadPrestadoraSalud entidad = new EntidadPrestadoraSalud();
        entidad.setId(request.getId());
        entidad.setTipoDocumento(TipoDocumento.builder().id(Integer.valueOf(request.getTipodocumento())).build());
        entidad.setNumeroDocumento(Integer.valueOf(request.getNumerodocumento()));
        entidad.setNombre(request.getNombre());
        entidad.setTipoEntidad(TipoEntidad.builder().id(Integer.valueOf(request.getTipoentidad())).build());
        entidad.setCodigoHabilitacionMinsalud(request.getCodigominsalud());
        entidad.setRegimenAdministra(Regimen.builder().id(Integer.valueOf(request.getRegimenadministra())).build());
        entidad.setDireccion(request.getDireccion());
        entidad.setTelefono(request.getTelefono());
        entidad.setSitioWeb(request.getSitioWeb());
        entidad.setCorreo(request.getCorreo());
        entidad.setCanalesAtencion(request.getCanalesAtencion());
        return entidad;
    }

    public static EntidadPrestadoraSaludResponse toResponse(EntidadPrestadoraSalud entidad) {
        return EntidadPrestadoraSaludResponse.builder()
                .id(entidad.getId())
                .tipodocumento(entidad.getTipoDocumento().getId().toString())
                .nombre(entidad.getTipoDocumento().getNombre())
                .numerodocumento(entidad.getNumeroDocumento().toString())
                .nombre(entidad.getNombre())
                .tipoentidad(entidad.getTipoEntidad().getId().toString())
                .codigominsalud(entidad.getCodigoHabilitacionMinsalud())
                .regimenadministra(entidad.getRegimenAdministra().getId().toString())
                .direccion(entidad.getDireccion())
                .telefono(entidad.getTelefono())
                .sitioWeb(entidad.getSitioWeb())
                .correo(entidad.getCorreo())
                .canalesAtencion(entidad.getCanalesAtencion())
                .build();
    }
}