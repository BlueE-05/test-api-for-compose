import { Router } from "express";
import { CatalogController } from "../controllers/catalogs";

const router = Router();

router.get("/animals", CatalogController.getAnimals);
router.get("/animals/:id", CatalogController.getAnimal);

router.get("/services", CatalogController.getServices);
router.get("/services/:id", CatalogController.getService);

router.get("/events", CatalogController.getEvents);
router.get("/events/:id", CatalogController.getEvent);

router.get("/corrals", CatalogController.getCorrals);

router.get("/motivos/canal", CatalogController.getMotivos);
router.get("/motivos/viscera", CatalogController.getMotivos);

export default router;
