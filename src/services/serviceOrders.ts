import { Event } from "../models/Event";
import { ServiceOrder } from "../models/ServiceOrder";
import { serviceOrders } from "../data/serviceOrders";
import { events } from "../data/events";

export const ServiceOrderService = {
  async getAll(): Promise<ServiceOrder[]> {
    return serviceOrders;
  },

  async getEventsByServiceOrderId(id: string): Promise<Event[] | null> {
    const serviceOrder = serviceOrders.find((x) => x.id === id);

    if (!serviceOrder?.events?.length) {
      return null;
    }

    return serviceOrder.events
      .map((eventId) => events.find((event) => event.id === eventId))
      .filter((event): event is Event => Boolean(event));
  },
};
