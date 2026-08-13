import { EventCatalog } from "./EventCatalog";

interface Data {
  displayName: string;
  dataType:
    | "TEXT"
    | "INTEGER"
    | "FLOAT"
    | "PHOTO"
    | "CORRAL"
    | "BOOLEAN"
    | "GANADO"
    | "SEXO"
    | "MOTIVO_CANAL"
    | "MOTIVO_VISCERA"
    | "CORRAL_SELECT";
  content: any;
}

export interface Event {
  id: number;
  eventTypeId: number;
  date: Date;
  description: string;
  animals?: string[];
  additionals: Data[];
}
