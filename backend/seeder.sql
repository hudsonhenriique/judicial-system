DELETE FROM proceedings;
DELETE FROM processes;

ALTER SEQUENCE processes_id_seq RESTART WITH 1;
ALTER SEQUENCE proceedings_id_seq RESTART WITH 1;

INSERT INTO processes (number, date, description, client, lawyer, uf)
VALUES 
('2023.00001', '2023-01-01', 'Caso exemplo 1', 'Cliente A', 'Advogado A', 'MG'),
('2023.00002', '2023-01-10', 'Caso exemplo 2', 'Cliente B', 'Advogado B', 'SP'),
('2023.00003', '2023-01-15', 'Caso exemplo 3', 'Cliente C', 'Advogado C', 'RJ'),
('2023.00004', '2023-01-20', 'Caso exemplo 4', 'Cliente D', 'Advogado D', 'BA'),
('2023.00005', '2023-01-25', 'Caso exemplo 5', 'Cliente E', 'Advogado E', 'RS'),
('2023.00006', '2023-01-30', 'Caso exemplo 6', 'Cliente F', 'Advogado F', 'PR'),
('2023.00007', '2023-02-05', 'Caso exemplo 7', 'Cliente G', 'Advogado G', 'SC'),
('2023.00008', '2023-02-10', 'Caso exemplo 8', 'Cliente H', 'Advogado H', 'MG'),
('2023.00009', '2023-02-15', 'Caso exemplo 9', 'Cliente I', 'Advogado I', 'SP'),
('2023.00010', '2023-02-20', 'Caso exemplo 10', 'Cliente J', 'Advogado J', 'RJ');

INSERT INTO proceedings (date, description, process_id)
VALUES 
('2023-01-05', 'Audiência inicial', 1),
('2023-01-20', 'Segunda audiência', 2),
('2023-01-18', 'Terceira audiência', 3),
('2023-01-25', 'Quarta audiência', 4),
('2023-01-30', 'Quinta audiência', 5),
('2023-02-02', 'Sexta audiência', 6),
('2023-02-10', 'Sétima audiência', 7),
('2023-02-15', 'Oitava audiência', 8),
('2023-02-20', 'Nona audiência', 9),
('2023-02-25', 'Décima audiência', 10);
