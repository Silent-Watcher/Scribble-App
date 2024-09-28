import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function verifyPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
