DROP TABLE IF EXISTS Rol;

CREATE TABLE Rol (
	id_rol BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nombre_rol VARCHAR(100),
	editable BOOLEAN
);

DROP TABLE IF EXISTS Usuario;

CREATE TABLE Usuario (
	id_usuario BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	apellido VARCHAR(100) NOT NULL,
	correo VARCHAR(255) UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	habilitado BOOLEAN,
	id_rol BIGINT,

	CONSTRAINT 	fk_usuario_rol
	FOREIGN KEY (id_rol) REFERENCES Rol(id_rol)
);

DROP TABLE IF EXISTS Bitacora;

CREATE TABLE Bitacora (
	id_bitacora BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	tabla_nombre VARCHAR(100) NOT NULL,
	operacion VARCHAR(20) NOT NULL,
	registro_id VARCHAR(255) NOT NULL,
	volor_anterior JSONB NOT NULL,
	valor_nuevo JSONB NOT NULL,
	id_usuario BIGINT NOT NULL,
	creado_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT fk_bitacora_usuario
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);


DROP TABLE IF EXISTS Token_Recuperacion;

CREATE TABLE Token_Recuperacion (
	id_token BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	id_usuario BIGINT NOT NULL,
	token_ VARCHAR(6) NOT NULL,
	creado_at TIMESTAMP,

	CONSTRAINT fk_token_recuperacion_usuario
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

DROP TABLE IF EXISTS Permiso;

CREATE TABLE Permiso (
	id_permiso BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	descripcion TEXT,
	endpoint_url TEXT NOT NULL
);

DROP TABLE IF EXISTS Rol_Permiso;

CREATE TABLE Rol_Permiso (
	id_rol_permiso BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	id_rol BIGINT NOT NULL,
	id_permiso BIGINT NOT NULL,
	acceso BOOLEAN NOT NULL,
	modificacion BOOLEAN NOT NULL,
	eliminacion BOOLEAN NOT NULL,
	creacion BOOLEAN NOT NULL,
	
	CONSTRAINT fk_rol_permiso_rol
	FOREIGN KEY (id_rol) REFERENCES Rol(id_rol),
	
	CONSTRAINT fk_rol_permiso_permiso
	FOREIGN KEY (id_permiso) REFERENCES Permiso(id_permiso)
);

DROP TABLE IF EXISTS Categoria;

CREATE TABLE Categoria (
	id_categoria BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nombre_categoria VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS Tipo_Atributo;

CREATE TABLE Tipo_Atributo (
	id_tipo_atributo VARCHAR(30) PRIMARY KEY,
	descripcion TEXT NOT NULL
);

DROP TABLE IF EXISTS Atributo;

CREATE TABLE Atributo (
	id_atributo VARCHAR(30) PRIMARY KEY,
	id_tipo_atributo VARCHAR(30) NOT NULL,

	CONSTRAINT fk_atributo_tipo_atributo
	FOREIGN KEY (id_tipo_atributo) REFERENCES Tipo_Atributo(id_tipo_atributo)
);

DROP TABLE IF EXISTS Producto;

CREATE TABLE Producto (
	nombre_modelo VARCHAR(100) PRIMARY KEY,
	descripcion TEXT NOT NULL,
	dimensiones JSONB NOT NULL,
	habilitado BOOLEAN
);

DROP TABLE IF EXISTS Producto_X_Categoria;

CREATE TABLE Producto_X_Categoria (
	id_producto VARCHAR(100) NOT NULL,
	id_categoria BIGINT NOT NULL,

	
	CONSTRAINT pk_producto_categoria
	PRIMARY KEY (id_producto, id_categoria),
	
	CONSTRAINT fk_producto_categoria_producto
	FOREIGN KEY (id_producto) REFERENCES Producto(nombre_modelo),
	
	CONSTRAINT fk_producto_categoria_categoria
	FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);


DROP TABLE IF EXISTS Variacion;

CREATE TABLE Variacion (
	sku VARCHAR(255) PRIMARY KEY,
	nombre_variacion VARCHAR(100) NOT NULL,
	id_producto VARCHAR(100) NOT NULL,
	parametros_instaciacion JSONB NOT NULL,
	ruta_modelo_3d TEXT NOT NULL,
	precio NUMERIC(10,2),
	top_ BOOLEAN NOT NULL,
	habilitado BOOLEAN NOT NULL,

	CONSTRAINT fk_variacion_producto
	FOREIGN KEY (id_producto) REFERENCES Producto(nombre_modelo),

	CONSTRAINT ix_unique_nombre_variacion 
	UNIQUE (sku, nombre_variacion)
);

DROP TABLE IF EXISTS Miniatura;

CREATE TABLE Miniatura (
	id_miniatura BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	id_variacion VARCHAR(255) NOT NULL,
	url TEXT NOT NULL,
	top_ BOOLEAN NOT NULL,
	
	CONSTRAINT fk_miniatura_variacion
	FOREIGN KEY (id_variacion) REFERENCES Variacion(sku)
);

DROP TABLE IF EXISTS Variacion_X_Atributo;

CREATE TABLE Variacion_X_Atributo (
	id_variacion_atributo BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	id_variacion VARCHAR(255) NOT NULL,
	id_atributo VARCHAR(30) NOT NULL,
	valor_atributo VARCHAR(100) NOT NULL,

	CONSTRAINT fk_variacion_atributo_variacion
	FOREIGN KEY (id_variacion) REFERENCES Variacion(sku),
	
	CONSTRAINT fk_variacion_atributo_atributo
	FOREIGN KEY (id_atributo) REFERENCES Atributo(id_atributo)
);

DROP TABLE IF EXISTS Filtro_Producto;

CREATE TABLE Filtro_Producto (
	id_producto VARCHAR(100) NOT NULL,
	id_atributo VARCHAR(30) NOT NULL,
	
	CONSTRAINT pk_filtro_producto
	PRIMARY KEY (id_producto, id_atributo),
	
	CONSTRAINT fk_filtro_producto_producto
	FOREIGN KEY (id_producto) REFERENCES Producto(nombre_modelo),
	
	CONSTRAINT fk_filtro_producto_atributo
	FOREIGN KEY (id_atributo) REFERENCES Atributo(id_atributo)
);

DROP TABLE IF EXISTS Coleccion;

CREATE TABLE Coleccion (
	id_coleccion BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	id_usuario BIGINT NOT NULL,
	titulo_coleccion VARCHAR(100) NOT NULL,
	borrable BOOLEAN NOT NULL,
	
	CONSTRAINT fk_coleccion_usuario
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),

	CONSTRAINT ix_unique_usuario_coleccion 
	UNIQUE (id_usuario, titulo_coleccion)
);

DROP TABLE IF EXISTS Producto_X_Coleccion;

CREATE TABLE Producto_X_Coleccion (
	id_producto VARCHAR(100) NOT NULL,
	id_coleccion BIGINT NOT NULL,

	
	CONSTRAINT pk_producto_coleccion
	PRIMARY KEY (id_producto, id_coleccion),
	
	CONSTRAINT fk_producto_coleccion_producto
	FOREIGN KEY (id_producto) REFERENCES Producto(nombre_modelo),
	
	CONSTRAINT fk_producto_coleccion_coleccion
	FOREIGN KEY (id_coleccion) REFERENCES Coleccion(id_coleccion)
);

DROP TABLE IF EXISTS Metrica_Visualizacion;

CREATE TABLE Metrica_Visualizacion (
    id_metrica BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    sku_variacion VARCHAR(255) NOT NULL,
    duracion_segundos INT NOT NULL,
    dispositivo VARCHAR(50),-- 'Android', 'iOS'
    creado_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_metrica_usuario 
        FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) 
        ON DELETE SET NULL,
        
    CONSTRAINT fk_metrica_variacion 
        FOREIGN KEY (sku_variacion) REFERENCES Variacion(sku)
);

-- Índice para acelerar los reportes y filtros por fecha (Crucial para el Dashboard)
DROP INDEX IF EXISTS idx_metrica_fecha;
CREATE INDEX idx_metrica_fecha ON Metrica_Visualizacion(creado_at);