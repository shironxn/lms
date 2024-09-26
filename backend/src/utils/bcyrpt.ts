import bcrypt from "bcrypt";

export interface IBcrypt {
  hashPassword(password: string): Promise<string | null>;
  comparePassword(password: string, hashPassword: string): Promise<boolean>;
}

export class Bcrypt implements IBcrypt {
  async hashPassword(password: string): Promise<string | null> {
    return bcrypt.hash(password, "tes11");
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
