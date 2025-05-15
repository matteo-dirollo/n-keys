import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "collections" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "collections" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "collections" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "products" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "products" ADD COLUMN "meta_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "collections" ADD CONSTRAINT "collections_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "collections_meta_meta_image_idx" ON "collections" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "products_meta_meta_image_idx" ON "products" USING btree ("meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "collections" DROP CONSTRAINT "collections_meta_image_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "collections_meta_meta_image_idx";
  DROP INDEX IF EXISTS "products_meta_meta_image_idx";
  ALTER TABLE "collections" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "collections" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "collections" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_image_id";`)
}
