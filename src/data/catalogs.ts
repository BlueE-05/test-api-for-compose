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

export const classCatalog: Catalog[] = [
  { id: 1, displayName: "Choice" },
  { id: 2, displayName: "Select" },
  { id: 3, displayName: "Buena" },
];

export const serviceCatalog: Catalog[] = [
  { id: 1, displayName: "Sacrificio" },
  { id: 2, displayName: "Sacrificio Kosher" },
  { id: 3, displayName: "Sacrificio Halal" },
  { id: 4, displayName: "Faenado" },
  { id: 5, displayName: "Limpieza de vísceras" },
];

export const motivosCanalCatalog: Catalog[] = [
  { id: 1, displayName: "Tuberculosis" },
  { id: 2, displayName: "Residuos de medicamentos" },
  { id: 3, displayName: "Parasitosis" },
  { id: 4, displayName: "Contaminación" },
];

export const motivosVisceraCatalog: Catalog[] = [
  { id: 1, displayName: "Neumonía" },
  { id: 2, displayName: "Parásitos" },
  { id: 3, displayName: "Abscesos" },
  { id: 4, displayName: "Adherencias" },
  { id: 5, displayName: "Hepatitis" },
  { id: 6, displayName: "Contaminación" },
  { id: 7, displayName: "Necrosis" },
  { id: 8, displayName: "Úlceras" },
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

export const eventCatalog: EventCatalog[] = [
  {
    id: 1,
    displayName: "Recepción de documentos",
    isAnimalRequired: false,
    configExtra: [
      { displayName: "Guía REMO", dataType: "PHOTO" },
      { displayName: "Certificado Zoosanitario", dataType: "PHOTO" },
      { displayName: "Licencia Chofer", dataType: "PHOTO" },
      { displayName: "Placas Camión", dataType: "PHOTO" },
      { displayName: "Certificado Buenas prácticas", dataType: "PHOTO" },
    ],
  },
  {
    id: 2,
    displayName: "Recepción de animales",
    isAnimalRequired: false,
    configExtra: [
      { displayName: "Animales recibidos", dataType: "ANIMAL_SELECT" },
      { displayName: "Sexo de animales recibidos", dataType: "SEXO" },
      { displayName: "Condiciones de llegada", dataType: "PHOTO" },
      { displayName: "Peso de salida del rancho origen", dataType: "FLOAT" },
      { displayName: "Hora de salida del rancho origen", dataType: "TIME" },
      { displayName: "Kilos de llegada", dataType: "FLOAT" },
      { displayName: "Fleje", dataType: "PHOTO" },
      { displayName: "Corral Asignado", dataType: "CORRAL" },
      { displayName: "Foto animales en corral", dataType: "PHOTO" },
    ],
  },
  {
    id: 3,
    displayName: "Animal caído en jaula",
    isAnimalRequired: true,
    configExtra: [{ displayName: "Foto animal", dataType: "PHOTO" }],
  },
  {
    id: 4,
    displayName: "Desviación",
    isAnimalRequired: false,
    configExtra: [{ displayName: "Evidencias", dataType: "PHOTO" }],
  },
  {
    id: 5,
    displayName: "Animal caído en corral",
    isAnimalRequired: true,
    configExtra: [{ displayName: "Foto animal", dataType: "PHOTO" }],
  },
  {
    id: 6,
    displayName: "Decomiso de canal",
    isAnimalRequired: true, //Consecutivo
    configExtra: [
      { displayName: "Motivo", dataType: "MOTIVO_CANAL" },
      { displayName: "Foto producto", dataType: "PHOTO" },
    ],
  },
  {
    id: 7,
    displayName: "Decomiso de viscera",
    isAnimalRequired: true, //Consecutivo
    configExtra: [
      { displayName: "Motivo", dataType: "MOTIVO_VISCERA" },
      { displayName: "Cantidad de piezas", dataType: "INTEGER" },
      { displayName: "Peso decomisado", dataType: "FLOAT" },
      { displayName: "Foto producto", dataType: "PHOTO" },
    ],
  },
  {
    id: 8,
    displayName: "Eventualidad en estancia",
    isAnimalRequired: true,
    configExtra: [{ displayName: "Corral", dataType: "CORRAL_SELECT" }], //Checar
  },
  {
    id: 9,
    displayName: "Parto",
    isAnimalRequired: false,
    configExtra: null,
  },
  {
    id: 10,
    displayName: "Embarque",
    isAnimalRequired: false,
    configExtra: [
      { displayName: "Placas camión de salida", dataType: "PHOTO" },
      { displayName: "Temperatura de la unidad", dataType: "FLOAT" },
    ],
  },
  {
    id: 11,
    displayName: "Desviaciones de embarque",
    isAnimalRequired: false,
    configExtra: [{ displayName: "Evidencias", dataType: "PHOTO" }],
  },
];
