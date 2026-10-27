# Portafolio estático

- Los 5 proyectos provienen de `lib/projects.ts`, no de Supabase.
- El formulario de contacto abre un correo prellenado en la aplicación de correo del visitante; no envía ni almacena mensajes automáticamente.
- El panel `/admin` se ha retirado porque dependía de Supabase.
- No se requieren variables NEXT_PUBLIC_SUPABASE_* para la web pública.

## Ejecutar

```bash
npm install
npm run dev
```

## Publicar

Sube el contenido de la carpeta a GitHub; Vercel construirá el sitio de nuevo.
