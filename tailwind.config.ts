import type { Config } from 'tailwindcss'

// Identité Lanterne Web. Les contrastes texte respectent AA : ne pas remplacer
// une couleur par une autre sans vérifier le contraste.
const lanterne = {
  creme: '#FAF7F2', // fond principal
  blanc: '#FFFFFF', // sections et cartes claires
  encre: '#17212E', // texte, sections sombres, pied de page
  'encre-2': '#2A3544', // bordures et fonds secondaires sur encre
  'encre-3': '#22303F', // cases de la grille de parrainage sur fond encre
  orange: '#B4501C', // boutons, prix, mot en couleur sur fond clair
  'orange-fonce': '#8F3F15', // survol des liens (maquettes)
  'orange-clair': '#E07033', // seulement sur fond encre
  eclaire: '#F9EBDF', // fond du mot éclairé
  beige: '#E8DDD0', // bordures, logo
  gris: '#5E6670', // texte secondaire sur fond clair
  'gris-clair': '#B9C0C8', // texte secondaire sur fond encre
  'fenetre-mi': '#7A4A2E', // fenêtre à moitié allumée (étape 2)
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...lanterne,
        // Anciens noms, conservés pour l'admin du blog (non public).
        // Ils pointent vers les couleurs Lanterne.
        cream: lanterne.creme,
        warmDark: lanterne.encre,
        accent: lanterne.orange,
        accent2: lanterne['encre-2'],
        mid: lanterne.beige,
        textMuted: lanterne.gris,
      },
      fontFamily: {
        sans: ['var(--font-figtree)', 'system-ui', 'sans-serif'],
        // Alias historiques (admin du blog) : tout est en Figtree.
        playfair: ['var(--font-figtree)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '4px',
        md: '6px',
        lg: '6px',
        xl: '6px',
        '2xl': '6px',
        '3xl': '6px',
        '4xl': '6px',
        '5xl': '6px',
        '6xl': '6px',
      },
      letterSpacing: {
        titre: '-0.015em',
        'titre-2': '-0.01em',
      },
    },
  },
  plugins: [],
}

export default config
