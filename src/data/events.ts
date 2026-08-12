import { Event } from "../models/Event";

export const events: Event[] = [
  {
    id: 1,
    eventTypeId: 1,
    date: new Date("2026-07-26T08:30:00"),
    description: "Recepción de 50 animales",
    animals: [],
    additionals: [
      { displayName: "Fleje", dataType: "PHOTO", content: [1] },
      { displayName: "Kilos de llegada", dataType: "NUMBER", content: 1500 },
      { displayName: "Animales recibidos", dataType: "NUMBER", content: 100 },
      {
        displayName: "Sexo de animales recibidos",
        dataType: "TEXT",
        content: "Macho",
      },
      {
        displayName: "Corral Asignado",
        dataType: "CORRAL",
        content: [
          {
            corral: "B-2",
            qty: 50,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    eventTypeId: 2,
    date: new Date("2026-07-26T09:15:00"),
    description: "Recepción de documentos completos",
    animals: [],
    additionals: [
      {
        displayName: "Guía REMO",
        dataType: "PHOTO",
        content: [2],
      },
      {
        displayName: "Certificado Zoosanitario",
        dataType: "PHOTO",
        content: [3],
      },
      {
        displayName: "Licencia Chofer",
        dataType: "PHOTO",
        content: [4],
      },
      { displayName: "Placas Camión", dataType: "TEXT", content: "ABC-1234" },
    ],
  },
  {
    id: 3,
    eventTypeId: 3,
    date: new Date("2026-07-27T10:00:00"),
    description: "Animal caído",
    animals: ["C1", "C3"],
    additionals: [],
  },
  {
    id: 4,
    eventTypeId: 4,
    date: new Date("2026-07-27T11:20:00"),
    description: "Decomiso",
    animals: ["C25"],
    additionals: [],
  },
  {
    id: 5,
    eventTypeId: 5,
    date: new Date("2026-07-28T13:45:00"),
    description: "Animal atorado",
    animals: ["C66"],
    additionals: [],
  },
  {
    id: 6,
    eventTypeId: 6,
    date: new Date("2026-07-28T15:10:00"),
    description: "Neonato",
    animals: ["C8"],
    additionals: [],
  },
];
