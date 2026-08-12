import { Request, Response } from "express";
import { CatalogService } from "../services/catalogs";

/**
 * Helpers for sending catalog data in responses avoiding code duplication.
 *
 * @template T
 * @param res
 * @param getter
 */
async function sendCatalog<T>(res: Response, getter: () => Promise<T[]>) {
  const data = await getter();
  res.status(200).json(data);
}

async function sendCatalogItem<T>(
  req: Request,
  res: Response,
  getter: (id: number) => Promise<T | undefined>,
  entityName: string,
) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({
      message: "Invalid id.",
    });
    return;
  }

  const item = await getter(id);

  if (!item) {
    res.status(404).json({
      message: `${entityName} not found.`,
    });
    return;
  }

  res.status(200).json(item);
}

/**
 * CatalogController
 *
 * Controller for handling catalog-related requests for animals, services, and events.
 */
export const CatalogController = {
  getAnimals(req: Request, res: Response) {
    return sendCatalog(res, CatalogService.getAnimalCatalog);
  },

  getAnimal(req: Request, res: Response) {
    return sendCatalogItem(req, res, CatalogService.getAnimalById, "Animal");
  },

  getServices(req: Request, res: Response) {
    return sendCatalog(res, CatalogService.getServiceCatalog);
  },

  getService(req: Request, res: Response) {
    return sendCatalogItem(req, res, CatalogService.getServiceById, "Service");
  },

  getEvents(req: Request, res: Response) {
    return sendCatalog(res, CatalogService.getEventCatalog);
  },

  getEvent(req: Request, res: Response) {
    return sendCatalogItem(req, res, CatalogService.getEventById, "Event");
  },

  getCorrals(req: Request, res: Response) {
    return sendCatalog(res, CatalogService.getCorralCatalog);
  },
};
