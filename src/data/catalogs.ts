import { Catalog } from "../models/Catalog";
import { EventCatalog } from "../models/EventCatalog";

/**
 * Catálogo de tipos de animales
 * Catálogo de tipos de servicios
 * Catálogo de tipos de eventos
 */

export const animalCatalog: Catalog[] = [
  { id: 1, displayName: "Vaca" },
  { id: 2, displayName: "Toro" },
  { id: 3, displayName: "Novillo" },
];

export const serviceCatalog: Catalog[] = [
  { id: 1, displayName: "Sacrificio" },
  { id: 2, displayName: "Sacrificio Kosher" },
  { id: 3, displayName: "Sacrificio Halal" },
  { id: 4, displayName: "Faenado" },
  { id: 5, displayName: "Limpieza de vísceras" },
];

export const eventCatalog: EventCatalog[] = [
  {
    id: 1,
    displayName: "Recepción de animales",
    isAnimalRequired: false,
    configExtra: [
      { displayName: "Fleje", dataType: "PHOTO" },
      { displayName: "Kilos de llegada", dataType: "NUMBER" },
      { displayName: "Animales recibidos", dataType: "NUMBER" },
      { displayName: "Sexo de animales recibidos", dataType: "TEXT" },
      { displayName: "Número de Corral Asignado", dataType: "NUMBER" },
    ],
  },
  {
    id: 2,
    displayName: "Recepción de documentos",
    isAnimalRequired: false,
    configExtra: [
      { displayName: "Guía REMO", dataType: "PHOTO" },
      { displayName: "Certificado Zoosanitario", dataType: "PHOTO" },
      { displayName: "Licencia Chofer", dataType: "PHOTO" },
      { displayName: "Placas Camión", dataType: "TEXT" },
    ],
  },
  {
    id: 3,
    displayName: "Animal caído",
    isAnimalRequired: true,
    configExtra: null,
  },
  {
    id: 4,
    displayName: "Decomiso",
    isAnimalRequired: true,
    configExtra: null,
  },
  {
    id: 5,
    displayName: "Animal atorado",
    isAnimalRequired: true,
    configExtra: null,
  },
  {
    id: 6,
    displayName: "Neonato",
    isAnimalRequired: true,
    configExtra: null,
  },
];

export const corralCatalog: Catalog[] = [
  { id: 1, displayName: "Corral 1" },
  { id: 2, displayName: "Corral 2" },
  { id: 3, displayName: "Corral 3" },
  { id: 4, displayName: "Corral 4" },
  { id: 5, displayName: "Corral 5" },
  { id: 6, displayName: "Corral 6" },
  { id: 7, displayName: "Corral 7" },
  { id: 8, displayName: "Corral 8" },
  { id: 9, displayName: "Corral 9" },
  { id: 10, displayName: "Corral 10" },
];
