import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./presentation/auth.routes.js";
import productRoutes from "./presentation/product.routes.js";
import categoriaRoutes from "./presentation/categoria.routes.js";
import proveedorRoutes from "./presentation/proveedor.routes.js";
import imagenRoutes from './presentation/imagen.routes.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/proveedores", proveedorRoutes);
//app.use('/uploads', express.static('public/uploads'));
app.use('imagenes', imagenRoutes);
app.use("/uploads", express.static(path.resolve("public/uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
