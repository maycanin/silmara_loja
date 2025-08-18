// Importa o seu backend (o worker) que agora está em uma pasta acima.
import app from '../src/worker/index';

export const onRequest: PagesFunction = async ({ request, next, env }) => {
  const url = new URL(request.url);
  
  if (url.pathname.startsWith('/api/')) {
    try {
      return app.fetch(request, env);
    } catch (err) {
      // Adicionada a verificação para garantir que 'err' é um objeto de erro
      if (err instanceof Error) {
        return new Response(err.stack || "Internal Server Error", { status: 500 });
      }
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  return next();
};
