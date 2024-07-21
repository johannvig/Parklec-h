export interface Parking {
  name: string;
  location: string;
  spaces: number;
  state: string;
  totalSpaces: number;
  occupiedSpaces: number;
  soloistSpaces: number;
  pmrSpaces: number;
  veSpaces: number;
  carpoolSpaces: number;
  bikeSpaces: number;
  openingHours: string;
  motoSpaces: number;
  presenceToilets:any;
  presenceElevators:any;
  position?: { lat: number; lng: number };
  distance?: number | null;
}
