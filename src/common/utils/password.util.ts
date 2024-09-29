export async function hashPassword(password: string): Promise<string> {
  const hash = await Bun.password.hash(password);
  return hash;
}

export async function verifyPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  return await Bun.password.verify(password, hash);
}
