import { Router } from "express";
import ProductoService from "../application_services/ProductoService.js";
import VarianteService from "../application/services/VarianteService.js";

const router = Router();

// GET /products
router.get("/", async (_req, res) => {
  try {
    const productos = await ProductoService.listar();
    res.json(productos);
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

// /products/:id/variantes
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