DROP DATABASE IF EXISTS db_productsbanners;
CREATE DATABASE IF NOT EXISTS db_productsbanners;
USE db_productsbanners;
DROP TABLE IF EXISTS clients;
CREATE TABLE IF NOT EXISTS clients(
    id INT AUTO_INCREMENT PRIMARY KEY,
    dniruc VARCHAR(255) UNIQUE,
    nombrers VARCHAR(255),
    direccion VARCHAR(255),
    telefono VARCHAR(255)    
);

-- Datos de prueba

INSERT INTO clients (dniruc, nombrers, direccion, telefono)
VALUES 
('46112246', 'Romario Ttito', 'Picchu', '966444218'),
('11223344', 'Aaaa Aaaa Aaaa', 'Daaa Daaa', '91111111'),
('22334455', 'Bbbb Bbbb Bbbb', 'Dbbb Dbbb', '92222222'),
('33445566', 'Ccccc Ccccc Ccccc', 'Dccc Dccc', '93333333'),
('44556677', 'Dddd Dddd Dddd', 'Dddd Dddd', '94444444'),
('55667788', 'Eeee Eeee Eeee', 'Deee Deee', '95555555'),
('66778899', 'Ffff Ffff Ffff', 'Dfff Dfff', '96666666'),
('77889900', 'Gggg Gggg Gggg', 'Dggg Dggg', '97777777'),
('46112247', 'Romario Ttito Accostupa', 'Comercial el Carmen', '966444218');


