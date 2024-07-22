import requests
import json
import os
from colorama import init, Fore
from fake_useragent import UserAgent
import warnings

warnings.filterwarnings('ignore')

init(autoreset=True)


def parc_relais():
    if os.name == 'nt':
        os.system('cls')
    else:
        os.system('clear')
    

    print(Fore.GREEN +'\nParc relais: ')

    print(Fore.GREEN + '''
    [1] Voir le parc relais le plus proche qui est ouvert avec des places restantes	      
    [2] Voir l'ensemble des places restantes selon les parcs relais  
    [3] Voir la probabilité de trouver une place dans un parc relais selon les heures
    [4] Voir quel parc relais peut acceuillir du covoiturage 
    [5] Voir quel parc relais peut acceuillir des voitures électiques
    [6] Voir quel parc relais peut acceuillir des personnes à mobilitées réduites
    [7] Voir l'ensemble des données sur les parcs relais


    \n''')

    print(Fore.RED + '\n    [99] Main menu  [0] Exit \n')

    try:
        option = int(input('\nEnter option: '))
    except Exception:
        parc_relais()

    while option != 100:
        if option == 1:

            coordonnées_utilsateur_longitude = float(input("Entrer votre longitude"))
            coordonnées_utilsateur_latitude = float(input("Entrer votre latitude"))

            def distance_between_2_points():

                distance_préales = ((48.11356 - coordonnées_utilsateur_longitude) ** 2 + (
                        -1.64025 - coordonnées_utilsateur_latitude) ** 2) ** 0.5

                distance_Villejean_Universite = ((48.121906 - coordonnées_utilsateur_longitude) ** 2 + (
                        -1.704182 - coordonnées_utilsateur_latitude) ** 2) ** 0.5

                distance_henri_fréville = ((48.087537 - coordonnées_utilsateur_longitude) ** 2 + (
                        -1.674555 - coordonnées_utilsateur_latitude) ** 2) ** 0.5

                distance_poterie = ((48.08682 - coordonnées_utilsateur_longitude) ** 2 + (
                        -1.64342 - coordonnées_utilsateur_latitude) ** 2) ** 0.5

                distance_JFK = ((48.12108 - coordonnées_utilsateur_longitude) ** 2 + (
                        -1.713631 - coordonnées_utilsateur_latitude) ** 2) ** 0.5

                dict1 = {"distance_préales": distance_préales,
                         "distance_Villejean_Universite": distance_Villejean_Universite,
                         "distance_henri_fréville": distance_henri_fréville, "distance_poterie": distance_poterie,
                         "distance_JFK": distance_JFK}

                ua = UserAgent()
                user_agent = ua.random

                headers = {
                    'User-Agent': user_agent,
                    'pragma': 'no-cache',
                    'cache-control': 'no-cache',
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "en-US,en;q=0.9",
                    "DNT": "1",
                    "referer": "http://www.google.com/",
                    "origin": "http://www.google.com/",
                    'sec-ch-ua-mobile': '?0',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-user': '?1',
                    'sec-fetch-dest': 'document',
                    'Upgrade-Insecure-Requests': '1',
                    'sec-ch-ua': '" Not A;Brand";v="99", '
                                 '"Chromium";v="96", "Google '
                                 'Chrome";v="96"',
                    'connection': 'keep-alive'

                }



                parc_relais_data = requests.get(
                    'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=&rows=10&facet=idparc&facet=nom&facet=etatouverture&facet=etatremplissage', headers=headers,verify=False)

                writeFile = open('parc_relais_data.json', 'w')
                writeFile.write(str(parc_relais_data.text))
                writeFile.close()

                f = open('parc_relais_data.json')

                data = json.load(f)

                short = sorted(dict1.items(), key=lambda t: t[1])

                for parc_relais_nom in short:

                    parc_relais_nom2 = parc_relais_nom[0]

                    if parc_relais_nom2 == "distance_préales":
                        code_parc_relais = 0
                    if parc_relais_nom2 == "distance_Villejean_Universite":
                        code_parc_relais = 1
                    if parc_relais_nom2 == "distance_henri_fréville":
                        code_parc_relais = 2
                    if parc_relais_nom2 == "distance_poterie":
                        code_parc_relais = 3
                    if parc_relais_nom2 == "distance_JFK":
                        code_parc_relais = 4

                    print(data["records"][code_parc_relais]["fields"]["nom"])

                    if data["records"][code_parc_relais]["fields"]["etatouverture"] == "OUVERT":
                        print("etat ouverture: " + data["records"][code_parc_relais]["fields"]["etatouverture"])

                        if data["records"][code_parc_relais]["fields"]["etatremplissage"] == "LIBRE":
                            print("etat remplissage: " + data["records"][code_parc_relais]["fields"]["etatremplissage"])
                            print("nb places solistes dispo: " + str(
                                data["records"][code_parc_relais]["fields"]["nbplacessolistesdispo"]))
                            print("nb places ve dispo: " + str(
                                data["records"][code_parc_relais]["fields"]["nbplacesvedispo"]))
                            print("nb places pmr dispo: " + str(
                                data["records"][code_parc_relais]["fields"]["nbplacespmrdispo"]))
                            print("nb places covoiturage dispo: " + str(
                                data["records"][code_parc_relais]["fields"]["nbplacescovoituragedispo"]))

                            resultat = input(
                                "Est-ce que les résultats obtenus sur ce parking sont satisfesant? Si non alors nous chercherons pour le parc relais suivant les places (oui/non)")

                            if resultat == "oui":
                                break
                            else:
                                pass

                f.close()

            distance_between_2_points()
            print(Fore.GREEN + "program is over")
            parc_relais()

        if option == 2:

            def data_parc_relais():
                parc_relais_data = requests.get(
                    'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=&rows=10&facet=idparc&facet=nom&facet=etatouverture&facet=etatremplissage')

                writeFile = open('parc_relais_data.json', 'w')
                writeFile.write(str(parc_relais_data.text))
                writeFile.close()

                f = open('parc_relais_data.json')

                data = json.load(f)

                code_parc_relais = 0

                while code_parc_relais < 5:
                    print("_________________________\n")

                    print(data["records"][code_parc_relais]["fields"]["nom"])

                    print("\n")

                    print("etat ouverture :" + data["records"][code_parc_relais]["fields"]["etatouverture"])

                    print("etat remplissage :" + data["records"][code_parc_relais]["fields"]["etatremplissage"])
                    print("nb places solistes dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacessolistesdispo"]))
                    print("nb places ve dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacesvedispo"]))
                    print("nb places pmr dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacespmrdispo"]))
                    print("nb places covoiturage dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacescovoituragedispo"]))

                    code_parc_relais += 1

                f.close()

            data_parc_relais()
            print(Fore.GREEN + "program is over")
            parc_relais()

        if option == 3:
            print("ok")
            print(Fore.GREEN + "program is over")
            parc_relais()
        if option == 4:

            def covoiturage_parc_relais():
                parc_relais_data = requests.get(
                    'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=&rows=10&facet=idparc&facet=nom&facet=etatouverture&facet=etatremplissage')

                writeFile = open('parc_relais_data.json', 'w')
                writeFile.write(str(parc_relais_data.text))
                writeFile.close()

                f = open('parc_relais_data.json')

                data = json.load(f)

                code_parc_relais = 0

                while code_parc_relais < 5:
                    print("_________________________\n")

                    print(data["records"][code_parc_relais]["fields"]["nom"])

                    print("\n")

                    print("nb places covoiturage dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacescovoituragedispo"]))

                    print("capacitées places covoiturage : " + str(
                        data["records"][code_parc_relais]["fields"]["capacitecovoiturage"]))

                    code_parc_relais += 1

                f.close()

            covoiturage_parc_relais()
            print(Fore.GREEN + "program is over")
            parc_relais()

        if option == 5:

            def ve_parc_relais():
                parc_relais_data = requests.get(
                    'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=&rows=10&facet=idparc&facet=nom&facet=etatouverture&facet=etatremplissage')

                writeFile = open('parc_relais_data.json', 'w')
                writeFile.write(str(parc_relais_data.text))
                writeFile.close()

                f = open('parc_relais_data.json')

                data = json.load(f)

                code_parc_relais = 0

                while code_parc_relais < 5:
                    print("_________________________\n")

                    print(data["records"][code_parc_relais]["fields"]["nom"])

                    print("\n")

                    print("nb places voiture électrique dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacesvedispo"]))

                    print("capacitées places voiture électrique : " + str(
                       data["records"][code_parc_relais]["fields"]["capaciteve"]))

                    code_parc_relais += 1

                f.close()

            ve_parc_relais()
            print(Fore.GREEN + "program is over")
            parc_relais()

        if option == 6:

            def pmr_parc_relais():
                parc_relais_data = requests.get(
                    'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=&rows=10&facet=idparc&facet=nom&facet=etatouverture&facet=etatremplissage')

                writeFile = open('parc_relais_data.json', 'w')
                writeFile.write(str(parc_relais_data.text))
                writeFile.close()

                f = open('parc_relais_data.json')

                data = json.load(f)

                code_parc_relais = 0

                while code_parc_relais < 5:
                    print("_________________________\n")

                    print(data["records"][code_parc_relais]["fields"]["nom"])

                    print("\n")

                    print("nb places pmr dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacespmrdispo"]))

                    print("capacitées places pmr : " + str(
                        data["records"][code_parc_relais]["fields"]["capacitepmr"]))

                    code_parc_relais += 1

                f.close()

            pmr_parc_relais()
            print(Fore.GREEN + "program is over")
            parc_relais()

        if option == 7:

            def data_ensemble_parc_relais():
                parc_relais_data = requests.get(
                    'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=&rows=10&facet=idparc&facet=nom&facet=etatouverture&facet=etatremplissage')

                writeFile = open('parc_relais_data.json', 'w')
                writeFile.write(str(parc_relais_data.text))
                writeFile.close()

                f = open('parc_relais_data.json')

                data = json.load(f)

                code_parc_relais = 0

                while code_parc_relais < 5:
                    print("_________________________\n")

                    print(data["records"][code_parc_relais]["fields"]["nom"])
                    print("coordonées perc relais : " + str(data["records"][code_parc_relais]["fields"]["coordonnees"]))

                    print("\n")

                    print(
                        "état de remplissage : " + str(data["records"][code_parc_relais]["fields"]["etatremplissage"]))
                    print("état d'ouverture : " + str(data["records"][code_parc_relais]["fields"]["etatouverture"]))

                    print("capacitées places : " + str(data["records"][code_parc_relais]["fields"]["capaciteparking"]))

                    print("capacitées places solistes : " + str(
                        data["records"][code_parc_relais]["fields"]["capacitesoliste"]))
                    print("nombre places solistes dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacessolistesdispo"]))

                    print("capacitées places voiture électrique : " + str(
                        data["records"][code_parc_relais]["fields"]["capaciteve"]))
                    print("nombre places voiture électrique dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacesvedispo"]))

                    print("capacitées places pmr : " + str(data["records"][code_parc_relais]["fields"]["capacitepmr"]))
                    print("nombre places pmr dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacespmrdispo"]))

                    print("capacitées places covoiturage : " + str(
                        data["records"][code_parc_relais]["fields"]["capacitecovoiturage"]))
                    print("nombre places covoiturge dispo : " + str(
                        data["records"][code_parc_relais]["fields"]["nbplacescovoituragedispo"]))

                    print("capacitées places réservé aux services : " + str(
                        data["records"][code_parc_relais]["fields"]["capacitereserveservice"]))

                    code_parc_relais += 1

                f.close()

            data_ensemble_parc_relais()
            print(Fore.GREEN + "program is over")
            parc_relais()

        elif option == 99:
            parc_relais()
        elif option == 0:
            exit()


parc_relais()
