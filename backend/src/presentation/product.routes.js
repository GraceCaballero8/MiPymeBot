import { Router } from "express";
import db from "../infrastructure/config/db.js";
import ProductoRepository from "../infrastructure/repositories/ProductoRepository.js";
import ProductoService from "../application/services/ProductoService.js";
import VarianteService from "../application/services/VarianteService.js";
import { upload } from "../infrastructure/multer.config.js";

const router = Router();

// GET /products
router.get('/', async (_req, res) => {
  try {
    const text = `
      SELECT
          p.id,
          p.nombre,
          c.nombre AS categoria,
          COALESCE(SUM(pv.stock_actual),0) AS stock_total,
          p.stock_minimo,
          CASE
              WHEN COALESCE(SUM(pv.stock_actual),0) = 0 THEN 'Agotado'
              WHEN COALESCE(SUM(pv.stock_actual),0) <= p.stock_minimo THEN 'Stock bajo'
              ELSE 'En stock'
          END AS estado_stock,
          (SELECT precio_unitario
           FROM precios_por_cantidad
           WHERE producto_id = p.id AND cantidad_minima = 1
           LIMIT 1) AS precio_menor,
          (SELECT url
           FROM producto_imagenes
           WHERE producto_id = p.id AND es_principal = true
           LIMIT 1) AS imagen
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN producto_variantes pv ON p.id = pv.producto_id
      GROUP BY p.id, c.nombre
      ORDER BY p.id DESC;
    `;
    const { rows } = await db.query(text);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET /products/:id
router.get("/:id", async (req, res) => {
  try {
    const producto = await ProductoService.obtenerPorId(req.params.id);
    res.json(producto);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// POST /products
router.post("/", async (req, res) => {
  try {
    const nuevo = await ProductoService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// PUT /products/:id
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await ProductoService.actualizar(req.params.id, req.body);
    res.json(actualizado);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// DELETE /products/:id
router.delete("/:id", async (req, res) => {
  try {
    const msg = await ProductoService.eliminar(req.params.id);
    res.json(msg);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// ➜ Ruta para crear producto **con imagen**
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    // 1. Crear el producto (sin imagen aún)
    const producto = await ProductoService.crear(req.body);

    // 2. Si hay archivo, guardar su URL en producto_imagenes
    if (req.file) {
      const url = `http://localhost:5000/uploads/${req.file.filename}`;
      await db.query(
        `INSERT INTO producto_imagenes (producto_id, url, es_principal)
         VALUES ($1, $2, true)`,
        [producto.id, url]
      );
    }

    res.status(201).json(producto);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});


// ===== VARIANTES =====
// GET /products/:id/variantes
router.get("/:id/variantes", async (req, res) => {
  try {
    const lista = await VarianteService.listarPorProducto(req.params.id);
    res.json(lista);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// POST /products/:id/variantes
router.post("/:id/variantes", async (req, res) => {
  try {
    const nueva = await VarianteService.crear({ ...req.body, producto_id: req.params.id });
    res.status(201).json(nueva);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// PUT /products/:productId/variantes/:varianteId
router.put("/:productId/variantes/:varianteId", async (req, res) => {
  try {
    const updated = await VarianteService.actualizar(req.params.varianteId, req.body);
    res.json(updated);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// DELETE /products/:productId/variantes/:varianteId
router.delete("/:productId/variantes/:varianteId", async (req, res) => {
  try {
    const msg = await VarianteService.eliminar(req.params.varianteId);
    res.json(msg);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

export default router;