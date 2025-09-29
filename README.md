# Heroes APP

Aplicación web para explorar, buscar y gestionar héroes y villanos, construida con React, Vite, TypeScript, TanStack Query, TailwindCSS y Radix UI.

---

## Tabla de Contenidos
- [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
- [Estructura y Arquitectura](#estructura-y-arquitectura)
- [Referencia de la API](#referencia-de-la-api)
- [Eventos y Contextos](#eventos-y-contextos)
- [Troubleshooting](#troubleshooting)
- [Dependencias Principales](#dependencias-principales)

---

## Instalación y Puesta en Marcha

1. Clona el repositorio:
	 ```bash
	 git clone <repo-url>
	 cd 05-heroes-app
	 ```
2. Copia el archivo `.env.template` a `.env` y configura las variables de entorno necesarias.
3. Instala las dependencias:
	 ```bash
	 npm install
	 ```
4. Inicia el entorno de desarrollo:
	 ```bash
	 npm run dev
	 ```
5. Para construir el proyecto para producción:
	 ```bash
	 npm run build
	 ```
6. Para ejecutar pruebas:
	 ```bash
	 npm test
	 ```

---

## Estructura y Arquitectura

El proyecto sigue una arquitectura modular basada en features y separation of concerns:

```
src/
	├── admin/                # Sección administrativa
	├── components/           # Componentes reutilizables (UI y custom)
	├── heroes/               # Dominio principal: lógica, hooks, API, tipos, páginas
	│     ├── actions/        # Llamadas y lógica de negocio para la API
	│     ├── api/            # Configuración de axios y tests de API
	│     ├── components/     # Componentes específicos de héroes
	│     ├── context/        # Contextos globales (ej: favoritos)
	│     ├── hooks/          # Custom hooks
	│     ├── layout/         # Layouts específicos
	│     ├── pages/          # Páginas de héroes
	│     ├── types/          # Tipos TypeScript
	├── hooks/                # Hooks globales
	├── lib/                  # Utilidades
	├── router/               # Configuración de rutas
	├── main.tsx              # Entry point
	└── HeroesApp.tsx         # Componente raíz
```

### Principios y Patrones
- **React + TypeScript**: Tipado estricto y componentes funcionales.
- **TanStack Query**: Manejo de datos asíncronos y cache.
- **Context API**: Estado global para favoritos.
- **TailwindCSS**: Estilos utilitarios y responsivos.
- **Radix UI**: Componentes accesibles y personalizables.

---

## Referencia de la API

### Endpoints principales

- **GET /api/heroes**
	- Parámetros: `limit`, `offset`, `category`
	- Respuesta: `{ total, pages, heroes: Hero[] }`

- **GET /api/heroes/:id**
	- Respuesta: `Hero`

- **GET /api/heroes/summary**
	- Respuesta: `SummaryInformationResponse`

#### Tipos principales

```ts
// Hero
interface Hero {
	id: string;
	name: string;
	slug: string;
	alias: string;
	powers: string[];
	description: string;
	strength: number;
	intelligence: number;
	speed: number;
	durability: number;
	team: string;
	image: string;
	firstAppearance: string;
	status: string;
	category: string;
	universe: string;
}

// SummaryInformationResponse
interface SummaryInformationResponse {
	totalHeroes: number;
	strongestHero: Hero;
	smartestHero: Hero;
	heroCount: number;
	villainCount: number;
}
```

---

## Eventos y Contextos

### Contexto de Favoritos

El contexto `FavoriteHeroContext` permite:
- Agregar o quitar héroes favoritos (`toggleFavorite(hero)`)
- Consultar si un héroe es favorito (`isHeroFavorite(hero)`)
- Persistencia automática en localStorage

### Ejemplo de uso

```tsx
import { useContext } from 'react';
import { FavoriteHeroContext } from '@/heroes/context/FavoriteHeroContext';

const { favorites, toggleFavorite, isHeroFavorite } = useContext(FavoriteHeroContext);
```

---

## Troubleshooting

### Problemas comunes

- **No se guardan favoritos:**
	- Verifica que el contexto se inicializa con `getFavoritesFromLocalStorage()`.
	- Asegúrate de no tener errores de tipado en el contexto.

- **Error de build: 'VariantProps' is a type and must be imported using a type-only import:**
	- Soluciona usando: `import type { VariantProps } from "class-variance-authority";`

- **Hydration error: <li> cannot be a descendant of <li>:**
	- No anides `<li>` dentro de `<li>`. Usa solo componentes de lista válidos.

- **Type 'undefined' is not assignable to type 'Hero[]':**
	- Asegúrate de pasar siempre un array: `<HeroGrid heroes={heroes || []} />`

- **AxiosError: Unsupported protocol htt:**
	- Verifica que la variable de entorno `VITE_API_URL` tenga el protocolo correcto (`http://` o `https://`).

---

## Dependencias Principales

- React 19
- Vite
- TypeScript
- TanStack Query
- TailwindCSS
- Radix UI
- Axios
- Vitest (testing)

---

## Contacto y soporte

Para dudas, sugerencias o soporte, abre un issue en el repositorio o contacta al equipo de desarrollo.