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
DROP SEQUENCE IF EXISTS person_id_seq;
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
    vehicule VARCHAR NOT NULL REFERENCES vehicule(immatriculation) ON DELETE CASCADE 
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
    trajet INTEGER NOT NULL REFERENCES trajet(trajet_id) DELETE ON CASCADE,
    utilisateur_id INTEGER NOT NULL REFERENCES utilisateur(id) DELETE ON CASCADE
);
ALTER SEQUENCE passager_id_seq OWNED BY passager.passager_id;