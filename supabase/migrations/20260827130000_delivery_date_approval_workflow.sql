-- Add delivery date approval workflow to shipments
ALTER TABLE public.shipments
  ADD COLUMN requested_delivery_date date,
    ADD COLUMN delivery_date_request_status text NOT NULL DEFAULT 'none'
        CHECK (delivery_date_request_status IN ('none', 'pending', 'approved', 'rejected')),
          ADD COLUMN scheduled_delivery_date date,
            ADD COLUMN delivery_date_reviewed_at timestamptz,
              ADD COLUMN delivery_date_rejection_reason text;

              -- Constraint: approved requests must have a scheduled date
              ALTER TABLE public.shipments
                ADD CONSTRAINT approved_request_must_have_schedule
                    CHECK (
                          (delivery_date_request_status != 'approved') OR
                                (scheduled_delivery_date IS NOT NULL)
                                    );

                                    -- Index for fast pending-request queries
                                    CREATE INDEX idx_shipments_pending_requests
                                      ON public.shipments(delivery_date_request_status, created_at DESC)
                                        WHERE delivery_date_request_status = 'pending';

                                        -- Index for lookups by requested date
                                        CREATE INDEX idx_shipments_by_requested_date
                                          ON public.shipments(requested_delivery_date)
                                            WHERE requested_delivery_date IS NOT NULL;
