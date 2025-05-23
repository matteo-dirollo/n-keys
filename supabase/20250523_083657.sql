-- Up Migration
ALTER TABLE "cj_settings" ALTER COLUMN "updated_at" SET DEFAULT now();
ALTER TABLE "cj_settings" ALTER COLUMN "updated_at" SET NOT NULL;
ALTER TABLE "cj_settings" ALTER COLUMN "created_at" SET DEFAULT now();
ALTER TABLE "cj_settings" ALTER COLUMN "created_at" SET NOT NULL;
ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cj_settings_id" integer;
ALTER TABLE "cj_settings" ADD COLUMN "email_address" varchar;
ALTER TABLE "cj_settings" ADD COLUMN "api_token" varchar;
ALTER TABLE "cj_settings" ADD COLUMN "refresh_token" varchar;
ALTER TABLE "cj_settings" ADD COLUMN "refresh_token_expiry" timestamp(3) with time zone;
ALTER TABLE "cj_settings" ADD COLUMN "access_token" varchar;
ALTER TABLE "cj_settings" ADD COLUMN "access_token_expiry" timestamp(3) with time zone;
ALTER TABLE "cj_settings" ADD COLUMN "pod_id" integer;

DO $$ BEGIN
 ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cj_settings_fk" FOREIGN KEY ("cj_settings_id") REFERENCES "public"."cj_settings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cj_settings" ADD CONSTRAINT "cj_settings_pod_id_media_id_fk" FOREIGN KEY ("pod_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cj_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("cj_settings_id");
CREATE INDEX IF NOT EXISTS "cj_settings_pod_idx" ON "cj_settings" USING btree ("pod_id");
CREATE INDEX IF NOT EXISTS "cj_settings_updated_at_idx" ON "cj_settings" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "cj_settings_created_at_idx" ON "cj_settings" USING btree ("created_at");

-- down
ALTER TABLE "cj_settings" DROP CONSTRAINT "cj_settings_pod_id_media_id_fk";
ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cj_settings_fk";
DROP INDEX IF EXISTS "cj_settings_pod_idx";
DROP INDEX IF EXISTS "cj_settings_updated_at_idx";
DROP INDEX IF EXISTS "cj_settings_created_at_idx";
DROP INDEX IF EXISTS "payload_locked_documents_rels_cj_settings_id_idx";
ALTER TABLE "cj_settings" ALTER COLUMN "updated_at" DROP DEFAULT;
ALTER TABLE "cj_settings" ALTER COLUMN "updated_at" DROP NOT NULL;
ALTER TABLE "cj_settings" ALTER COLUMN "created_at" DROP DEFAULT;
ALTER TABLE "cj_settings" ALTER COLUMN "created_at" DROP NOT NULL;
ALTER TABLE "cj_settings" DROP COLUMN IF EXISTS "email_address";
ALTER TABLE "cj_settings" DROP COLUMN IF EXISTS "api_token";
ALTER TABLE "cj_settings" DROP COLUMN IF EXISTS "refresh_token";
ALTER TABLE "cj_settings" DROP COLUMN IF EXISTS "refresh_token_expiry";
ALTER TABLE "cj_settings" DROP COLUMN IF EXISTS "access_token";
ALTER TABLE "cj_settings" DROP COLUMN IF EXISTS "access_token_expiry";
ALTER TABLE "cj_settings" DROP COLUMN IF EXISTS "pod_id";
ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "cj_settings_id";