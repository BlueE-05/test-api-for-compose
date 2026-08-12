import { EventCatalog } from "./EventCatalog";

export interface User {
  id: number;
  username: string;
  name: string;
  password: string; // hashed password
  role: string;
  events: number[]; // array of events associated with the user
}
