package org.enterprise.odontosoft.controller.enume;

import lombok.Getter;


@Getter
public enum TipoDocumentoEnum {
    CC("Cédula de Ciudadanía", "C.C.", 1),
    CE("Cédula de Extranjería", "C.E.", 2),
    TI("Tarjeta de Identidad", "T.I.", 3),
    RC("Registro Civil", "R.C.", 4),
    PS("Pasaporte", "P.S.", 5);

    private String nombre;
    private String sigla;
    private Integer id;

    TipoDocumentoEnum(String nombre, String sigla, Integer id) {
        this.nombre = nombre;
        this.sigla = sigla;
        this.id = id;
    }


    public static TipoDocumentoEnum getBySigla(String codigo) {
        for (TipoDocumentoEnum tipo : values()) {
            if (tipo.sigla.equals(codigo)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("No TipoDocumentoEnum found with id: ");
    }

public static TipoDocumentoEnum getById(Integer id) {
        for (TipoDocumentoEnum tipo : values()) {
            if (tipo.id.equals(id)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("No TipoDocumentoEnum found with id: ");
    }
}
