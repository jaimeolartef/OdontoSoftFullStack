
create database odontosoft;

\c odontosoft;

create table tipoDocumento
(
    id     serial,
    codigo varchar(10),
    nombre varchar(20),
    primary key (id)
);


CREATE TABLE menu
(
    id            serial             NOT NULL,
    descripcion   varchar(50)        NOT NULL,
    id_menu_padre int                NULL,
    url           varchar(100)       NULL,
    habilitado    bool DEFAULT false NOT NULL,
    CONSTRAINT menu_pkey PRIMARY KEY (id)
);

CREATE TABLE rol
(
    id          serial             NOT NULL,
    descripcion varchar(200)       NOT NULL,
    habilitado  bool DEFAULT false NOT NULL,
    CONSTRAINT rol_pkey PRIMARY KEY (id)
);

CREATE TABLE permiso_menu
(
    id         serial             NOT NULL,
    id_rol     int                NOT NULL,
    id_menu    int                NOT NULL,
    habilitado bool DEFAULT false NOT NULL,
    crear bool DEFAULT false not null,
    consultar bool DEFAULT false not null,
    eliminar bool DEFAULT false not null,
    editar bool default false not null,
    paciente bool,
    CONSTRAINT permiso_menu_pkey PRIMARY KEY (id),
    CONSTRAINT permiso_menu_id_menu FOREIGN KEY (id_menu) REFERENCES menu (id),
    CONSTRAINT permiso_menu_id_rol FOREIGN KEY (id_rol) REFERENCES menu (id)
);

CREATE TABLE usuario
(
    id         serial             NOT NULL,
    nombre     varchar(50)        NOT NULL,
    clave      text               NOT NULL,
    id_rol     int                NOT NULL,
    habilitado bool DEFAULT false NOT NULL,
    codigo     varchar(20)        NULL,
    correo varchar(200) NULL,
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
    idUsuarioCreacion     int                NOT NULL,
    fechaCreacion         date               NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool DEFAULT false NOT NULL,
    primary key (id),
    foreign key (idTipoDocumento) references tipoDocumento (id)
);

create table medico
(
    idMedico Serial,
    nombre   varchar(50),
    especialidad varchar(50),
    matricula varchar,
    idtipodocumento integer not null default 1,
    documento varchar(30),
    fechanacimiento date,
    direccionresidencia varchar(50),
    ciudadresidencia varchar(20),
    telefono varchar(20),
    correo varchar(50),
    primary key (idMedico),
    foreign key (idtipodocumento) references tipoDocumento (id)
);


create table cita
(
    id         SERIAL,
    fecha      DATE,
    horaInicio TIME,
    horaFin    TIME,
    idPaciente INT,
    idMedico   INT,
    fechaNotificacion DATE,
    motivoCancelacion VARCHAR(100),
    primary key (id),
    foreign key (idPaciente) references paciente (id),
    foreign key (idMedico) references medico (idMedico),
    habilitado bool DEFAULT false NOT NULL
);

create table consultorio
(
    idConsultorio Serial,
    nombre varchar(50),
    primary key (idConsultorio)
);

CREATE TABLE disponibilidad
(
    idDisponibilidad Serial,
    idMedico INT,
    dia INT,
    horaInicioAm TIME,
    horaFinAm TIME,
    horaInicioPm TIME,
    horaFinPm TIME,
    idConsultorio INT,
    mes INT NOT NULL,
    anio  INT NOT NULL,
    primary key (idDisponibilidad),
    foreign key (idMedico) references medico (idMedico)
);

