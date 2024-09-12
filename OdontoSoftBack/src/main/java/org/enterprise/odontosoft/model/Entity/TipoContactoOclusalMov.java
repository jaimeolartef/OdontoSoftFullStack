package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tipocontatooclusalesmov")
public class TipoContactoOclusalMov {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('tipocontatooclusalesmov_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "habilitado", nullable = false)
    private Boolean habilitado = false;

    @OneToMany(mappedBy = "idtipocontacoclumov")
    private Set<ContactoOclusalesMov> contactooclusalesmovs = new LinkedHashSet<>();

}