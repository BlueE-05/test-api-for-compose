import { Request, Response } from "express";
import { Event } from "../models/Event";
import { ServiceOrder } from "../models/ServiceOrder";
import { ServiceOrderService } from "../services/serviceOrders";

export const ServiceOrdersController = {
  async getAll(req: Request, res: Response): Promise<void> {
    const orders = await ServiceOrderService.getAll();
    res.status(200).json(orders);
  },

  async getEventsByServiceOrderId(
    req: Request,
    res: Response,
  ): Promise<Event[] | null> {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      res.status(400).json({
        message: "Invalid service order id.",
      });
      return null;
    }

    const events = await ServiceOrderService.getEventsByServiceOrderId(id);

    if (!events) {
      res.status(404).json({
        message: "Service order not found.",
      });
      return null;
    }

    res.status(200).json(events);
    return events;
  },

  // async createEventForServiceOrder(
  //   req: Request,
  //   res: Response,
  // ): Promise<SanityMessage> {
  //   const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  //   return
};