create table historiaClinica
(
    id                        serial,
    idPaciente                int                   not null,
    motivoConsulta            varchar,
    enfermedadActual          varchar,
    ultimoMedicoTratante      varchar,
    observacionAntec          varchar,
    observacionAntecOdon      varchar,
    observacion               varchar,
    observacionAnaFunc        varchar,
    observacionExaEstomat     varchar,
    observacionOdontograma    varchar,
    observacionExaPeriodontal varchar,
    observacionAnalisisOclu   varchar,
    observacionAyudaDiag      varchar,
    idUsuarioCreacion         int                   NOT NULL,
    atmMusculatura            boolean DEFAULT false NOT NULL, -- normal: true anormal: false
    fechaCreacion             date                  NOT NULL,
    idUsuarioModificacion     int,
    fechaModificacion         date,
    habilitado                bool    DEFAULT false NOT NULL,
    primary key (id),
    foreign key (idPaciente) references paciente (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);

create table antecedente
(
    id           serial,
    descripcion  varchar,
    odontologico bool DEFAULT false NOT NULL,
    habilitado   bool DEFAULT false NOT NULL,
    primary key (id)
);

create table antecedentePaciente
(
    id                    serial,
    idHistoriaClinica     int                not null,
    idAntecedente         int,
    opciones              varchar,
    idUsuarioCreacion     int                NOT NULL,
    fechaCreacion         date               NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool DEFAULT false NOT NULL,
    primary key (id),
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idAntecedente) references antecedente (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);

create table habito
(
    id          serial,
    descripcion varchar,
    habilitado  bool DEFAULT false NOT NULL,
    primary key (id)
);

create table habitoPaciente
(
    id                    serial,
    idHistoriaClinica     int                not null,
    idHabito              int,
    opciones              boolean,
    idUsuarioCreacion     int                NOT NULL,
    fechaCreacion         date               NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool DEFAULT false NOT NULL,
    primary key (id),
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idHabito) references habito (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);

create table signoVital
(
    id                     serial,
    idHistoriaClinica      int                not null,
    peso                   float,
    talla                  float,
    temperatura            float,
    presionArterial        varchar,
    pulso                  float,
    frecuenciaRespiratoria float,
    idUsuarioCreacion      int                NOT NULL,
    fechaCreacion          date               NOT NULL,
    idUsuarioModificacion  int,
    fechaModificacion      date,
    habilitado             bool DEFAULT false NOT NULL,
    primary key (id),
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);

create table analisisFuncional
(
    id                    serial,
    idHistoriaClinica     int                   not null,
    masticacion           boolean DEFAULT false NOT NULL,
    deglucion             boolean DEFAULT false NOT NULL,
    fonacion              boolean DEFAULT false NOT NULL,
    respiracion           boolean DEFAULT false NOT NULL,
    idUsuarioCreacion     int                   NOT NULL,
    fechaCreacion         date                  NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool    DEFAULT false NOT NULL,
    primary key (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);

create table examenEstomatologico
(
    id                      serial,
    idHistoriaClinica       int,
    labioSuperior           boolean DEFAULT false NOT NULL,
    labioInferior           boolean DEFAULT false NOT NULL,
    comisura                boolean DEFAULT false NOT NULL,
    menton                  boolean DEFAULT false NOT NULL,
    frenillos               boolean DEFAULT false NOT NULL,
    surcosVestibulares      boolean DEFAULT false NOT NULL,
    carrilos                boolean DEFAULT false NOT NULL,
    procesosAlveolares      boolean DEFAULT false NOT NULL,
    regionFaringea          boolean DEFAULT false NOT NULL,
    paladarBlando           boolean DEFAULT false NOT NULL,
    paladarDuro             boolean DEFAULT false NOT NULL,
    pisoBoca                boolean DEFAULT false NOT NULL,
    dorsoLengua             boolean DEFAULT false NOT NULL,
    vientreLengua           boolean DEFAULT false NOT NULL,
    glandulasParotidas      boolean DEFAULT false NOT NULL,
    glandulasSublinguales   boolean DEFAULT false NOT NULL,
    glandulasSubmaxilares   boolean DEFAULT false NOT NULL,
    glandulasSalivaresMenor boolean DEFAULT false NOT NULL,
    maxilarSuperior         boolean DEFAULT false NOT NULL,
    maxilarInferior         boolean DEFAULT false NOT NULL,
    idUsuarioCreacion       int                   NOT NULL,
    fechaCreacion           date                  NOT NULL,
    idUsuarioModificacion   int,
    fechaModificacion       date,
    habilitado              bool    DEFAULT false NOT NULL,
    primary key (id),
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);

CREATE TABLE diente -- tabla para visualizar los dientes en el odontograma
(
    id           SERIAL PRIMARY KEY,
    dienteNumero INT          NOT NULL,
    descripcion  VARCHAR(100) NOT NULL
);

CREATE TABLE estadoDiente -- tabla para visualizar los estados de los dientes en el odontograma
(
    id          SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL,
    codigo varchar not null
);

CREATE TABLE tratamiento -- tabla para visualizar los tratamientos en el odontograma
(
    id          SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE odontograma
(
    id                    SERIAL PRIMARY KEY,
    idHistoriaClinica     int                not null,
    fecha                 DATE               NOT NULL,
    idUsuarioCreacion     int                NOT NULL,
    fechaCreacion         date               NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool DEFAULT false NOT NULL,
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);

CREATE TABLE detalleOdontograma
(
    id                    SERIAL PRIMARY KEY,
    idOdontograma         INT                NOT NULL,
    idDiente              INT                NOT NULL,
    idsegmento integer default 5 not null,
    idEstado              INT                NOT NULL,
    fechaTratamiento      DATE               NOT NULL,
    idUsuarioCreacion     int                NOT NULL,
    fechaCreacion         date               NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool DEFAULT false NOT NULL,
    FOREIGN KEY (idOdontograma) REFERENCES odontograma (id),
    FOREIGN KEY (idDiente) REFERENCES diente (id),
    FOREIGN KEY (idEstado) REFERENCES estadoDiente (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);


--tabla para visualizar los tipos de alteraciones en el odontograma
create table tipoAlteracion
(
    id          serial PRIMARY KEY,
    descripcion varchar(20) NOT NULL -- color, tamaño, forma, etc.
);


CREATE TABLE examenDental
(
    id                    SERIAL PRIMARY KEY,
    idHistoriaClinica     int                not null,
    fechaExamen           DATE,
    denticion             VARCHAR(20), -- decidua, mixta, permanente
    formArcoSuperior      VARCHAR(20), -- ovalado, cuadrado, triangular
    formArcoInferior      VARCHAR(20), -- ovalado, cuadrado, triangular
    simetriArcoSuperior   VARCHAR(20), -- simetrico, asimetrico, armonicos
    simetriArcoInferior   VARCHAR(20), -- simetrico, asimetrico, armonicos
    riesgoCaries          VARCHAR(20),
    idUsuarioCreacion     int                NOT NULL,
    fechaCreacion         date               NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool DEFAULT false NOT NULL,
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);

CREATE TABLE alteracionDental
(
    id               SERIAL PRIMARY KEY,
    idExamenDental   INTEGER not null,
    diente           INTEGER,
    idTipoAlteracion INTEGER not null,
    descripcion      VARCHAR(500),
    foreign key (idExamenDental) references examenDental (id),
    foreign key (idTipoAlteracion) references tipoAlteracion (id)
);

-- tabla para visualizar los cuadrantes en el odontograma
create table tipoCuadrante
(
    id          serial PRIMARY KEY,
    descripcion varchar(10) NOT NULL -- C.O.P.   C.E.O.
);


CREATE TABLE historiaCaries
(
    id                    SERIAL PRIMARY KEY,
    idHistoriaClinica     int                not null,
    fechaExamen           DATE,
    idTipoCuadrante       INTEGER,
    sanos                 INTEGER,
    cariados              INTEGER,
    obturados             INTEGER,
    perdidos              INTEGER,
    extraccionIndicada    INTEGER,
    idUsuarioCreacion     int                NOT NULL,
    fechaCreacion         date               NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool DEFAULT false NOT NULL,
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id),
    foreign key (idTipoCuadrante) references tipoCuadrante (id)
);


-- revisar esta tabla
CREATE TABLE examenPeriodontal
(
    id                    SERIAL PRIMARY KEY,
    idHistoriaClinica     int                not null,
    fechaExamen           DATE,
    diente                INTEGER,
    movilidad             BOOLEAN,
    bolsaVestibular       NUMERIC(3, 2),
    bolsaPalatal          NUMERIC(3, 2),
    puntoHemorragico      BOOLEAN,
    idUsuarioCreacion     int                NOT NULL,
    fechaCreacion         date               NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool DEFAULT false NOT NULL,
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);


CREATE TABLE analisisOclusion
(
    id                      SERIAL PRIMARY KEY,
    idHistoriaClinica       int                not null,
    fechaExamen             DATE,
    relacionMolarDerecha    varchar,
    relacionMolarIzquierda  varchar,
    relacionCaninaDerecha   varchar,
    relacionCaninaIzquierda varchar,
    sobremordidaHorizontal  NUMERIC(3, 2), -- Milimetros
    dientesAusentes         BOOLEAN,       --si: true no: false
    contactoInicialRc       BOOLEAN,
    sobremordidaVertical    NUMERIC(3, 2), -- Porcentaje
    soportePostAdecu        BOOLEAN,       --si: true no: false
    deflexionMandibular     BOOLEAN,       --si: true no: false
    idUsuarioCreacion       int                NOT NULL,
    fechaCreacion           date               NOT NULL,
    idUsuarioModificacion   int,
    fechaModificacion       date,
    habilitado              bool DEFAULT false NOT NULL,
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idHistoriaClinica) references historiaClinica (id)
);

CREATE TABLE tipoAcoplamientoDienteAnt -- tabla para visualizar los tipos de acoplamiento en el odontograma
(
    id          SERIAL PRIMARY KEY,
    descripcion varchar,
    habilitado  bool DEFAULT false NOT NULL
);

CREATE TABLE tipoContatoOclusalesMov -- tabla para visualizar los tipos de contacto oclusales en el odontograma
(
    id          SERIAL PRIMARY KEY,
    descripcion varchar,
    habilitado  bool DEFAULT false NOT NULL
);

CREATE TABLE acoplamientoDienteAnt
(
    id                    SERIAL PRIMARY KEY,
    idHistoriaClinica     int                   not null,
    fechaExamen           DATE,
    idTipoAcoplamiento    INTEGER,
    seleccion             boolean DEFAULT false NOT NULL,
    idUsuarioCreacion     int                   NOT NULL,
    fechaCreacion         date                  NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool    DEFAULT false NOT NULL,
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idTipoAcoplamiento) references tipoAcoplamientoDienteAnt (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);

CREATE TABLE contactoOclusalesMov
(
    id                    SERIAL PRIMARY KEY,
    idHistoriaClinica     int                   not null,
    fechaExamen           DATE,
    idTipoContacOcluMov   INTEGER, -- referencia de la tabla tipoContatoOclusalesMov
    seleccion             boolean DEFAULT false NOT NULL,
    cuales                varchar,
    idUsuarioCreacion     int                   NOT NULL,
    fechaCreacion         date                  NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    habilitado            bool    DEFAULT false NOT NULL,
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idTipoContacOcluMov) references TipoContatoOclusalesMov (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);

-- tabla para visualizar los tipos de diagnostico
CREATE TABLE tipoDiagnostico
(
    id          SERIAL PRIMARY KEY,
    codigo      varchar(10),
    descripcion varchar,
    habilitado  bool DEFAULT false NOT NULL
);

create table diagnostico
(
    id                    serial PRIMARY KEY,
    idHistoriaClinica     int                not null,
    idTipoDiagnostico     int                not null,
    idUsuarioCreacion     int                NOT NULL,
    fechaCreacion         date               NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    definitivo            bool DEFAULT false NOT NULL,
    habilitado            bool DEFAULT false NOT NULL,
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id),
    foreign key (idTipoDiagnostico) references tipoDiagnostico (id)
);

--listado de ayudas diagnosticas
CREATE TABLE tipoAyudaDiag
(
    id          SERIAL PRIMARY KEY,
    codigo      varchar(10),
    descripcion varchar,
    habilitado  bool DEFAULT false NOT NULL
);

CREATE TABLE ayudaDiagnostica
(
    id                    SERIAL PRIMARY KEY,
    idHistoriaClinica     int     not null,
    idTipoAyudaDiag       INTEGER not null,
    idUsuarioCreacion     int     NOT NULL,
    fechaCreacion         date    NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id),
    foreign key (idTipoAyudaDiag) references tipoAyudaDiag (id)
);

