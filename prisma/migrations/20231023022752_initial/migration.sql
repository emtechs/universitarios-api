-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'LEADER', 'COMMON');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CONFIRMED', 'REFUSED', 'ANALYZING', 'PENDING', 'BLOCKED', 'RECEIVED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FT', 'MAT', 'DOC', 'END');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('MORNING', 'AFTERNOON', 'NIGHT', 'FULL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "email" VARCHAR(254),
    "login" VARCHAR(128) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "rg" VARCHAR(128),
    "role" "Role" NOT NULL DEFAULT 'COMMON',
    "is_super" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_first_access" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schools" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254),
    "school_id" TEXT,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buses" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "buses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "key" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "course" VARCHAR(200),
    "semester" INTEGER,
    "total" INTEGER,
    "shift" "Shift",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "period_id" TEXT NOT NULL,
    "school_id" TEXT,
    "analyst_id" TEXT,

    CONSTRAINT "records_pkey" PRIMARY KEY ("user_id","period_id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "is_back" BOOLEAN NOT NULL DEFAULT false,
    "record_id" TEXT,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "justification" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "record_id" TEXT,
    "user_id" TEXT NOT NULL,
    "document_id" TEXT,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_user" (
    "key" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,

    CONSTRAINT "document_user_pkey" PRIMARY KEY ("user_id","document_id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_route" (
    "key" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,

    CONSTRAINT "place_route_pkey" PRIMARY KEY ("place_id","route_id")
);

-- CreateTable
CREATE TABLE "lines" (
    "id" TEXT NOT NULL,
    "shift" "Shift" NOT NULL,
    "is_back" BOOLEAN NOT NULL DEFAULT false,
    "route_id" TEXT NOT NULL,
    "period_id" TEXT NOT NULL,
    "week_id" TEXT NOT NULL,

    CONSTRAINT "lines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "line_record" (
    "key" TEXT NOT NULL,
    "line_id" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "bus_id" TEXT,

    CONSTRAINT "line_record_pkey" PRIMARY KEY ("line_id","record_id")
);

-- CreateTable
CREATE TABLE "years" (
    "id" TEXT NOT NULL,
    "year" VARCHAR(10) NOT NULL,

    CONSTRAINT "years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weeks" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "week" INTEGER NOT NULL,

    CONSTRAINT "weeks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periods" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "date_initial" DATE NOT NULL,
    "date_final" DATE NOT NULL,
    "year_id" TEXT NOT NULL,

    CONSTRAINT "periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "size" INTEGER NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "key" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    "document_id" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "token" VARCHAR(200) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "schools_name_key" ON "schools"("name");

-- CreateIndex
CREATE UNIQUE INDEX "places_name_key" ON "places"("name");

-- CreateIndex
CREATE UNIQUE INDEX "places_school_id_key" ON "places"("school_id");

-- CreateIndex
CREATE UNIQUE INDEX "buses_name_key" ON "buses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "records_key_key" ON "records"("key");

-- CreateIndex
CREATE UNIQUE INDEX "documents_record_id_key" ON "documents"("record_id");

-- CreateIndex
CREATE UNIQUE INDEX "document_user_key_key" ON "document_user"("key");

-- CreateIndex
CREATE UNIQUE INDEX "routes_name_key" ON "routes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "place_route_key_key" ON "place_route"("key");

-- CreateIndex
CREATE UNIQUE INDEX "line_record_key_key" ON "line_record"("key");

-- CreateIndex
CREATE UNIQUE INDEX "years_year_key" ON "years"("year");

-- CreateIndex
CREATE UNIQUE INDEX "weeks_name_key" ON "weeks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "weeks_week_key" ON "weeks"("week");

-- CreateIndex
CREATE UNIQUE INDEX "images_key_key" ON "images"("key");

-- CreateIndex
CREATE UNIQUE INDEX "images_user_id_key" ON "images"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_document_id_key" ON "images"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "token_user_id_key" ON "token"("user_id");

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "periods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_analyst_id_fkey" FOREIGN KEY ("analyst_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_user" ADD CONSTRAINT "document_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_user" ADD CONSTRAINT "document_user_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_route" ADD CONSTRAINT "place_route_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_route" ADD CONSTRAINT "place_route_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lines" ADD CONSTRAINT "lines_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lines" ADD CONSTRAINT "lines_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "periods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lines" ADD CONSTRAINT "lines_week_id_fkey" FOREIGN KEY ("week_id") REFERENCES "weeks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "line_record" ADD CONSTRAINT "line_record_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "lines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "line_record" ADD CONSTRAINT "line_record_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "line_record" ADD CONSTRAINT "line_record_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "buses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "periods" ADD CONSTRAINT "periods_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "years"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
