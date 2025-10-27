--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_enrollments_status; Type: TYPE; Schema: public; Owner: nwmac
--

CREATE TYPE public.enum_enrollments_status AS ENUM (
    'enrolled',
    'unenrolled'
);


ALTER TYPE public.enum_enrollments_status OWNER TO nwmac;

--
-- Name: enum_grades_grade; Type: TYPE; Schema: public; Owner: nwmac
--

CREATE TYPE public.enum_grades_grade AS ENUM (
    'A+',
    'A',
    'A-',
    'B+',
    'B',
    'B-',
    'C+',
    'C',
    'C-',
    'D',
    'F'
);


ALTER TYPE public.enum_grades_grade OWNER TO nwmac;

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: nwmac
--

CREATE TYPE public.enum_users_role AS ENUM (
    'student',
    'teacher',
    'instructor'
);


ALTER TYPE public.enum_users_role OWNER TO nwmac;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: course_prerequisites; Type: TABLE; Schema: public; Owner: nwmac
--

CREATE TABLE public.course_prerequisites (
    course_id uuid NOT NULL,
    prerequisite_course_id uuid NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public.course_prerequisites OWNER TO nwmac;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: nwmac
--

CREATE TABLE public.courses (
    name character varying(255) NOT NULL,
    credits integer NOT NULL,
    enrollment_limit integer NOT NULL,
    created_by uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    CONSTRAINT courses_credits_check CHECK ((credits > 0)),
    CONSTRAINT courses_enrollment_limit_check CHECK ((enrollment_limit > 0))
);


ALTER TABLE public.courses OWNER TO nwmac;

--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: nwmac
--

CREATE TABLE public.enrollments (
    student_id uuid NOT NULL,
    course_id uuid NOT NULL,
    enrolled_at timestamp with time zone NOT NULL,
    status character varying(10) DEFAULT 'enrolled'::character varying NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    CONSTRAINT enrollments_status_check CHECK (((status)::text = ANY ((ARRAY['enrolled'::character varying, 'unenrolled'::character varying])::text[])))
);


ALTER TABLE public.enrollments OWNER TO nwmac;

--
-- Name: grades; Type: TABLE; Schema: public; Owner: nwmac
--

CREATE TABLE public.grades (
    enrollment_id uuid NOT NULL,
    grade character varying(2),
    assigned_by uuid,
    assigned_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    CONSTRAINT grades_grade_check CHECK (((grade)::text = ANY ((ARRAY['A+'::character varying, 'A'::character varying, 'A-'::character varying, 'B+'::character varying, 'B'::character varying, 'B-'::character varying, 'C+
'::character varying, 'C'::character varying, 'C-'::character varying, 'D+'::character varying, 'D'::character varying, 'D-'::character varying, 'F'::character varying])::text[])))
);


ALTER TABLE public.grades OWNER TO nwmac;

--
-- Name: prerequisites; Type: TABLE; Schema: public; Owner: nwmac
--

CREATE TABLE public.prerequisites (
    id uuid NOT NULL,
    course_id uuid NOT NULL,
    prerequisite_course_id uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.prerequisites OWNER TO nwmac;

--
-- Name: users; Type: TABLE; Schema: public; Owner: nwmac
--

CREATE TABLE public.users (
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role public.enum_users_role NOT NULL,
    major character varying(255),
    password_hash character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id uuid NOT NULL,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY (ARRAY[('student'::character varying)::text, ('instructor'::character varying)::text])))
);


ALTER TABLE public.users OWNER TO nwmac;

--
-- Data for Name: course_prerequisites; Type: TABLE DATA; Schema: public; Owner: nwmac
--

COPY public.course_prerequisites (course_id, prerequisite_course_id, id) FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: nwmac
--

COPY public.courses (name, credits, enrollment_limit, created_by, created_at, updated_at, id) FROM stdin;
English 101	3	35	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-25 08:24:15.282-04	2025-10-25 20:59:58.794-04	694418a4-8e85-48a0-8b1f-edf8037f6e67
Debate	2	25	f599c927-28f5-4728-9a36-36ecdcfee968	2025-10-25 11:02:16.67-04	2025-10-26 02:40:20.645-04	c53f133c-e2b8-494f-8538-040a379a1462
Public Speech 101	3	5	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-25 08:33:52.645-04	2025-10-26 08:13:12.369-04	8b27dd53-1b17-4f28-bd89-bb2c29179855
English 201	3	8	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-26 20:53:30.618-04	2025-10-26 20:53:30.618-04	ae000209-97a8-48b1-a791-ac6e128a2658
Creative Writing	1	13	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-25 08:45:08.345-04	2025-10-26 21:41:45.367-04	fcc544ef-2a0e-46a4-8763-0cd124c825e0
Algebra	3	4	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-27 10:15:34.522-04	2025-10-27 10:15:34.522-04	a43c69e1-1a9d-444e-8c9e-688293072a24
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: nwmac
--

COPY public.enrollments (student_id, course_id, enrolled_at, status, id) FROM stdin;
06a4a5b8-9561-407e-85da-9a41ff92d035	fcc544ef-2a0e-46a4-8763-0cd124c825e0	2025-10-26 05:37:07.346-04	enrolled	f25af1bd-bf55-40bc-a9c7-9da1d0470ab7
0ac53c25-b24b-4f7c-879f-a606a35da56a	fcc544ef-2a0e-46a4-8763-0cd124c825e0	2025-10-26 05:37:12.872-04	enrolled	a64b0a0f-f6a8-41b7-97a1-e13cffa819b7
b2a6d15d-91c8-4da0-8544-cc1fb243ac6c	fcc544ef-2a0e-46a4-8763-0cd124c825e0	2025-10-26 05:37:20.339-04	enrolled	98d7963b-2b8c-4391-b69b-23b1777faf63
1134b53f-4eab-49f7-8d27-bafc6c510965	8b27dd53-1b17-4f28-bd89-bb2c29179855	2025-10-26 08:12:03.534-04	enrolled	aeb7d220-26a9-4021-83c0-f817d8e6e3fb
820235a1-148c-4db0-b1ac-414da7adc1b7	8b27dd53-1b17-4f28-bd89-bb2c29179855	2025-10-26 08:12:14.025-04	enrolled	5e17ce0b-1748-4beb-a433-9686a10ba306
06a4a5b8-9561-407e-85da-9a41ff92d035	8b27dd53-1b17-4f28-bd89-bb2c29179855	2025-10-26 08:18:22.828-04	enrolled	26ea1a6f-da8e-40fc-bc0d-303ae328b4f1
b036e261-6d4b-4309-a795-9e5d449d8802	8b27dd53-1b17-4f28-bd89-bb2c29179855	2025-10-26 08:18:27.844-04	enrolled	43b0d69c-0696-42f4-aa02-0ed43012457b
f033e714-a921-45ae-b2cc-5b1c0d10dee1	8b27dd53-1b17-4f28-bd89-bb2c29179855	2025-10-26 17:43:19.505-04	enrolled	7db0958d-4558-4cbc-8154-5bb7a0d795c0
3567cd37-3d67-4db3-a9b5-44efe230bb5a	694418a4-8e85-48a0-8b1f-edf8037f6e67	2025-10-26 22:56:32.706-04	enrolled	22b86d79-9a3f-455c-92d4-2466a352b746
0ac53c25-b24b-4f7c-879f-a606a35da56a	694418a4-8e85-48a0-8b1f-edf8037f6e67	2025-10-26 22:56:32.706-04	enrolled	7b45b38b-0089-464f-8393-8d41c25ad379
06a4a5b8-9561-407e-85da-9a41ff92d035	694418a4-8e85-48a0-8b1f-edf8037f6e67	2025-10-26 22:56:32.706-04	enrolled	ec9041c3-622b-4847-a991-83088b4661f5
06a4a5b8-9561-407e-85da-9a41ff92d035	ae000209-97a8-48b1-a791-ac6e128a2658	2025-10-27 03:20:21.191-04	enrolled	9ab7af2e-68fc-4bcf-ab3c-7048af0181aa
89d9d7c1-5bbf-4e81-bf95-6d186830e821	694418a4-8e85-48a0-8b1f-edf8037f6e67	2025-10-27 10:11:48.67-04	enrolled	43bf8790-a2b0-458a-8f87-ce7e47217d52
89d9d7c1-5bbf-4e81-bf95-6d186830e821	ae000209-97a8-48b1-a791-ac6e128a2658	2025-10-27 10:11:54.698-04	enrolled	ff139269-28d4-410c-9f8f-45937fc4cc83
b2a6d15d-91c8-4da0-8544-cc1fb243ac6c	a43c69e1-1a9d-444e-8c9e-688293072a24	2025-10-27 10:16:03.862-04	enrolled	34ac73cc-34db-4edd-b64e-f0bfaa6deda1
b2a6d15d-91c8-4da0-8544-cc1fb243ac6c	694418a4-8e85-48a0-8b1f-edf8037f6e67	2025-10-27 12:19:14.55-04	enrolled	2f4c6c29-4bf7-48b5-b078-12cd3ed08ab4
b036e261-6d4b-4309-a795-9e5d449d8802	694418a4-8e85-48a0-8b1f-edf8037f6e67	2025-10-27 12:19:14.55-04	enrolled	4f751198-af6d-4a43-babb-d76cf68e4374
\.


--
-- Data for Name: grades; Type: TABLE DATA; Schema: public; Owner: nwmac
--

COPY public.grades (enrollment_id, grade, assigned_by, assigned_at, id) FROM stdin;
26ea1a6f-da8e-40fc-bc0d-303ae328b4f1	A	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-27 16:15:27.205	0f988415-c9b9-4cf2-87bb-565ab93f7386
9ab7af2e-68fc-4bcf-ab3c-7048af0181aa	D-	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-27 16:57:38.716	748dbaab-8490-4c6f-98db-ef59d7603d4b
f25af1bd-bf55-40bc-a9c7-9da1d0470ab7	D	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-27 16:58:00.745	37ff7ff6-00b1-4bbe-9f26-fd75527b9c66
ec9041c3-622b-4847-a991-83088b4661f5	F	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-27 16:58:25.407	9ca763e0-7fb3-46c3-8963-a6c8bea52dbf
ec9041c3-622b-4847-a991-83088b4661f5	A+	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-27 17:36:44.12	d81fb946-595c-41bc-969b-6bd1ffea1dba
5e17ce0b-1748-4beb-a433-9686a10ba306	C	2cd73528-ffcf-4410-a575-2adba2841f0f	2025-10-27 17:44:07.837	ed9b8643-202a-4a14-bba5-d4db53ca527f
\.


--
-- Data for Name: prerequisites; Type: TABLE DATA; Schema: public; Owner: nwmac
--

COPY public.prerequisites (id, course_id, prerequisite_course_id, "createdAt", "updatedAt") FROM stdin;
f8ec6649-2e0b-49c8-a7c7-a762dd03901e	c53f133c-e2b8-494f-8538-040a379a1462	694418a4-8e85-48a0-8b1f-edf8037f6e67	2025-10-25 11:02:16.686-04	2025-10-25 11:02:16.686-04
62a1bdf8-8f92-4a6a-87c2-a94efffd2edd	c53f133c-e2b8-494f-8538-040a379a1462	8b27dd53-1b17-4f28-bd89-bb2c29179855	2025-10-25 11:02:16.686-04	2025-10-25 11:02:16.686-04
265fb891-74e5-4966-8db6-ae47400b0c51	ae000209-97a8-48b1-a791-ac6e128a2658	694418a4-8e85-48a0-8b1f-edf8037f6e67	2025-10-26 20:53:30.632-04	2025-10-26 20:53:30.632-04
49cbf4fb-92c5-4c65-b5cf-48631588ff09	fcc544ef-2a0e-46a4-8763-0cd124c825e0	694418a4-8e85-48a0-8b1f-edf8037f6e67	2025-10-26 21:41:45.374-04	2025-10-26 21:41:45.374-04
2836cf6f-a9e7-4060-bacc-8a2ed4512b70	a43c69e1-1a9d-444e-8c9e-688293072a24	fcc544ef-2a0e-46a4-8763-0cd124c825e0	2025-10-27 10:15:57.008-04	2025-10-27 10:15:57.008-04
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nwmac
--

COPY public.users (first_name, last_name, email, role, major, password_hash, created_at, updated_at, id) FROM stdin;
Jordan	Johnson	jordanj@gmail.com	student	English	V3g3t@bl3	2025-10-18 14:02:41.379037-04	2025-10-18 14:02:41.379037-04	3567cd37-3d67-4db3-a9b5-44efe230bb5a
Taylor	King	tking34@gmail.com	instructor	\N	$2b$10$iImXe7AgDNsBlDkC7FUlwu9w5/eG.cwhVDzEJJRYlHIOUnIJckZ5a	2025-10-22 20:46:03.27-04	2025-10-22 20:46:03.27-04	f0138d4f-45b2-4d5d-b2bd-b47d8150597a
Thomas	Edison	tedison4@gmail.com	instructor	\N	$2b$10$qjlHlyfl7juSAd.7jEfwM.I8pI.S5H64Tryai310Q6YcFSIJZcDua	2025-10-23 18:33:23.396-04	2025-10-23 18:33:23.396-04	32e8d338-416b-4ca7-97c6-e1d29bb35fd1
Kim	Petras	kpet1@gmail.com	student	\N	$2b$10$VGiADW0aFII.AMMOK1aGd.xuBT5R3rYHGkLcPGaosqoc9fX74n8re	2025-10-23 18:38:15.276-04	2025-10-23 18:38:15.276-04	f033e714-a921-45ae-b2cc-5b1c0d10dee1
Chris	Staples	cstaples@gmail.com	student	\N	$2b$10$AMZCz4kCbv3NknoQYJbW8O0Ry/OzKw8QmmoqtImInuHtO6EQjTjk.	2025-10-23 18:40:33.878-04	2025-10-23 18:40:33.878-04	1134b53f-4eab-49f7-8d27-bafc6c510965
Sally	Smith	ssmith99@gmail.com	instructor	\N	$2b$10$RhLfZ7BpxPwZAHDIBDXnCOYFitgai46eN9q.fh2KXKTgx8MVpixcG	2025-10-23 18:58:14.947-04	2025-10-23 18:58:14.947-04	954d11e5-136c-42c9-9d1d-1cdaedafdce1
Tyler	Creator	tcreator@gmail.com	student	Music	$2b$10$bvTGpY/a.5yw8uobfqXBSe6hzcMAQRE6j5v9lFDx0dA0.bQOyuida	2025-10-23 18:59:28.86-04	2025-10-23 18:59:28.86-04	0ac53c25-b24b-4f7c-879f-a606a35da56a
Tom	Worm	tworm@gmail.com	instructor	\N	$2b$10$LEh8PAMzYJaJX6S6s.fQe.fGCrpckyDtySZOj41LRE3RbsXKqiafy	2025-10-23 19:24:02.277-04	2025-10-23 19:24:02.277-04	f5270cc6-f284-4a8d-9302-2d16198ef618
Mira	Evans	mevans@gmail.com	student	Biology	$2b$10$2bMULxPH0614o3lGieeMUeC2H3cGMMpQ8Pj2bGnzBI.FxlOw1K75G	2025-10-23 19:26:50.104-04	2025-10-23 19:26:50.104-04	89d9d7c1-5bbf-4e81-bf95-6d186830e821
Mary	Parker	mparker@gmail.com	student	English	$2b$10$ne.O6LJkkMAuZMDOZB1BU.9oN9t./uStqUuonz.b.Ve8N5mAROfCq	2025-10-23 19:38:50.389-04	2025-10-23 19:38:50.389-04	b2a6d15d-91c8-4da0-8544-cc1fb243ac6c
Sam	Peters	speters4@gmail.com	instructor	\N	$2b$10$0AlUO9k.ieDytlyA3IbTveoxGG0DbdIrBU0aVgGOs6LmeEd6awIRi	2025-10-23 20:00:25.346-04	2025-10-23 20:00:25.346-04	1a1820ec-30d2-4fc8-af3e-0dace6746ff3
Ingrid	Bage	ibage@gmail.com	student	Nursing	$2b$10$QwUeiUo4PwPKrP/KrnNmOutNd2nAWK5DE846B3R1TD7Nt1xfZ0JyO	2025-10-23 20:01:22.262-04	2025-10-23 20:01:22.262-04	820235a1-148c-4db0-b1ac-414da7adc1b7
Tracy	Harris	tharris@gmail.com	instructor	\N	$2b$10$AqGDItth4L2aLrFdueSxGuBey5IUOoh1kkh232VX7YQw1hVtnDSTC	2025-10-26 01:06:39.887-04	2025-10-26 01:06:39.887-04	e3c318c3-c5be-457d-84d0-bcdfdd4fb72f
Matt	Damon	mdamon@gmail.com	student	Theatre	$2b$10$lti76xgqv//Unlxeqnf4PeFlml2IbyrK6Zi1awOKPfo2b8ZeaoVEC	2025-10-26 01:07:28.856-04	2025-10-26 01:07:28.856-04	c8b43ace-271c-4c6a-8f60-2556d3b0b0a3
Brian	Wilson	bwilson5@gmail.com	student	Finance	$2b$10$uEhQ4HW4YX7uoZiBzwNK9OSsoTfw05lb/7PZb/F9TQNcS9wMUkWf6	2025-10-23 19:21:09.664-04	2025-10-23 19:21:09.664-04	4f65ca0a-44e9-4465-98f7-3e94f51aad2d
Jack	Daniels	jdaniels@gmail.com	instructor	\N	$2b$10$FOLicwIPJyqlsTeoo4YX.OaeIfD8uF/M71VDPJT.A.dUQ2i2FeHKq	2025-10-23 19:36:02.19-04	2025-10-26 02:40:58.28-04	f599c927-28f5-4728-9a36-36ecdcfee968
Grayson	Perry	gperry@gmail.com	instructor	\N	$2b$10$AhYMeYGF13eHW0Ld8I4FCO5T1CV2aJTjzoxWfz0i.cdk72lDTPK/.	2025-10-26 02:44:52.707-04	2025-10-26 02:44:52.707-04	cd62fb05-db40-463e-a28b-f25cc487b119
Larry	Bird	lbird@gmail.com	student	PE	$2b$10$s2FLAzcrEuJBUG5HCHIJmOVC6UlA52s31XWkm/fH2h12rbaCPOnM.	2025-10-23 18:34:17.321-04	2025-10-23 18:34:17.321-04	06a4a5b8-9561-407e-85da-9a41ff92d035
Kelly	Stamps	kstamps@gmail.com	instructor	\N	$2b$10$W8s.e3dtlnrsJMzOeFuwSO5CEVqyTZ.feItHdGUnxjJcOY1CzpXw.	2025-10-23 19:19:40.024-04	2025-10-25 11:04:24.558-04	2cd73528-ffcf-4410-a575-2adba2841f0f
Love	Jones	ljones@gmail.com	student	Business	$2b$10$MDjmofiqzaO1.zzbIcZ2fe7e3R5GtezrgMltFHcjvWMZKRl7Tq6FK	2025-10-26 00:55:01.155-04	2025-10-26 00:55:01.155-04	b036e261-6d4b-4309-a795-9e5d449d8802
Betty	Davis	bdavis@gmail.com	student	Education	$2b$10$K0OLTKJXmSgTm8cQAHJ/L.qEMjFQrGUvxOz4SQZ8je1LOXIamP0Y2	2025-10-26 00:56:41.345-04	2025-10-26 00:56:41.345-04	4bcd5f75-6e43-4867-88f5-833abd878f3f
Quan	Wall	qwall@gmail.com	instructor	\N	$2b$10$OXhcIGqM98eV5bS2HqPQ6OeVtleje3J/Y9Gwd9WA/lfoB78snIAz2	2025-10-26 00:59:15.247-04	2025-10-26 00:59:15.247-04	7bd6ff7b-bf28-40ab-abe9-f03b0394ea97
Fiona	Apple	fapple@gmail.com	student	Engineering	$2b$10$IJpVaVeZK3RW6vjPz4Pg4eApG13HTPgax.uW4dblHwiXRKVynV9pu	2025-10-26 02:45:48.59-04	2025-10-26 02:46:19.856-04	f84cbb0c-0b9d-4bbf-a973-d17bb5d46721
\.


--
-- Name: course_prerequisites course_prerequisites_pkey; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.course_prerequisites
    ADD CONSTRAINT course_prerequisites_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- Name: grades grades_pkey; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (id);


--
-- Name: prerequisites prerequisites_pkey; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.prerequisites
    ADD CONSTRAINT prerequisites_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- Name: users users_email_key4; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: course_prerequisites course_prerequisites_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.course_prerequisites
    ADD CONSTRAINT course_prerequisites_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: course_prerequisites course_prerequisites_prerequisite_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.course_prerequisites
    ADD CONSTRAINT course_prerequisites_prerequisite_course_id_fkey FOREIGN KEY (prerequisite_course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: courses courses_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: enrollments enrollments_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: enrollments enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: grades grades_assigned_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_assigned_by_fkey FOREIGN KEY (assigned_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: grades grades_enrollment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_enrollment_id_fkey FOREIGN KEY (enrollment_id) REFERENCES public.enrollments(id) ON DELETE CASCADE;


--
-- Name: prerequisites prerequisites_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.prerequisites
    ADD CONSTRAINT prerequisites_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: prerequisites prerequisites_prerequisite_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nwmac
--

ALTER TABLE ONLY public.prerequisites
    ADD CONSTRAINT prerequisites_prerequisite_course_id_fkey FOREIGN KEY (prerequisite_course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

