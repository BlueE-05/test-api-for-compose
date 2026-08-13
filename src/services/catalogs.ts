import { get } from "node:http";
import {
  animalCatalog,
  serviceCatalog,
  eventCatalog,
  corralCatalog,
  motivosVisceraCatalog,
  motivosCanalCatalog,
} from "../data/catalogs";

import { Catalog } from "../models/Catalog";
import { EventCatalog } from "../models/EventCatalog";

export const CatalogService = {
  // Animal Catalog
  async getAnimalCatalog(): Promise<Catalog[]> {
    return [...animalCatalog];
  },

  async getAnimalById(id: number): Promise<Catalog | undefined> {
    return animalCatalog.find((x) => x.id === id);
  },

  // Service Catalog
  async getServiceCatalog(): Promise<Catalog[]> {
    return [...serviceCatalog];
  },

  async getServiceById(id: number): Promise<Catalog | undefined> {
    return serviceCatalog.find((x) => x.id === id);
  },

  // Event Catalog
  async getEventCatalog(): Promise<EventCatalog[]> {
    return [...eventCatalog];
  },

  async getEventById(id: number): Promise<EventCatalog | undefined> {
    return eventCatalog.find((x) => x.id === id);
  },

  // Corral Catalog
  async getCorralCatalog(): Promise<Catalog[]> {
    return [...corralCatalog];
  },

  // Motivos Catalog
  async getMotivosCatalog(isCanal: boolean): Promise<Catalog[]> {
    return isCanal ? [...motivosCanalCatalog] : [...motivosVisceraCatalog];
  },
};
