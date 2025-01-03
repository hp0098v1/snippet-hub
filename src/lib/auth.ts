import * as jose from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function createSessionToken(userId: string) {
  const token = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
  
  return token
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, secret)
    return payload.userId as string
  } catch {
    return null
  }
} 