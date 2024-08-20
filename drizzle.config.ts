import { Config, defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./utils/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://FinanSmart_owner:fDQMxLS8rs9P@ep-patient-rain-a5jp4oed.us-east-2.aws.neon.tech/FinanSmart?sslmode=require',
  },
  verbose: true,
  strict: true,
}) satisfies Config;