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

    return user.nombres;
  }

  static async register(dni, nombres, apellidos, email, password) {
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
