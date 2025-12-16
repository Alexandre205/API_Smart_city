DROP TABLE IF EXISTS admin CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;
DROP SEQUENCE IF EXISTS person_id_seq; --utilisée par admin et utilisateur pour eviter les ids doublon lors de la connexion
CREATE SEQUENCE person_id_seq START 1 INCREMENT 1;
CREATE TABLE admin(
    id INTEGER PRIMARY KEY DEFAULT NEXTVAL('person_id_seq'),
    email VARCHAR NOT NULL UNIQUE,CHECK(email LIKE '%@%.%'),
    mot_de_passe VARCHAR NOT NULL
);

CREATE TABLE utilisateur(
    id INTEGER PRIMARY KEY DEFAULT NEXTVAL('person_id_seq'),
    nom VARCHAR NOT NULL,
    prenom VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,CHECK(email LIKE '%@%.%'),
    telephone VARCHAR NOT NULL,
    mot_de_passe VARCHAR NOT NULL
);



DROP TABLE IF EXISTS vehicule CASCADE;
DROP SEQUENCE IF EXISTS vehicule_id_seq;
CREATE SEQUENCE vehicule_id_seq START 1 INCREMENT 1;
CREATE TABLE vehicule(
    vehicule_id INTEGER PRIMARY KEY DEFAULT NEXTVAL('vehicule_id_seq'),
    immatriculation VARCHAR NOT NULL,
    nb_places_maximum INTEGER NOT NULL, CHECK(nb_places_maximum>0),
    utilisateur INTEGER NOT NULL REFERENCES utilisateur(id) ON DELETE CASCADE
);
ALTER SEQUENCE vehicule_id_seq OWNED BY vehicule.vehicule_id;



DROP TABLE IF EXISTS trajet CASCADE ;
DROP SEQUENCE IF EXISTS trajet_id_seq ;
CREATE SEQUENCE trajet_id_seq START 1 INCREMENT 1;
CREATE TABLE trajet (
    trajet_id INTEGER primary key DEFAULT NEXTVAL('trajet_id_seq'),
    date_depart TIMESTAMP NOT NULL,
    date_arrivee TIMESTAMP NOT NULL, CHECK(date_depart < date_arrivee),
    addresse_depart VARCHAR NOT NULL,
    addresse_arrivee VARCHAR NOT NULL,
    coordonnee_depart POINT NOT NULL,
    coordonnee_arrivee POINT NOT NULL,
    vehicule INTEGER NOT NULL REFERENCES vehicule(vehicule_id) ON DELETE CASCADE 

);
ALTER SEQUENCE trajet_id_seq OWNED BY trajet.trajet_id;



DROP TABLE IF EXISTS demande CASCADE;
DROP SEQUENCE IF EXISTS demande_id_seq;
CREATE SEQUENCE demande_id_seq START 1 INCREMENT 1;
CREATE TABLE demande (
    demande_id INTEGER primary key DEFAULT NEXTVAL('demande_id_seq'),
    date_depart TIMESTAMP NOT NULL,
    date_arrivee TIMESTAMP NOT NULL, CHECK(date_depart < date_arrivee),
    addresse_depart VARCHAR NOT NULL,
    addresse_arrivee VARCHAR NOT NULL,
    coordonnee_depart POINT NOT NULL,
    coordonnee_arrivee POINT NOT NULL,
    demandeur INTEGER NOT NULL REFERENCES utilisateur(id) ON DELETE CASCADE
);

ALTER SEQUENCE demande_id_seq OWNED BY demande.demande_id;



DROP TABLE IF EXISTS passager CASCADE;
DROP SEQUENCE IF EXISTS passager_id_seq;
CREATE SEQUENCE passager_id_seq START 1 INCREMENT 1;
CREATE TABLE passager (
    passager_id INTEGER PRIMARY KEY DEFAULT NEXTVAL('passager_id_seq'),
    trajet INTEGER NOT NULL REFERENCES trajet(trajet_id) ON DELETE CASCADE,
    utilisateur_id INTEGER NOT NULL REFERENCES utilisateur(id) ON DELETE CASCADE

);
ALTER SEQUENCE passager_id_seq OWNED BY passager.passager_id;

