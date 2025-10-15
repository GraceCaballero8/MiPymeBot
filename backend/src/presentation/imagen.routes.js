import express from 'express';
import db from '../infrastructure/config/db.js';
import { upload } from '../infrastructure/multer.config.js';

const router = express.Router();

/*
POST /api/imagenes/subir
Body: form-data
  - producto_id (int)
  - es_principal (bool)  
  - imagen (file)        
Respuesta: { id, url, es_principal }
*/
router.post('/subir', upload.single('imagen'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Archivo no válido' });

  const { producto_id, es_principal = false } = req.body;

  const url = `${process.env.BACK_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;

  try {
    // Si es_principal=true, quitamos la marca a las demás del mismo producto
    if (es_principal === 'true') {
      await db.query(
        'UPDATE producto_imagenes SET es_principal = false WHERE producto_id = $1',
        [producto_id]
      );
    }

    const { rows } = await db.query(
      `INSERT INTO producto_imagenes (producto_id, url, es_principal)
       VALUES ($1, $2, $3) RETURNING *`,
      [producto_id, url, es_principal === 'true']
    );

    res.status(201).json(rows[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;