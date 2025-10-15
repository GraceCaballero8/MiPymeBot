import bcrypt from 'bcrypt';
const hash = '$2b$10$qRde70XalbcZAVq8dlXogeZsYVwW.X8uMAwM43ljOYcioLlnPMNPa';
const ok   = await bcrypt.compare('admin123', hash);
console.log(ok); 