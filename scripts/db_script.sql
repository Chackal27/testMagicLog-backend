CREATE SEQUENCE public.users_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE users (
	id int DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
	email text,
	password text,
	role_id int,
	date_created timestamptz DEFAULT NOW(),
    date_updated timestamptz DEFAULT NOW() 
);

CREATE SEQUENCE public.role_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE roles (
	id int DEFAULT nextval('public.role_id_seq'::regclass) NOT NULL,
	type text,
	date_created timestamptz DEFAULT NOW(),
    date_updated timestamptz DEFAULT NOW() 
);

CREATE SEQUENCE public.products_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE products (
	id int DEFAULT nextval('public.products_id_seq'::regclass) NOT NULL,
	nombre text,
	sku text,
	cantidad int,
	user_id int,
	precio numeric,
	date_created timestamptz DEFAULT NOW(),
    date_updated timestamptz DEFAULT NOW() 
);

--ROLES
INSERT INTO roles (type) VALUES ('ADMINISTRADOR');
INSERT INTO roles (type) VALUES ('VENDEDOR');
INSERT INTO roles (type) VALUES ('CLIENTE');

--USERS
INSERT INTO users (email, password, role_id)
VALUES ('administrador@gmail.com', '$2b$10$Amf8inTlbiL7qnbvWV6KZOpXcCqxWzOMLl4XhN94c0x3JfsyJFtrq', 1);