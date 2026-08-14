import { EventCatalog } from "./EventCatalog";

type EventDataType =
  | "TEXT"
  | "INTEGER"
  | "FLOAT"
  | "NUMBER"
  | "PHOTO"
  | "CORRAL"
  | "BOOLEAN"
  | "GANADO"
  | "SEXO"
  | "MOTIVO_CANAL"
  | "MOTIVO_VISCERA"
  | "CORRAL_SELECT";

interface Data {
  displayName: string;
  dataType?: EventDataType;
  type?: EventDataType;
  content: any;
}

export interface Event {
  id: number;
  eventTypeId: number;
  date: Date;
  description: string;
  animals?: string[] | null;
  additionals: Data[];
}