INSERT INTO utilisateur (nom, prenom, email, telephone, mot_de_passe) VALUES
('Dupont', 'Jean', 'jean.dupont@example.com', '+32470123456', '$argon2id$v=19$m=65536,t=3,p=4$Koo2euxHd8UTl1KOJB/XQQ$vzZxxpz71LlqX7cJKyAsrA76lzQj5h7Ak9X0ZZ3AsL8'),--mdp123
('Martin', 'Sophie', 'sophie.martin@example.com', '+32486111222', '$argon2id$v=19$m=65536,t=3,p=4$t2QL/tc5mAcFlV1SMgTOEw$WB6+rADi4T0ozGxeJizK8gimg+YRSlwpqaArSTkh3EI'),--azerty
('Lefevre', 'Luc', 'luc.lefevre@example.com', '+32478123456', '$argon2id$v=19$m=65536,t=3,p=4$JlAE9tgu5/g9dR3WprPOEg$UaGDrfUgMaqxAq4GDmZuE6pu+aU3wcjw59H6lRCAGGM'),--123456
('Lambert', 'Julie', 'julie.lambert@example.com', '+32495111222', '$argon2id$v=19$m=65536,t=3,p=4$yvrqi871ytr1zkeELBEKmw$eqL0h0aiDaM/rRZItCWyAj6GeerJMJT11eSHy3aHRh0'),--pass123
('Petit', 'Maxime', 'maxime.petit@example.com', '+32493123456', '$argon2id$v=19$m=65536,t=3,p=4$v9pukXDN4mtwCQ2+N3llaA$AM8o1sVVsUwjhRbjQujwHmY3P10QpBRXt3gp/5jp8iA');--motdepasse

INSERT INTO vehicule (immatriculation, nb_places_maximum, utilisateur) VALUES
('1-ABC-123', 5, 1),
('2-DEF-456', 4, 2),
('1-GHI-789', 7, 3),
('2-JKL-321', 5, 4),
('1-MNO-654', 2, 5);

INSERT INTO trajet (date_depart, date_arrivee, addresse_depart, addresse_arrivee, coordonnee_depart, coordonnee_arrivee, vehicule) VALUES
('2026-11-05 08:00:00', '2026-11-05 09:15:00', 'Bruxelles, Place de Brouckère', 'Liège, Gare de Liège-Guillemins', POINT(50.8503, 4.3517), POINT(50.6292, 5.5797), 1),
('2026-11-06 07:30:00', '2026-11-06 08:45:00', 'Namur, Namur Centre', 'Bruxelles, Place du Luxembourg', POINT(50.4669, 4.8675), POINT(50.8371, 4.3676), 2),
('2026-11-07 09:00:00', '2026-11-07 10:30:00', 'Mons, Mons Grand Place', 'Ottignies, Louvain-la-Neuve Gare', POINT(50.4541, 3.9567), POINT(50.6683, 4.6117), 3),
('2026-11-05 18:00:00', '2026-11-05 19:15:00', 'Charleroi, Charleroi Sud', 'Namur, Namur Station', POINT(50.4114, 4.4445), POINT(50.4669, 4.8675), 4),
('2026-11-08 06:45:00', '2026-11-08 08:15:00', 'Brugge, Bruges Centre', 'Gent, Gand Saint-Pierre', POINT(51.2093, 3.2247), POINT(51.0358, 3.7103), 5);

INSERT INTO demande (date_depart, date_arrivee, addresse_depart, addresse_arrivee, coordonnee_depart, coordonnee_arrivee, demandeur) VALUES
('2026-11-05 07:45:00', '2026-11-05 09:30:00', 'Bruxelles, Place Flagey', 'Liège, Gare de Liège-Guillemins', POINT(50.8261, 4.3737), POINT(50.6292, 5.5797), 2),
('2026-11-06 07:00:00', '2026-11-06 09:00:00', 'Namur, Namur Centre', 'Bruxelles, Place du Luxembourg', POINT(50.4669, 4.8675), POINT(50.8371, 4.3676), 3),
('2026-11-07 08:45:00', '2026-11-07 10:45:00', 'Mons, Mons Grand Place', 'Ottignies, Louvain-la-Neuve Gare', POINT(50.4541, 3.9567), POINT(50.6683, 4.6117), 4),
('2026-11-05 17:45:00', '2026-11-05 19:30:00', 'Charleroi, Charleroi Sud', 'Namur, Namur Station', POINT(50.4114, 4.4445), POINT(50.4669, 4.8675), 5),
('2026-11-08 06:30:00', '2026-11-08 08:30:00', 'Brugge, Bruges Centre', 'Gent, Gand Saint-Pierre', POINT(51.2093, 3.2247), POINT(51.0358, 3.7103), 1);


INSERT INTO passager (trajet, utilisateur_id) VALUES
(1, 2),
(1, 3),
(2, 4),
(3, 5),
(4, 1),
(5, 2);

INSERT INTO admin (email,mot_de_passe) VALUES
('admin@ouivraiment.com','$argon2id$v=19$m=65536,t=3,p=4$Mza3fdPrZ0R2yZpvRlOh1w$W1PyXinvrNsXigvyR91P8qcAr2tM8+Zsehf7pbluNbw');--adminpassword