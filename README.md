# stationnement-parc-relais-rennes












Ce script Python utilise les données ouvertes de Rennes Métropole pour afficher les informations sur les parcs relais à proximité, et aide les conducteurs à trouver la place de parking idéale. Les options incluent:

Voir le parc relais le plus proche qui est ouvert avec des places restantes
Voir l'ensemble des places restantes selon les parcs relais
Voir la probabilité de trouver une place dans un parc relais selon les heures
Voir quel parc relais peut accueillir du covoiturage
Voir quel parc relais peut accueillir des voitures électriques
Voir quel parc relais peut accueillir des personnes à mobilité réduite
Voir l'ensemble des données sur les parcs relais


Prérequis


Python 3.x
Le package pip requests
Le package pip json
Le package pip os
Le package pip colorama
Le package pip fake_useragent
Le package pip warnings



Utilisation


Dans l'invite de commande, naviguez jusqu'au répertoire du projet.
Entrez python parc_relais.py pour exécuter le script.
Sélectionnez l'une des options à partir du menu.
Suivez les instructions pour entrer les informations requises.


Exemples

Voici quelques exemples de la sortie de ce script:


"Voir l'ensemble des places restantes selon les parcs relais:


[2] Voir l'ensemble des places restantes selon les parcs relais

Enter option: 2

Préales
etat ouverture: OUVERT
etat remplissage: LIBRE
nb places solistes dispo: 88
nb places ve dispo: 6
nb places pmr dispo: 3
nb places covoiturage dispo: 10

Villejean Université
etat ouverture: OUVERT
etat remplissage: COMPLET
nb places solistes dispo: 0
nb places ve dispo: 0
nb places pmr dispo: 0
nb places covoiturage dispo: 0

Henri Fréville
etat ouverture: FERME"
