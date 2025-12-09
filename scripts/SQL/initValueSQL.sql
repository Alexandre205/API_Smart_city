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
('2025-11-05 08:00:00', '2025-11-05 09:15:00', 'Place de Brouckère, Bruxelles', 'Gare de Liège-Guillemins, Liège', POINT(50.8503, 4.3517), POINT(50.6292, 5.5797), '1-ABC-123'),
('2025-11-06 07:30:00', '2025-11-06 08:45:00', 'Namur Centre, Namur', 'Place du Luxembourg, Bruxelles', POINT(50.4669, 4.8675), POINT(50.8371, 4.3676), '2-DEF-456'),
('2025-11-07 09:00:00', '2025-11-07 10:30:00', 'Mons Grand Place, Mons', 'Louvain-la-Neuve Gare, Ottignies', POINT(50.4541, 3.9567), POINT(50.6683, 4.6117), '1-GHI-789'),
('2025-11-05 18:00:00', '2025-11-05 19:15:00', 'Charleroi Sud, Charleroi', 'Namur Station, Namur', POINT(50.4114, 4.4445), POINT(50.4669, 4.8675), '2-JKL-321'),
('2025-11-08 06:45:00', '2025-11-08 08:15:00', 'Bruges Centre, Brugge', 'Gand Saint-Pierre, Gent', POINT(51.2093, 3.2247), POINT(51.0358, 3.7103), '1-MNO-654');

INSERT INTO demande (date_depart, date_arrivee, addresse_depart, addresse_arrivee, coordonnee_depart, coordonnee_arrivee, demandeur) VALUES
('2025-11-05 07:45:00', '2025-11-05 09:30:00', 'Place Flagey, Bruxelles', 'Gare de Liège-Guillemins, Liège', POINT(50.8261, 4.3737), POINT(50.6292, 5.5797), 2),
('2025-11-06 07:00:00', '2025-11-06 09:00:00', 'Namur Centre, Namur', 'Place du Luxembourg, Bruxelles', POINT(50.4669, 4.8675), POINT(50.8371, 4.3676), 3),
('2025-11-07 08:45:00', '2025-11-07 10:45:00', 'Mons Grand Place, Mons', 'Louvain-la-Neuve Gare, Ottignies', POINT(50.4541, 3.9567), POINT(50.6683, 4.6117), 4),
('2025-11-05 17:45:00', '2025-11-05 19:30:00', 'Charleroi Sud, Charleroi', 'Namur Station, Namur', POINT(50.4114, 4.4445), POINT(50.4669, 4.8675), 5),
('2025-11-08 06:30:00', '2025-11-08 08:30:00', 'Bruges Centre, Brugge', 'Gand Saint-Pierre, Gent', POINT(51.2093, 3.2247), POINT(51.0358, 3.7103), 1);

INSERT INTO passager (trajet, utilisateur_id) VALUES
(1, 2),
(1, 3),
(2, 4),
(3, 5),
(4, 1),
(5, 2);

INSERT INTO admin (email,mot_de_passe) VALUES
('admin@ouivraiment.com','$argon2id$v=19$m=65536,t=3,p=4$Mza3fdPrZ0R2yZpvRlOh1w$W1PyXinvrNsXigvyR91P8qcAr2tM8+Zsehf7pbluNbw');--adminpassword