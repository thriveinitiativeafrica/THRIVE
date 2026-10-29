// Creates the blog, contact and newsletter tables in any Postgres database.
// Usage (PowerShell):  $env:DATABASE_URL="postgresql://..."; node scripts/migrate.js
const fs = require("fs");
const path = require("path");

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.log("[Migration] DATABASE_URL is not set. Nothing to do.");
    console.log("[Migration] Schema lives in drizzle/0000_init.sql if you prefer to paste it into your database's SQL editor.");
    return;
  }

  const postgres = require("postgres");
  const sql = postgres(databaseUrl, { prepare: false, ssl: "require", max: 1 });

  try {
    const migrationSql = fs.readFileSync(path.join(__dirname, "../drizzle/0000_init.sql"), "utf8");
    console.log("[Migration] Connecting...");
    await sql.unsafe(migrationSql);
    console.log("[Migration] Tables created (or already present).");
  } catch (err) {
    console.error("[Migration] Failed:", err);
    process.exitCode = 1;
  } finally {
    await sql.end();
  }
}

runMigration();
