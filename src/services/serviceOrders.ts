import { Event } from "../models/Event";
import { ServiceOrder } from "../models/ServiceOrder";
import { requireSupabase, throwSupabaseError } from "./supabase";

const mapServiceOrder = (row: any, animalRows: any[]): ServiceOrder => ({
  id: row.id,
  idProgramacion: row.idProgramacion ?? row.id_programacion,
  clientName: row.clientName ?? row.client_name,
  description: row.description,
  arrivalDate: new Date(row.arrivalDate),
  status: row.status,
  animalBreakdown: animalRows.map((animal) => ({
    quantity: animal.quantity,
    displayName: animal.displayName ?? animal.display_name,
  })),
});

const mapEvent = (row: any): Event => ({
  id: Number(row.id),
  eventTypeId: Number(row.eventTypeId),
  date: new Date(row.date),
  description: row.description,
  animals: row.animals === null ? null : (row.animals ?? []),
  additionals: Array.isArray(row.additionals) ? row.additionals : [],
});

export const ServiceOrderService = {
  async getAll(): Promise<ServiceOrder[]> {
    const client = requireSupabase();
    const [
      { data: orders, error: ordersError },
      { data: animals, error: animalsError },
    ] = await Promise.all([
      client
        .from("ServiceOrder")
        .select("*")
        .order("arrivalDate", { ascending: false }),
      client.from("AnimalBreakdown").select("*").order("id"),
    ]);

    if (ordersError) throwSupabaseError(ordersError);
    if (animalsError) throwSupabaseError(animalsError);

    return (orders ?? []).map((order) =>
      mapServiceOrder(
        order,
        (animals ?? []).filter((animal) => animal.idServiceOrder === order.id),
      ),
    );
  },

  async getEventsByServiceOrderId(id: string): Promise<Event[] | null> {
    const client = requireSupabase();
    const { data: serviceOrder, error: serviceOrderError } = await client
      .from("ServiceOrder")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (serviceOrderError) throwSupabaseError(serviceOrderError);
    if (!serviceOrder) return null;

    const { data: eventRows, error: eventsError } = await client
      .from("Event")
      .select("*")
      .eq("idServiceOrder", id)
      .order("date", { ascending: true });

    if (eventsError) throwSupabaseError(eventsError);

    return (eventRows ?? []).map(mapEvent);
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
    const client = requireSupabase();
    const { data: serviceOrder, error: serviceOrderError } = await client
      .from("ServiceOrder")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (serviceOrderError) throwSupabaseError(serviceOrderError);
    if (!serviceOrder) return null;

    const { data: eventRow, error: eventError } = await client
      .from("Event")
      .insert({
        idServiceOrder: id,
        eventTypeId: Number(payload.eventTypeId),
        date: new Date(payload.date).toISOString().slice(0, 10),
        description: payload.description,
        animals:
          payload.animals === null
            ? null
            : Array.isArray(payload.animals)
              ? payload.animals
              : [],
        additionals: payload.additionals ?? [],
      })
      .select()
      .single();

    if (eventError) throwSupabaseError(eventError);

    return mapEvent(eventRow);
  },
};
