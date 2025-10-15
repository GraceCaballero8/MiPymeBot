import { Router } from "express";
import AuthService from "../application/services/AuthService.js";

const router = Router();

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await AuthService.login(email, password);
    res.json({ usuario });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  const { dni, nombres, apellidos, email, password, rol} = req.body;
  try {
    const response = await AuthService.register(
      dni,
      nombres,
      apellidos,
      email,
      password,
      rol
    );
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/me", async (req, res) => {
  const { token } = req.body;
  try {
    const response = await AuthService.register(
      dni,
      nombres,
      apellidos,
      email,
      password,
      rol
    );
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
export default router;
