import UsuarioRepository from "../../infrastructure/repositories/UsuarioRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const CLAVE_SECRETA="12345"

class AuthService {
  static async login(email, password) {
    const user = await UsuarioRepository.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const match = await bcrypt.compare(password, user.contrasena);
    if (!match) throw new Error("Contraseña incorrecta");

    // ➜ Genera el token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      CLAVE_SECRETA,
      { expiresIn: "7d" }
    );

    return {
      usuario: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
      },
      token,
    };

    //return user.nombres;
  }

  static async register(dni, nombres, apellidos, email, password, rol) {
    const existing = await UsuarioRepository.findByEmail(email);
    if (existing) throw new Error("El correo ya está registrado");

    if (!password) throw new Error("La contraseña es obligatoria"); 

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UsuarioRepository.create({
      dni,
      nombres,
      apellidos,
      email,
      contrasena: hashedPassword,
      rol,
    });

    const token  = await jwt.sign({
      email:newUser.email,
      id:newUser.id
    },CLAVE_SECRETA)

    const formatResponse={
      usuario:{
        nombres:newUser.nombres,
        apellidos: newUser.apellidos,
        email: newUser.email,
      },
      token
    }

    return formatResponse;
  }
}

export default AuthService;
