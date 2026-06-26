# Assets pendientes — Diseño MueblAR

El maquetado replica los diseños de Figma con **Tailwind CSS v4**. Las fotos del
diseño **no venían en los archivos**, así que se usan **placeholders** (degradados
tonales) mediante el componente `src/components/ui/Figure.jsx`. Todo lo demás
(layout, tipografía, colores, textos) ya es fiel al diseño.

## 1. Tipografías — ✅ ya instaladas (Google Fonts)

Cargadas en `index.html`:

- **Playfair Display** → titulares serif (`font-display`).
- **Inter** → texto y labels (`font-sans`).

> El **logotipo "MueblAR"** del diseño usa una fuente geométrica personalizada.
> Está aproximado en `src/components/layout/Logo.jsx` como texto estilizado.
> Si tienes el SVG/fuente real del logo, reemplázalo ahí.

## 2. Imágenes — ✅ ya incluidas (extraídas de los diseños de Figma)

Las fotos se **recortaron de los PNG de Figma** y están en `public/images/`, ya
conectadas a cada componente vía el prop `src` de `Figure`:

| Archivo | Componente | Origen (diseño) |
|---|---|---|
| `hero-sala.jpg` | `components/home/Hero.jsx` | Main NoLogin (sala) |
| `lidar-scan.jpg` | `components/home/LidarSection.jsx` | Main NoLogin (escaneo) |
| `cat-sillas/mesas/lamparas/decoracion.jpg` | `components/home/CategoryShowcase.jsx` | Main NoLogin (bento) |
| `forgot-aside.jpg` | `pages/ForgotPasswordPage.jsx` (`AsideArt`) | ForgottenPassword |
| `partners-showroom.jpg` | `pages/PartnersPage.jsx` (`PartnersHero`) | Partners NoLogin |
| `partners-cta.jpg` | `pages/PartnersPage.jsx` (`PartnersCta`) | Partners NoLogin |
| `app-screenshot.jpg` | `pages/DownloadPage.jsx` (`PhoneMockup`) | Download Page |

> **Calidad**: son recortes de capturas del diseño (resolución limitada). Si tienes
> los **originales en alta resolución**, sólo reemplaza el archivo del mismo nombre
> en `public/images/` — no hace falta tocar código. Para las tarjetas de categoría
> se recortó sólo la **foto** (sin el título incrustado), porque el título lo pone
> el componente como texto real. En `DownloadPage`, el screenshot ya trae la UI de
> la app, por lo que se quitó el overlay de texto para no duplicarlo.

Si un `Figure` se queda **sin** `src`, automáticamente muestra un degradado tonal
como respaldo (placeholder), así nunca se ve una imagen rota.

## 3. Iconos — ✅ resueltos como SVG inline

En `src/components/ui/icons.jsx` (flecha, pin de mapa, estrellas, Play Store). No
requieren instalar nada. Si prefieres una librería (ej. `lucide-react`), puedes
sustituirlos.

> La **badge oficial de Google Play** es un recurso de marca. `StoreBadge.jsx` usa
> una reconstrucción; si necesitas la oficial, descárgala del brand kit de Google.

## 4. Pantallas no incluidas en el diseño

- **Registro**: no había diseño Figma; se construyó consistente con el de Login.
- **Catálogo**: el enlace del nav apunta a la sección de categorías de la Home
  (`/#categorias`) porque no existe diseño/página de catálogo todavía.
