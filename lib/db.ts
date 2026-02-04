import postgres from 'postgres';

// 1. Leemos la URL de conexión de tu .env.local
const connectionString = process.env.NEON_DB_URL;

if (!connectionString) {
  console.error("❌ ERROR: No se encontró NEON_DB_URL en las variables de entorno.");
}

// 2. Configuramos el cliente de Postgres (postgres.js)
// "ssl: 'require'" es obligatorio para Neon
const sql = postgres(connectionString!, {
  ssl: 'require',
  max: 10,               // Máximo de conexiones en el pool
  idle_timeout: 20,      // Cierra conexiones inactivas tras 20s
  connect_timeout: 10,   // Tiempo de espera para conectar
});

// 3. Función auxiliar para verificar conexión rápidamente
export async function isDatabaseConnected() {
  try {
    await sql`SELECT 1`;
    return true;
  } catch (e) {
    console.error("⚠️ Error de conexión a Neon:", e);
    return false;
  }
}

export { sql };