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

  async createEventForServiceOrder(
    id: string,
    payload: {
      eventTypeId: number;
      date: string | Date;
      description: string;
      animals?: string[] | null;
      additionals: Array<{
        displayName: string;
        dataType?: string;
        type?: string;
        content: unknown;
      }>;
    },
  ): Promise<Event | null> {
    const serviceOrder = serviceOrders.find((x) => x.id === id);

    if (!serviceOrder) {
      return null;
    }

    const nextId = events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1;

    const createdEvent: Event = {
      id: nextId,
      eventTypeId: Number(payload.eventTypeId),
      date: new Date(payload.date),
      description: payload.description,
      animals:
        payload.animals === null ? null : Array.isArray(payload.animals) ? payload.animals : [],
      additionals: (payload.additionals ?? []).map((additional) => ({
        displayName: additional.displayName,
        dataType: (additional.dataType ?? additional.type) as any,
        type: (additional.type ?? additional.dataType) as any,
        content: additional.content,
      })),
    };

    events.push(createdEvent);
    serviceOrder.events = [...(serviceOrder.events ?? []), createdEvent.id];

    return createdEvent;
  },
};
