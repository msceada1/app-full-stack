// Importamos mongoose y dotenv para manejar la conexión a la base de datos
import mongoose from "mongoose";
import dotenv from "dotenv";
// Cargamos las variables de entorno desde el archivo .env
dotenv.config();
// Obtenemos la URI de conexión a MongoDB desde las variables de entorno
const MONGO_URL = process.env.MONGO_URL || process.env.MONGO_URI;
// Función para conectar a la base de datos
export const connectDB = async () => {
  try {
    // Validar que exista la URL antes de intentar conectar
    if (!MONGO_URL) {
      throw new Error('MONGO_URL environment variable is not set');
    }
    // Conectamos a MongoDB usando mongoose
    await mongoose.connect(MONGO_URL);
    // Mostramos un mensaje de éxito en la consola
    console.log("Conexión a la base de datos establecida");
  } catch (error) {
    // Si hay un error, lo mostramos en la consola y salimos del proceso
    console.error("Error al conectar a la base de datos:", error);
    // Salimos del proceso con un código de error
    process.exit(1);
  }
};


// Exportamos mongoose para usarlo en otras partes de la aplicación
export default mongoose;
