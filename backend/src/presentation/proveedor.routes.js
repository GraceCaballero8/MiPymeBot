import { Router } from "express";
import ProveedorService from "../application/services/ProveedorService.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const lista = await ProveedorService.listar();
    res.json(lista);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const prov = await ProveedorService.obtenerPorId(req.params.id);
    res.json(prov);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevo = await ProveedorService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await ProveedorService.actualizar(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const msg = await ProveedorService.eliminar(req.params.id);
    res.json(msg);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

export default router;