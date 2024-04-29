CREATE TABLE public.telemetry
(
    accuracy double precision, /* Estimated accuracy of GPS coordinates, from GPS data */
    altitude double precision, /* Altitude, from GPS data */
    "batteryPercent" double precision, /* Battery level of phone in percent */
    "cellStrength" double precision, /* Strength of connection to cell tower in percent */
    date timestamp with time zone NOT NULL, /* Date of GPS fix, from GPS data */
    latitude double precision, /* Latitude, from GPS data */
    longitude double precision, /* Longitude, from GPS data */
    pressure double precision, /* Pressure in hectopascals, from barometer */
    provider text, /* Provider of GPS data */
    session text NOT NULL, /* Unique identifier for a locating session and/or phone */
    speed double precision, /* Speed in km/h, from GPS data */
    temperature double precision, /* Temperature in celsius, from thermometer */
    "timeToFix" double precision /* Time to obtain GPS fix in seconds */
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