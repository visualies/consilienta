// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Globals } from './collections/Globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const syncPostsSchemaForProduction = {
  name: '20260614_sync_posts_schema',
  up: async ({ payload }: MigrateUpArgs) => {
    const adapter = payload.db
    const { pushSchema } = adapter.requireDrizzleKit()
    const { apply, hasDataLoss, warnings } = await pushSchema(
      adapter.schema,
      adapter.drizzle as any,
      adapter.schemaName ? [adapter.schemaName] : undefined,
      adapter.tablesFilter,
      adapter.extensions.postgis ? ['postgis'] : undefined,
    )

    if (warnings.length) {
      payload.logger.warn({
        msg: `Schema push warnings:\n${warnings.join('\n')}`,
      })
    }

    if (hasDataLoss) {
      throw new Error('Production schema push reported possible data loss. Migration stopped.')
    }

    await apply()
  },
  down: async (_args: MigrateDownArgs) => {},
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Posts, ContactSubmissions],
  globals: [Globals],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT || '5432'),
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    },
    prodMigrations: [syncPostsSchemaForProduction],
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
