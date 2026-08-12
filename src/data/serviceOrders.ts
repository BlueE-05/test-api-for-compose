import { ServiceOrder } from "../models/ServiceOrder";

export const serviceOrders: ServiceOrder[] = [
  // Orden 1
  {
    id: "1001",
    idProgramacion: "P-001",
    description:
      "Servicio de sacrificio de ganado bovino, empaquetado al vacío y cuarto frío",
    clientName: "Carnes Ramos",
    arrivalDate: new Date("2026-07-27"),
    status: "Procesando",
    animalBreakdown: [
      {
        quantity: 95,
        displayName: "vaca",
      },
    ],
    events: [1, 2, 3, 4],
  },
  // Orden 2
  {
    idProgramacion: "P-002",
    id: "1002",
    clientName: "Central de carnes",
    description: "Servicio de sacrificio kosher y cuarto frío",
    arrivalDate: new Date("2026-07-26"),
    animalBreakdown: [
      {
        quantity: 45,
        displayName: "toro",
      },
      {
        quantity: 29,
        displayName: "novillo",
      },
    ],
    status: "En camino",
    events: [5, 6],
  },
  // Orden 3
  {
    idProgramacion: "P-003",
    id: "1003",
    clientName: "Carnes del Norte",
    description:
      "Servicio de sacrificio de ganado bovino y empaquetado al vacío",
    arrivalDate: new Date("2026-07-26"),
    animalBreakdown: [
      {
        quantity: 30,
        displayName: "toro",
      },
      {
        quantity: 45,
        displayName: "novillo",
      },
    ],
    status: "En corral",
  },
];
