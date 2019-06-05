export class User {
  id: number;
  clinic_id: number;
  clinic_name: string;
  username: string;
  password: string;
  name: string;
  lastname: string;
  phone: number;
  rol: string;
  available: number;
  token?: string;
  updated_at: string;
  created_at: string;

  constructor(id, clinic_id, clinic_name, username, password, name, lastname, phone, rol, available, token, updated_at, created_at) {
    this.id = id;
    this.clinic_id = clinic_id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.rol = rol;
    this.available = available;
    this.token = token;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}
