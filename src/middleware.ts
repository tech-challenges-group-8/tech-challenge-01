import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('auth')?.value;
  const { pathname } = request.nextUrl;
  const method = request.method;

  const isRoot = pathname === '/';
  const isAuth = auth === 'true';

  // Rotas públicas (permitir acesso sem autenticação)
  const publicPaths = ['/', '/api/auth', '/api/user'];

  // Se está na raiz e já está autenticado, redireciona para dashboard
  if (isRoot && isAuth) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Se não está autenticado e tenta acessar uma rota que não é pública, redireciona para '/'
  if (!isAuth && !publicPaths.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|.*\\..*|favicon.ico).*)',
  ],
};
