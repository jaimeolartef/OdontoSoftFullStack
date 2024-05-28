create database odontosoft;

create table tipoDocumento
(
    id     serial,
    codigo varchar(10),
    nombre varchar(20),
    primary key (id)
);


CREATE TABLE menu
(
    id          serial            NOT NULL,
    descripcion varchar(50) NOT NULL,
    id_menu_padre int NULL,
    url varchar(100) NULL,
    habilitado  bool DEFAULT false NOT NULL,
    CONSTRAINT menu_pkey PRIMARY KEY (id)
);

CREATE TABLE rol
(
    id          serial            NOT NULL,
    descripcion varchar(200)       NOT NULL,
    habilitado  bool DEFAULT false NOT NULL,
    CONSTRAINT rol_pkey PRIMARY KEY (id)
);

CREATE TABLE permiso_menu
(
    id      serial NOT NULL,
    id_rol  int    NOT NULL,
    id_menu int    NOT NULL,
    CONSTRAINT permiso_menu_pkey PRIMARY KEY (id),
    CONSTRAINT permiso_menu_id_menu FOREIGN KEY (id_menu) REFERENCES menu (id),
    CONSTRAINT permiso_menu_id_rol FOREIGN KEY (id_rol) REFERENCES menu (id)
);

CREATE TABLE usuario
(
    id         serial            NOT NULL,
    nombre     varchar(50)        NOT NULL,
    clave      text               NOT NULL,
    id_rol     int               NOT NULL,
    habilitado bool DEFAULT false NOT NULL,
    codigo     varchar(20)        NULL,
    CONSTRAINT usuario_pkey PRIMARY KEY (id),
    CONSTRAINT usuario_id_rol FOREIGN KEY (id_rol) REFERENCES rol (id)
);

create table paciente
(
    id                    SERIAL,
    idTipoDocumento       INT,
    documento             VARCHAR(30),
    primerNombre          VARCHAR(20),
    segundoNombre         VARCHAR(20),
    primerApellido        VARCHAR(20),
    segundoApellido       VARCHAR(20),
    fechaNacimiento       DATE,
    ciudadNacimiento      varchar(20),
    genero                varchar(1),
    estadoCivil           varchar(20),
    direccionResidencia   varchar(50),
    ciudadResidencia      varchar(20),
    telefono              VARCHAR(20),
    correo                VARCHAR(50),
    nombreAcompanante     VARCHAR(50),
    parentescoAcompanante VARCHAR(20),
    telefonoAcompanante   VARCHAR(20),
    primary key (id),
    foreign key (idTipoDocumento) references tipoDocumento(id)
);

create table cita
(
    id         SERIAL,
    fecha      DATE,
    horaInicio TIME,
    horaFin    TIME,
    idPaciente INT,
    primary key (id),
    foreign key (idPaciente) references paciente (id)
);

create table historiaClinica
(
    id            serial,
    idPaciente    int,
    idUsuarioCreacion    int,
    fechaCreacion date,
    idUsuarioModificacion    int,
    fechaModificacion date,
    primary key (id),
    foreign key (idPaciente) references paciente (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);


INSERT INTO public.rol (id, descripcion, habilitado) VALUES (DEFAULT, 'Administrador'::varchar(200), true::boolean);
INSERT INTO public.rol (id, descripcion, habilitado) VALUES (DEFAULT, 'Paciente'::varchar(200), true::boolean);

INSERT INTO public.usuario (id, nombre, clave, id_rol, habilitado, codigo) VALUES (DEFAULT, 'jaime.olarte'::varchar(50), '1234'::text, 1::integer, true::boolean, 'jaime.olarte'::varchar(20));

INSERT INTO public.menu (id, descripcion, id_menu_padre, url, habilitado) VALUES (DEFAULT, 'Pacientes'::varchar(50),null, null, true::boolean);
INSERT INTO public.menu (id, descripcion, id_menu_padre, url, habilitado) VALUES (DEFAULT, 'Agenda'::varchar(50), null, null, true::boolean);
INSERT INTO public.menu (id, descripcion, id_menu_padre, url, habilitado) VALUES (DEFAULT, 'Configuración'::varchar(50), null, null, true::boolean);

INSERT INTO public.menu (id, descripcion, id_menu_padre, url, habilitado) VALUES (DEFAULT, 'Registrar'::varchar(50), 1::integer, null,  true::boolean);
INSERT INTO public.menu (id, descripcion, id_menu_padre, url, habilitado) VALUES (DEFAULT, 'Asignación de citas'::varchar(50), 2::integer, null,true::boolean);
INSERT INTO public.menu (id, descripcion, id_menu_padre, url, habilitado) VALUES (DEFAULT, 'Mi calendario'::varchar(50), 2::integer, null,true::boolean);
INSERT INTO public.menu (id, descripcion, id_menu_padre, url, habilitado) VALUES (DEFAULT, 'Roles'::varchar(50), 3::integer, null, true::boolean);
INSERT INTO public.menu (id, descripcion, id_menu_padre, url, habilitado) VALUES (DEFAULT, 'Usuarios'::varchar(50), 3::integer, null, true::boolean);

INSERT INTO public.permiso_menu (id, id_rol, id_menu) VALUES (DEFAULT, 1::integer, 1::integer);
INSERT INTO public.permiso_menu (id, id_rol, id_menu) VALUES (DEFAULT, 1::integer, 2::integer);
INSERT INTO public.permiso_menu (id, id_rol, id_menu) VALUES (DEFAULT, 1::integer, 3::integer);
INSERT INTO public.permiso_menu (id, id_rol, id_menu) VALUES (DEFAULT, 1::integer, 4::integer);
INSERT INTO public.permiso_menu (id, id_rol, id_menu) VALUES (DEFAULT, 1::integer, 5::integer);
INSERT INTO public.permiso_menu (id, id_rol, id_menu) VALUES (DEFAULT, 1::integer, 6::integer);
INSERT INTO public.permiso_menu (id, id_rol, id_menu) VALUES (DEFAULT, 1::integer, 7::integer);
INSERT INTO public.permiso_menu (id, id_rol, id_menu) VALUES (DEFAULT, 1::integer, 8::integer);
INSERT INTO public.permiso_menu (id, id_rol, id_menu) VALUES (DEFAULT, 2::integer, 2::integer);



