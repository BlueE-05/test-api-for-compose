import { Event } from "./Event";

interface AnimalBreakdown {
  quantity: number;
  displayName: string;
}

export interface ServiceOrder {
  id: string;
  idProgramacion: string;
  clientName: string;
  description: string;
  arrivalDate: Date;
  status: "En camino" | "Procesando" | "En corral";
  animalBreakdown: AnimalBreakdown[];
  events?: number[];
}
