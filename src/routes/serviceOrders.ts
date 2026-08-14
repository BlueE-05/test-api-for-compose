import { Router } from "express";
import { ServiceOrdersController } from "../controllers/serviceOrders";

const router = Router();

router.get("/", ServiceOrdersController.getAll);
router.get("/:id/events", ServiceOrdersController.getEventsByServiceOrderId);
router.post("/:id/events", ServiceOrdersController.createEventForServiceOrder);

export default router;
