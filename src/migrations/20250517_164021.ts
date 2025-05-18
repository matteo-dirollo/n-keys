import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "collections" ADD COLUMN "meta_canonical_u_r_l" varchar;
  ALTER TABLE "products" ADD COLUMN "meta_canonical_u_r_l" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "collections" DROP COLUMN IF EXISTS "meta_canonical_u_r_l";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_canonical_u_r_l";`)
}
