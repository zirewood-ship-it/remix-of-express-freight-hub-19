
CREATE TABLE public.shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number text NOT NULL UNIQUE,
  sender_company text NOT NULL,
  receiver_company text NOT NULL,
  origin text NOT NULL,
  destination text NOT NULL,
  is_overseas boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'Booked',
  weight_kg numeric NOT NULL DEFAULT 0,
  estimated_delivery date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id uuid NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
  location text NOT NULL,
  status_text text NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_milestones_shipment ON public.milestones(shipment_id, timestamp DESC);
CREATE INDEX idx_shipments_tracking ON public.shipments(tracking_number);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.shipments TO anon, authenticated;
GRANT ALL ON public.shipments TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.milestones TO anon, authenticated;
GRANT ALL ON public.milestones TO service_role;

ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read shipments" ON public.shipments FOR SELECT USING (true);
CREATE POLICY "public write shipments" ON public.shipments FOR INSERT WITH CHECK (true);
CREATE POLICY "public update shipments" ON public.shipments FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "public delete shipments" ON public.shipments FOR DELETE USING (true);

CREATE POLICY "public read milestones" ON public.milestones FOR SELECT USING (true);
CREATE POLICY "public write milestones" ON public.milestones FOR INSERT WITH CHECK (true);
CREATE POLICY "public update milestones" ON public.milestones FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "public delete milestones" ON public.milestones FOR DELETE USING (true);

-- Seed demo data
INSERT INTO public.shipments (tracking_number, sender_company, receiver_company, origin, destination, is_overseas, status, weight_kg, estimated_delivery) VALUES
('XP-DOM-9901', 'TechLogistics India Pvt Ltd', 'Apex Auto Assembly', 'Bengaluru, IN', 'Gurugram, IN', false, 'In Transit', 1250.5, (now() + interval '3 days')::date),
('XP-INT-5002', 'Bharat Handicrafts Exporters', 'EuroDesign GmbH', 'Moradabad, IN', 'Hamburg, DE', true, 'In Air Transit', 480.0, (now() + interval '9 days')::date);

INSERT INTO public.milestones (shipment_id, location, status_text, timestamp)
SELECT id, 'Bengaluru Origin Hub', 'Consignment booked and manifest generated', now() - interval '4 days' FROM public.shipments WHERE tracking_number = 'XP-DOM-9901';
INSERT INTO public.milestones (shipment_id, location, status_text, timestamp)
SELECT id, 'Bengaluru Warehouse', 'Picked up from sender facility', now() - interval '3 days 6 hours' FROM public.shipments WHERE tracking_number = 'XP-DOM-9901';
INSERT INTO public.milestones (shipment_id, location, status_text, timestamp)
SELECT id, 'Nagpur Interchange Hub', 'In transit — arrived at Nagpur regional hub', now() - interval '12 hours' FROM public.shipments WHERE tracking_number = 'XP-DOM-9901';

INSERT INTO public.milestones (shipment_id, location, status_text, timestamp)
SELECT id, 'Moradabad Export Facility', 'Consignment booked for overseas cargo', now() - interval '7 days' FROM public.shipments WHERE tracking_number = 'XP-INT-5002';
INSERT INTO public.milestones (shipment_id, location, status_text, timestamp)
SELECT id, 'JNPT Mumbai Port', 'Export customs cleared — outbound manifest filed', now() - interval '3 days' FROM public.shipments WHERE tracking_number = 'XP-INT-5002';
INSERT INTO public.milestones (shipment_id, location, status_text, timestamp)
SELECT id, 'Mumbai — Frankfurt Corridor', 'In air transit onboard flight LH-MAA772', now() - interval '18 hours' FROM public.shipments WHERE tracking_number = 'XP-INT-5002';
