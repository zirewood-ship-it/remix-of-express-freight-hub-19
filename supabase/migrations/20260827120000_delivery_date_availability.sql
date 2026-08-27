CREATE TABLE public.delivery_date_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_date date NOT NULL,
  is_overseas boolean NOT NULL DEFAULT false,
  is_available boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (delivery_date, is_overseas)
);

CREATE INDEX idx_delivery_date_availability_lookup
  ON public.delivery_date_availability(delivery_date, is_overseas)
  WHERE is_available = true;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.delivery_date_availability TO anon, authenticated;
GRANT ALL ON public.delivery_date_availability TO service_role;

ALTER TABLE public.delivery_date_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read delivery date availability"
  ON public.delivery_date_availability FOR SELECT USING (true);
CREATE POLICY "public write delivery date availability"
  ON public.delivery_date_availability FOR INSERT WITH CHECK (true);
CREATE POLICY "public update delivery date availability"
  ON public.delivery_date_availability FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "public delete delivery date availability"
  ON public.delivery_date_availability FOR DELETE USING (true);

INSERT INTO public.delivery_date_availability (delivery_date, is_overseas)
SELECT delivery_date, is_overseas
FROM generate_series(current_date + 1, current_date + 14, interval '1 day') AS dates(delivery_date)
CROSS JOIN (VALUES (false), (true)) AS services(is_overseas);