-- listado de tipos de tratamiento
CREATE TABLE tipoTratamiento
(
    id          SERIAL PRIMARY KEY,
    codigo      varchar(10),
    descripcion varchar,
    habilitado  bool DEFAULT false NOT NULL
);


CREATE TABLE planTratamiento
(
    id                    SERIAL PRIMARY KEY,
    idHistoriaClinica     int     not null,
    idTipoTratam       INTEGER not null,
    idUsuarioCreacion     int     NOT NULL,
    fechaCreacion         date    NOT NULL,
    idUsuarioModificacion int,
    fechaModificacion     date,
    foreign key (idHistoriaClinica) references historiaClinica (id),
    foreign key (idTipoTratam) references tipoTratamiento (id),
    foreign key (idUsuarioCreacion) references usuario (id),
    foreign key (idUsuarioModificacion) references usuario (id)
);


alter table public.acoplamientodienteant
    alter column fechaexamen type timestamp using fechaexamen::timestamp;

alter table public.acoplamientodienteant
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.acoplamientodienteant
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.analisisfuncional
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.analisisfuncional
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.analisisoclusion
    alter column fechaexamen type timestamp using fechaexamen::timestamp;

alter table public.analisisoclusion
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.analisisoclusion
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.antecedentepaciente
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.antecedentepaciente
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.ayudadiagnostica
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.ayudadiagnostica
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.contactooclusalesmov
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.contactooclusalesmov
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;


