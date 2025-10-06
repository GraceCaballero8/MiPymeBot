import { Router } from "express";
import CategoriaService from "../application/services/CategoriaService.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const lista = await CategoriaService.listar();
    res.json(lista);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cat = await CategoriaService.obtenerPorId(req.params.id);
    res.json(cat);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const nueva = await CategoriaService.crear(req.body);
    res.status(201).json(nueva);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await CategoriaService.actualizar(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const msg = await CategoriaService.eliminar(req.params.id);
    res.json(msg);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

export default router;