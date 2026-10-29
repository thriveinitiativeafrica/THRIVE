const fs = require("fs");
const path = require("path");

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.log("[Migration] No DATABASE_URL provided. Skipping remote Postgres migration.");
    console.log("[Migration] Database schema is saved at drizzle/0000_init.sql.");
    return;
  }

  try {
    const { neon } = require("@neondatabase/serverless");
    const sql = neon(databaseUrl);
    const migrationSql = fs.readFileSync(path.join(__dirname, "../drizzle/0000_init.sql"), "utf8");

    console.log("[Migration] Connecting to Neon Postgres...");
    // Split queries by semicolon
    const statements = migrationSql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await sql(stmt);
    }

    console.log("[Migration] Neon Postgres tables created successfully!");
  } catch (err) {
    console.error("[Migration] Error running migration against Neon:", err);
    process.exit(1);
  }
}

runMigration();