alter table public.detalleodontograma
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.detalleodontograma
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.diagnostico
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.diagnostico
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.examendental
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.examendental
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.examenestomatologico
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.examenestomatologico
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.examenperiodontal
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.examenperiodontal
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.historiacaries
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.historiacaries
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.odontograma
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.odontograma
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.plantratamiento
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.plantratamiento
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.signovital
    alter column fechacreacion type timestamp using fechacreacion::timestamp;

alter table public.signovital
    alter column fechamodificacion type timestamp using fechamodificacion::timestamp;

alter table public.contactooclusalesmov
    alter column fechaexamen type timestamp using fechaexamen::timestamp;

alter table public.detalleodontograma
    alter column fechatratamiento type timestamp using fechatratamiento::timestamp;

alter table public.examendental
    alter column fechaexamen type timestamp using fechaexamen::timestamp;


alter table public.examenperiodontal
    alter column fechaexamen type timestamp using fechaexamen::timestamp;

alter table public.historiacaries
    alter column fechaexamen type timestamp using fechaexamen::timestamp;

alter table public.odontograma
    alter column fecha type timestamp using fecha::timestamp;




INSERT INTO public.rol (id, descripcion, habilitado)
VALUES (DEFAULT, 'Administrador'::varchar(200), true::boolean);
INSERT INTO public.rol (id, descripcion, habilitado)
VALUES (DEFAULT, 'Paciente'::varchar(200), true::boolean);
insert into public.rol (id, descripcion, habilitado)
values (DEFAULT, 'Medico', true);


