import { User } from "../models/User";
import { eventCatalog } from "./catalogs";

export const users: User[] = [
  {
    id: 1,
    username: "admin",
    name: "Mary Sue",
    //password: "111",
    password:
      "f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae",
    role: "Administrador",
    events: eventCatalog.map((event) => event.id),
  },
  {
    id: 2,
    username: "entrada",
    name: "John Doe",
    password:
      "f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae",
    role: "Portero",
    events: [1],
  },
  {
    id: 3,
    username: "linea",
    name: "Laura Jefyllish",
    password:
      "f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae",
    role: "Operador de línea",
    events: eventCatalog
      .filter((event) => event.id !== 1)
      .map((event) => event.id),
  },
  {
    id: 4,
    username: "j_perez",
    name: "José Pérez",
    password:
      "f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae",
    role: "Operador de línea",
    events: eventCatalog
      .filter((event) => event.id !== 1)
      .map((event) => event.id),
  },
];
