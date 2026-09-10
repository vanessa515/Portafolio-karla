export type Project = {
  id: number;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "CRM Ponchados México",
    category: "CRM / SISTEMA WEB",
    year: "2026",
    description:
      "Sistema CRM desarrollado para administrar prospectos, registrar llamadas, dar seguimiento comercial y centralizar la información necesaria para el proceso de prospección.",
    technologies: [
      "PHP",
      "MySQL",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    featured: true,
  },

  {
    id: 2,
    number: "02",
    title: "GIRO",
    category: "SISTEMA WEB",
    year: "2025",
    description:
      "Sistema web desarrollado como parte de mi experiencia profesional en GIRO, enfocado en digitalizar y facilitar procesos internos.",
    technologies: [
      "Web Development",
      "Database",
      "UX/UI",
    ],
    url: "https://testing.giro.com.mx/",
  },

  {
    id: 3,
    number: "03",
    title: "Innovative Net",
    category: "DESARROLLO WEB",
    year: "2023",
    description:
      "Sitio web corporativo desarrollado para presentar servicios y soluciones de infraestructura tecnológica.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive",
    ],
    url: "https://www.innovative-net.mx/",
  },

  {
    id: 4,
    number: "04",
    title: "Deshidratadora MMH",
    category: "DESARROLLO WEB",
    year: "2024",
    description:
      "Sitio web comercial desarrollado para una empresa dedicada a la deshidratación de frutas y productos naturales.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "GitHub Pages",
    ],
    url: "https://vanessa515.github.io/MMH.github.io/",
  },

  {
    id: 5,
    number: "05",
    title: "Malibu Bubble Tea",
    category: "SISTEMA DE VENTAS",
    year: "2023",
    description:
      "Sistema desarrollado para gestionar procesos de venta y operación de un negocio de bebidas.",
    technologies: [
      "Software",
      "Database",
      "Sales System",
    ],
    github: "https://github.com/vanessa515",
  },
];