INSERT INTO public.usuario (id, nombre, clave, id_rol, habilitado, codigo)
VALUES (DEFAULT, 'admin'::varchar(50), 'daaad6e5604e8e17bd9f108d91e26afe6281dac8fda0091040a7a6d7bd9b43b5'::text, 1::integer, true::boolean, 'admin'::varchar(20));
insert into public.usuario (id, nombre, clave, id_rol, habilitado, codigo) values (2, 'Juan Perez', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 3, true, '12345678');

INSERT INTO public.menu (descripcion, habilitado, id_menu_padre, url)
values  ( 'Pacientes', true, null, null),
        ( 'Agenda', true, null, null),
        ( 'Configuración', true, null, null),
        ( 'Registrar paciente', true, 1, '/registroPac'),
        ( 'Asignación de citas', true, 2, '/asigCita'),
        ( 'Mi calendario', true, 2, '/calendario'),
        ( 'Roles', true, 3, '/role'),
        ( 'Usuarios', true, 3, '/usuario'),
        ( 'Consultar', true, 1, '/consultarPac'),
        ( 'Historia Clínica', true, 1, null),
        ( 'Cargue Calendario', true, 3, '/carguecalendario'),
        ( 'Cargue Calendario Masivo', true, 3, '/carguecalendariomasivo'),
        ( 'Agenda Medica', true, 2, '/agendaMedica'),
        ( 'Entidad Prestadora de Salud', true, 3, '/entidad');



INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (1, 1, 1, true, false, false, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (2, 1, 2, true, false, false, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (3, 1, 3, true, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (4, 1, 4, true, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (5, 1, 5, true, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (7, 1, 7, false, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (8, 1, 8, false, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (9, 2, 2, true, false, false, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (10, 1, 9, true, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (11, 2, 5, true, false, false, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (12, 2, 1, true, false, false, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (13, 2, 9, true, false, false, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (14, 1, 10, true, true, true, false, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (15, 3, 1, true, false, false, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (16, 3, 9, true, false, true, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (17, 3, 10, true, true, true, false, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (18, 2, 10, true, false, true, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (19, 4, 1, true, false, false, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (20, 4, 4, true, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (21, 4, 9, true, false, true, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (22, 4, 5, true, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (23, 4, 2, true, false, false, false, false);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (24, 1, 11, true, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (25, 1, 12, true, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (26, 3, 14, true, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (27, 1, 14, true, true, true, true, true);
INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (28, 3, 2, true, true, true, true, true);
--INSERT INTO public.permiso_menu (id, id_rol, id_menu, habilitado, crear, consultar, eliminar, editar) VALUES (29, 1, 15, true, true, true, true, true);

INSERT INTO public.tipodocumento(id, codigo, nombre)
VALUES (1, 'C.C.', 'Cédula de Ciudadanía');
INSERT INTO public.tipodocumento(id, codigo, nombre)
VALUES (2, 'C.E.', 'Cédula de Extranjerí');
INSERT INTO public.tipodocumento (id, codigo, nombre)
VALUES (3, 'T.I.', 'Tarjeta de Identidad');
INSERT INTO public.tipodocumento (id, codigo, nombre)
VALUES (4, 'R.C.', 'Registro Civil');
INSERT INTO public.tipodocumento (id, codigo, nombre)
VALUES (5, 'P.S', 'Pasaporte');



INSERT INTO public.diente (id, dientenumero, descripcion)
VALUES
    (11, 11, 'diente 11'),
    (12, 12, 'diente 12'),
    (13, 13, 'diente 13'),
    (14, 14, 'diente 14'),
    (15, 15, 'diente 15'),
    (16, 16, 'diente 16'),
    (17, 17, 'diente 17'),
    (18, 18, 'diente 18'),
    (21, 21, 'diente 21'),
    (22, 22, 'diente 22'),
    (23, 23, 'diente 23'),
    (24, 24, 'diente 24'),
    (25, 25, 'diente 25'),
    (26, 26, 'diente 26'),
    (27, 27, 'diente 27'),
    (28, 28, 'diente 28'),
    (41, 41, 'diente 41'),
    (42, 42, 'diente 42'),
    (43, 43, 'diente 43'),
    (44, 44, 'diente 44'),
    (45, 45, 'diente 45'),
    (46, 46, 'diente 46'),
    (47, 47, 'diente 47'),
    (48, 48, 'diente 48'),
    (31, 31, 'diente 31'),
    (32, 32, 'diente 32'),
    (33, 33, 'diente 33'),
    (34, 34, 'diente 34'),
    (35, 35, 'diente 35'),
    (36, 36, 'diente 36'),
    (37, 37, 'diente 37'),
    (38, 38, 'diente 38'),
    (51, 51, 'diente 51'),
    (52, 52, 'diente 52'),
    (53, 53, 'diente 53'),
    (54, 54, 'diente 54'),
    (55, 55, 'diente 55'),
    (61, 61, 'diente 61'),
    (62, 62, 'diente 62'),
    (63, 63, 'diente 63'),
    (64, 64, 'diente 64'),
    (65, 65, 'diente 65'),
    (71, 71, 'diente 71'),
    (72, 72, 'diente 72'),
    (73, 73, 'diente 73'),
    (74, 74, 'diente 74'),
    (75, 75, 'diente 75'),
    (81, 81, 'diente 81'),
    (82, 82, 'diente 82'),
    (83, 83, 'diente 83'),
    (84, 84, 'diente 84'),
    (85, 85, 'diente 85');



-- Auto-generated SQL script #202411161920
INSERT INTO public.estadodiente (descripcion,codigo)
VALUES ('Diente sano','DS');
INSERT INTO public.estadodiente (descripcion,codigo)
VALUES ('Caries o recurrencia','CR');
INSERT INTO public.estadodiente (descripcion,codigo)
VALUES ('Obturado','OB');
INSERT INTO public.estadodiente (descripcion,codigo)
VALUES ('Corona completa','CC');
INSERT INTO public.estadodiente (descripcion,codigo)
VALUES ('Prótesis existente','PE');
INSERT INTO public.estadodiente (descripcion,codigo)
VALUES ('Extracción Indicada','EI');
INSERT INTO public.estadodiente (descripcion,codigo)
VALUES ('Sin erupcionar','SE');
INSERT INTO public.estadodiente (descripcion,codigo)
VALUES ('Extraído','EX');
INSERT INTO public.estadodiente (descripcion,codigo)
VALUES ('Necesita endodoncia','NE');
INSERT INTO public.estadodiente (descripcion,codigo)
VALUES ('Con tratamiento de conductos','CT');

INSERT INTO public.antecedente
(id, descripcion, odontologico, habilitado)
VALUES(1, 'Sistema hemolinfatico: Anemia, desórdenes sanguíneos o problemas de coagulación. ', false, true);
INSERT INTO public.antecedente
(id, descripcion, odontologico, habilitado)
VALUES(2, 'Sistema nervioso: Dolores de cabeza, convulsiones, mareos, parálisis, trastornos mentales.', false, true);
INSERT INTO public.antecedente
(id, descripcion, odontologico, habilitado)
VALUES(3, '¿Ha sido sometido a tratamientos odontológicos previos?', true, true);
INSERT INTO public.antecedente
(id, descripcion, odontologico, habilitado)
VALUES(4, '¿Practica el cepillado diario?', true, true);

INSERT INTO public.habito
(id, descripcion, habilitado)
VALUES(1, 'Bruxismo', true);
INSERT INTO public.habito
(id, descripcion, habilitado)
VALUES(2, 'Alcohol', true);
INSERT INTO public.habito
(id, descripcion, habilitado)
VALUES(3, 'Lengua protráctil', true);
INSERT INTO public.habito
(id, descripcion, habilitado)
VALUES(4, 'Respiración bucal', true);

-- Auto-generated SQL script #202411161949
INSERT INTO public.tipodiagnostico (codigo,descripcion,habilitado)
VALUES ('K02','Caries dentales',true);
INSERT INTO public.tipodiagnostico (codigo,descripcion,habilitado)
VALUES ('K05.3','Periodontitis crónica',true);
INSERT INTO public.tipodiagnostico (codigo,descripcion,habilitado)
VALUES ('K05.4','Periodontitis aguda',true);
INSERT INTO public.tipodiagnostico (codigo,descripcion,habilitado)
VALUES ('K07.6','Maloclusión dentaria',true);

insert into public.tipoayudadiag (id, codigo, descripcion, habilitado)
values  (1, 'S025', 'Radiografía de aleta', true),
        (2, 'Z012', 'Radiografía Panorámica', true),
        (3, 'S032', 'Radiografía Cefálica Lateral', true),
        (4, 'S032', 'Radiografías Periapicales Serie Completa o Parcial:', true);


CREATE TABLE constantesistema
(
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    valor VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    habilitado BOOLEAN DEFAULT TRUE NOT NULL
);
CREATE TABLE ayudaDiagnosticaarchivo (
                                         id SERIAL PRIMARY KEY,
                                         archivocontenido BYTEA,
                                         archivonombre VARCHAR(255),
                                         archivotipo VARCHAR(100),
                                         archivotamano BIGINT,
                                         fechaCreacion date null
);

create table tipoentidad
(
    id          serial PRIMARY KEY,
    descripcion varchar(50) NOT NULL,
    habilitado  bool DEFAULT false NOT NULL
);

create table regimen
(
    id          serial PRIMARY KEY,
    descripcion varchar(50) NOT NULL,
    habilitado  bool DEFAULT false NOT NULL
);

CREATE TABLE entidadprestadorasalud
(
    id              SERIAL PRIMARY KEY,
    idtipodocumento INT not null,
    numerodocumento INT          NOT NULL,
    nombre          VARCHAR(255) NOT NULL,
    idtipoentidad     int          NOT NULL,
    codigoHabilitacionminsalud VARCHAR(50) NOT NULL,
    idregimenadministra int NOT NULL,
    direccion       VARCHAR(255),
    telefono        VARCHAR(50),
    sitioweb       VARCHAR(255),
    correo          VARCHAR(255),
    canalesatencion VARCHAR(255),
    habilitado  bool DEFAULT false NOT NULL,
    foreign key (idtipodocumento) references tipoDocumento (id),
    foreign key (idtipoentidad) references tipoentidad (id),
    foreign key (idregimenadministra) references regimen (id)
);

alter table entidadprestadorasalud add column habilitado  bool DEFAULT false NOT NULL;
alter table sedesempresa add column habilitado  bool DEFAULT false NOT NULL;


CREATE TABLE sedesempresa
(
    id       SERIAL PRIMARY KEY,
    idtipodocumento INT not null,
    numerodocumento INT          NOT NULL,
    nombre   VARCHAR(255) NOT NULL,
    identidadprestadora INT NOT NULL,
    direccion       VARCHAR(255),
    telefono        VARCHAR(50),
    correo          VARCHAR(255),
    canalesatencion VARCHAR(255),
    habilitado  bool DEFAULT false NOT NULL,
    foreign key (identidadprestadora) references entidadprestadorasalud (id)  -- Clave foránea
);

ALTER TABLE ayudadiagnostica
    ADD COLUMN idayudadiagnosticaarchivo INTEGER,
    ADD CONSTRAINT fk_ayuda_diagnostica_archivo FOREIGN KEY (idayudadiagnosticaarchivo) REFERENCES ayudaDiagnosticaarchivo (id);

-- Insertar la constante de duración de cita
INSERT INTO constantesistema (codigo, nombre, valor, descripcion)
VALUES ('DURACION_CITA', 'Duración cita', '30', 'Duración en minutos de una cita odontológica');

INSERT INTO public.tipoentidad (descripcion, habilitado) VALUES ('Privada', true);
INSERT INTO public.tipoentidad (descripcion, habilitado) VALUES ('Publica', true);

INSERT INTO public.regimen (descripcion, habilitado) VALUES ('Contributivo', true);
INSERT INTO public.regimen (descripcion, habilitado) VALUES ('Subsidiado', true);
INSERT INTO public.regimen (descripcion, habilitado) VALUES ('Especial', true);
INSERT INTO public.regimen (descripcion, habilitado) VALUES ('Excepción', true);
