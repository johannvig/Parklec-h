import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private rennesApiUrl = 'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=&rows=10&facet=idparc&facet=nom&facet=etatouverture&facet=etatremplissage';
  private nantesApiUrl = 'https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_parkings-publics-nantes-disponibilites/records?limit=20';
  private nantesRelayApiUrl = 'https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_parcs-relais-nantes-metropole-disponibilites/records?limit=20';
  private parisApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/places-disponibles-parkings-saemes@saemes/records?limit=20';
  private strasbourgApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/occupation-parkings-temps-reel@eurometrostrasbourg/records?limit=20';
  private marseilleApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/disponibilites-des-places-de-parkings@ampmetropole/records?limit=20';
  private toursApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/etat-des-parkings-temps-reel-effia-tours-metropole-val-de-loire@toursmetropole/records?limit=20';
  private dijonApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/dispo-parking@dijon-metropole/records?limit=20';
  private nimesApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/etat-des-parkings-en-temps-reel-ville-de-nimes@data-nimesmetropole-occitanie/records?limit=20';
  private toulouseApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/parkings-relais@toulouse-metropole/records?limit=20';
  private angersApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/parking-angers@angersloiremetropole/records?limit=20';
  private bordeauxApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/st_park_p@scnbdx/records?limit=20';
  private issyApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/park-indigo-disponibilite-temps-reel@issy-les-moulineaux/records?limit=20';
  private orleansApiUrl = 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/om-mobilite-parcs-stationnement@orleansmetropole/records?limit=20';

  constructor(private http: HttpClient) {}

  getRennesParkingData(): Observable<any> {
    return this.http.get<any>(this.rennesApiUrl);
  }

  getNantesParkingData(): Observable<any> {
    const parkingData$ = this.http.get<any>(this.nantesApiUrl);
    const relayData$ = this.http.get<any>(this.nantesRelayApiUrl);

    return forkJoin([parkingData$, relayData$]).pipe(
      map(([parkingData, relayData]) => {
        const combinedResults = [...parkingData.results, ...relayData.results];
        return { results: combinedResults };
      })
    );
  }

  getParisParkingData(): Observable<any> {
    return this.http.get<any>(this.parisApiUrl);
  }

  getStrasbourgParkingData(): Observable<any> {
    return this.http.get<any>(this.strasbourgApiUrl);
  }

  getMarseilleParkingData(): Observable<any> {
    return this.http.get<any>(this.marseilleApiUrl);
  }

  getToursParkingData(): Observable<any> {
    return this.http.get<any>(this.toursApiUrl);
  }

  getDijonParkingData(): Observable<any> {
    return this.http.get<any>(this.dijonApiUrl);
  }

  getNimesParkingData(): Observable<any> {
    return this.http.get<any>(this.nimesApiUrl);
  }

  getToulouseParkingData(): Observable<any> {
    return this.http.get<any>(this.toulouseApiUrl);
  }

  getAngersParkingData(): Observable<any> {
    return this.http.get<any>(this.angersApiUrl);
  }

  getBordeauxParkingData(): Observable<any> {
    return this.http.get<any>(this.bordeauxApiUrl);
  }

  getIssyParkingData(): Observable<any> {
    return this.http.get<any>(this.issyApiUrl);
  }

  getOrleansParkingData(): Observable<any> {
    return this.http.get<any>(this.orleansApiUrl);
  }

  getAllParkingData(city: string): Observable<any> {
    switch (city) {
      case 'rennes':
      return this.getRennesParkingData().pipe(
        map(data => data.records.map((record: any) => ({
          name: record.fields.nom,
          location: `${record.fields.coordonnees[0]}, ${record.fields.coordonnees[1]}`,
          spaces: record.fields.jrdinfosoliste + record.fields.jrdinfocovoiturage + record.fields.jrdinfopmr,
          state: record.fields.etatouverture,
          totalSpaces: record.fields.capaciteparking,
          occupiedSpaces: record.fields.capaciteparking - (record.fields.jrdinfosoliste + record.fields.jrdinfocovoiturage + record.fields.jrdinfopmr + record.fields.jrdinfoelectrique),
          soloistSpaces: record.fields.jrdinfosoliste,
          pmrSpaces: record.fields.jrdinfopmr,
          veSpaces: record.fields.jrdinfoelectrique,
          carpoolSpaces: record.fields.jrdinfocovoiturage,
          bikeSpaces: record.fields.capacitecovoiturage, 
          openingHours: '6h30 - 22h30 en semaine, 8h - 19h le dimanche' 
        })))
      );
      case 'nantes':
      return this.getNantesParkingData().pipe(
        map(data => data.results.map((record: any) => ({
          name: record.grp_nom,
          location: record.location ? `${record.location.lat}, ${record.location.lon}` : 'Unknown location',
          spaces: record.grp_disponible,
          totalSpaces: record.grp_exploitation,
          occupiedSpaces: record.grp_exploitation - record.grp_disponible,
          state: record.grp_statut === 5 ? 'OUVERT' : 'FERME',
          openingHours: 'Unknown hours' 
        })))
      );
      case 'paris':
        return this.getParisParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.nom_parking,
            location: record.geo ? `${record.geo.lat}, ${record.geo.lon}` : 'Unknown location',
            spaces: record.counterfreeplaces,
            totalSpaces: null, // Assuming total spaces are not provided, adjust if available
            occupiedSpaces: null, // Assuming occupied spaces are not provided, adjust if available
            state: 'OUVERT', // Assuming state is not provided, adjust if available
            openingHours: record.horaires_d_acces_au_public_pour_les_usagers_non_abonnes
          })))
        );
      case 'strasbourg':
        return this.getStrasbourgParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.nom_parking,
            spaces: record.libre,
            totalSpaces: record.total,
            occupiedSpaces: record.total - record.libre,
            state: record.etat_descriptif,
            openingHours: 'Unknown hours' // Replace with actual hours if available
          })))
        );
      case 'marseille':
        return this.getMarseilleParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.nom,
            location: `${record.latitude}, ${record.longitude}`,
            spaces: record.voitureplacesdisponibles,
            totalSpaces: record.voitureplacescapacite,
            occupiedSpaces: record.voitureplacescapacite ? (record.voitureplacescapacite - record.voitureplacesdisponibles) : null,
            state: record.etat ? (record.etat === 1 ? 'OUVERT' : 'FERME') : 'Unknown',
            openingHours: 'Unknown hours' // Replace with actual hours if available
          })))
        );
      case 'tours':
        return this.getToursParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.full_name,
            location: `${record.geo_coordinates.lat}, ${record.geo_coordinates.lon}`,
            spaces: record.places_libres,
            totalSpaces: record.exploitation,
            occupiedSpaces: record.places_occupees,
            state: record.etat === 5 ? 'OUVERT' : 'FERME',
            openingHours: record.opening_hours
          })))
        );
      case 'dijon':
        return this.getDijonParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.nom_parking,
            location: `${record.geo_point_2d.lat}, ${record.geo_point_2d.lon}`,
            spaces: record.nombre_places_libres,
            totalSpaces: record.nombre_de_places_totales,
            occupiedSpaces: record.nombre_de_places_totales - record.nombre_places_libres,
            pmrSpaces: record.places_pmr,
            motoSpaces: record.aires_de_moto,
            veSpaces: record.places_vehicules_electriques,
            bikeSpaces: record.emplacement_cycles,
            state: record.taux_doccupation < 100 ? 'OUVERT' : 'FERME',
            openingHours: record.duree_stationnement,
            presenceToilets: record.presence_de_toilettes,
            presenceElevators: record.presence_ascenseurs,
            address: record.adresse
          })))
        );
      case 'nimes':
        return this.getNimesParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.name,
            location: `${record.coordinate.lat}, ${record.coordinate.lon}`,
            spaces: record.freespots,
            totalSpaces: record.totalparkingspaces,
            occupiedSpaces: record.totalparkingspaces - record.freespots,
            pmrSpaces: record.disabledaccess ? 'Oui' : 'Non',
            veSpaces: record.services && record.services.includes('Services_Electric_Charging') ? 'Oui' : 'Non',
            openingHours: record.open247 ? '24h/24' : record.openinghours,
            address: `${record.address_street}, ${record.address_city}, ${record.address_zipcode}`,
            rates: record.prices,
          })))
        );
      case 'toulouse':
        return this.getToulouseParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.nom,
            location: `${record.geo_point_2d.lat}, ${record.geo_point_2d.lon}`,
            spaces: record.nb_voitures,
            totalSpaces: record.nb_places,
            pmrSpaces: record.nb_pmr,
            veSpaces: record.nb_voitures_electriques,
            bikeSpaces: record.nb_velo,
            openingHours: '24h/24',
            rates: 'Gratuit',
          })))
        );
      case 'angers':
        return this.getAngersParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.nom,
            spaces: record.disponible
          })))
        );
      case 'bordeaux':
        return this.getBordeauxParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.nom,
            location: `${record.geo_point_2d.lat}, ${record.geo_point_2d.lon}`,
            spaces: record.libres,
            totalSpaces: record.np_global,
            pmrSpaces: record.np_pmr,
            veSpaces: record.np_velec,
            bikeSpaces: record.np_veltot,
            openingHours: '24h/24',
            rates: record.ta_type,
          })))
        );
      case 'issy':
        return this.getIssyParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.name,
            location: `${record.geo.lat}, ${record.geo.lon}`,
            spaces: record.value_free_spots
          })))
        );
      case 'orleans':
        return this.getOrleansParkingData().pipe(
          map(data => data.results.map((record: any) => ({
            name: record.nom,
            location: `${record.geo.lat}, ${record.geo.lon}`,
            spaces: record.nb_places_disponibles,
            totalSpaces: record.nb_places,
            pmrSpaces: record.nb_pmr,
            veSpaces: record.nb_voitures_electriques,
            bikeSpaces: record.nb_velo,
            openingHours: '24h/24',
            rates: record.tarif_pmr || 'N/A',
          })))
        );
      default:
        return new Observable<any>();
    }
  }
}
