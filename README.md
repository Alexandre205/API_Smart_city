# Pour faire fonctionner le projet, écrire dans le terminal
Créez un fichier .env à la racine, basez vous sur .env.example

	docker compose up

# Commandes à lancer dans l'ordre pour faire du dev

## Télécharger les dépendances
	 npm i

## Lancer le docker
     npm run startDocker

## Initialiser la base de donnée Postgres
     npm run initDB

## Initialiser la base de donnée Redis
     npm run startRedis 

## Lancer le projet
    npm run dev



  

