import { supabase } from "@/integrations/supabase/client";

export type Shipment = {
  id: string;
  tracking_number: string;
  sender_company: string;
  receiver_company: string;
  origin: string;
  destination: string;
  is_overseas: boolean;
  status: string;
  weight_kg: number;
  estimated_delivery: string | null;
  created_at: string;
};

export type Milestone = {
  id: string;
  shipment_id: string;
  location: string;
  status_text: string;
  timestamp: string;
};

export type DeliveryDateAvailability = {
  id: string;
  delivery_date: string;
  is_overseas: boolean;
  is_available: boolean;
  created_at: string;
};

export const STATUS_FLOW = [
  "Booked",
  "Picked Up",
  "In Transit",
  "Customs Clearance",
  "Hub Arrival",
  "Out for Delivery",
  "Delivered",
] as const;

export async function listDeliveryDateAvailability() {
  const { data, error } = await supabase
    .from("delivery_date_availability")
    .select("*")
    .order("delivery_date", { ascending: true });
  if (error) throw error;
  return (data ?? []) as DeliveryDateAvailability[];
}

export async function listAvailableDeliveryDates(isOverseas: boolean) {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("delivery_date_availability")
    .select("delivery_date")
    .eq("is_overseas", isOverseas)
    .eq("is_available", true)
    .gte("delivery_date", today)
    .order("delivery_date", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(row => row.delivery_date);
}

export async function findShipment(trackingNumber: string) {
  const tn = trackingNumber.trim().toUpperCase();
  const { data: shipment, error } = await supabase
    .from("shipments")
    .select("*")
    .ilike("tracking_number", tn)
    .maybeSingle();
  if (error) throw error;
  if (!shipment) return null;
  const { data: milestones } = await supabase
    .from("milestones")
    .select("*")
    .eq("shipment_id", shipment.id)
    .order("timestamp", { ascending: true });
  return { shipment: shipment as Shipment, milestones: (milestones ?? []) as Milestone[] };
}

export async function listShipments() {
  const { data, error } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Shipment[];
}

export async function listMilestones(shipmentId: string) {
  const { data, error } = await supabase
    .from("milestones")
    .select("*")
    .eq("shipment_id", shipmentId)
    .order("timestamp", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Milestone[];
}
