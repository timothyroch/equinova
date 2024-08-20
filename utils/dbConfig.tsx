import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://FinanSmart_owner:fDQMxLS8rs9P@ep-patient-rain-a5jp4oed.us-east-2.aws.neon.tech/FinanSmart?sslmode=require');
export const db = drizzle(sql, {schema});