DELETE FROM proceedings;
DELETE FROM processes;

INSERT INTO processes (number, date, description, client, lawyer, uf)
VALUES 
('2023.00001', '2023-01-01', 'Fake case 1', 'Client A', 'Lawyer A', 'MG'),
('2023.00002', '2023-01-10', 'Fake case 2', 'Client B', 'Lawyer B', 'SP'),
('2023.00003', '2023-01-15', 'Fake case 3', 'Client C', 'Lawyer C', 'RJ'),
('2023.00004', '2023-01-20', 'Fake case 4', 'Client D', 'Lawyer D', 'BA'),
('2023.00005', '2023-01-25', 'Fake case 5', 'Client E', 'Lawyer E', 'RS'),
('2023.00006', '2023-01-30', 'Fake case 6', 'Client F', 'Lawyer F', 'PR'),
('2023.00007', '2023-02-05', 'Fake case 7', 'Client G', 'Lawyer G', 'SC'),
('2023.00008', '2023-02-10', 'Fake case 8', 'Client H', 'Lawyer H', 'MG'),
('2023.00009', '2023-02-15', 'Fake case 9', 'Client I', 'Lawyer I', 'SP'),
('2023.00010', '2023-02-20', 'Fake case 10', 'Client J', 'Lawyer J', 'RJ');

INSERT INTO proceedings (date, description, process_id)
VALUES 
('2023-01-05', 'Initial hearing', 1),
('2023-01-20', 'Second hearing', 2),
('2023-01-18', 'Third hearing', 3),
('2023-01-25', 'Fourth hearing', 4),
('2023-01-30', 'Fifth hearing', 5),
('2023-02-02', 'Sixth hearing', 6),
('2023-02-10', 'Seventh hearing', 7),
('2023-02-15', 'Eighth hearing', 8),
('2023-02-20', 'Ninth hearing', 9),
('2023-02-25', 'Tenth hearing', 10);
