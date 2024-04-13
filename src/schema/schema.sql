CREATE TABLE public.telemetry
(
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

ALTER TABLE ONLY public.telemetry
    ADD CONSTRAINT telemetry_pkey PRIMARY KEY (date, session);

CREATE TABLE public.log
(
    index serial NOT NULL,
    content text NOT NULL,
    date timestamp with time zone NOT NULL,
    level text NOT NULL,
    session text NOT NULL,
    PRIMARY KEY (index)
);