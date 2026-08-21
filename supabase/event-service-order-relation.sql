-- Event needs this relation so events can be queried by service order.
alter table public."Event"
  add column if not exists "idServiceOrder" text;

alter table public."Event"
  drop constraint if exists event_service_order_fk;

alter table public."Event"
  add constraint event_service_order_fk
  foreign key ("idServiceOrder")
  references public."ServiceOrder" (id)
  on delete cascade;

create index if not exists event_service_order_idx
  on public."Event" ("idServiceOrder");