CREATE TABLE public.telemetry (
    accuracy double precision,
    altitude double precision,
    "batteryPercent" double precision,
    "cellStrength" double precision,
    date timestamp with time zone NOT NULL,
    latitude double precision,
    longitude double precision,
    provider text,
    session text NOT NULL,
    speed double precision,
    temperature double precision
);