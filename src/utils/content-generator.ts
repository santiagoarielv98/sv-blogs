import { faker } from "@faker-js/faker";

const codeSnippets = [
  {
    language: "typescript",
    code: `interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (id: string): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
};`,
  },
  {
    language: "javascript",
    code: `function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
  },
  {
    language: "css",
    code: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}`,
  },
];

export function generateBlogContent(): string {
  const sections = faker.number.int({ min: 4, max: 6 });
  let content = `<p class="lead">${faker.lorem.paragraph(2)}</p>\n\n`;

  for (let i = 0; i < sections; i++) {
    // Añadir un encabezado de sección
    content += `<h2>${faker.lorem.sentence()}</h2>\n\n`;

    // Generar 2-4 párrafos por sección
    const paragraphs = faker.number.int({ min: 2, max: 4 });
    for (let j = 0; j < paragraphs; j++) {
      // Alternar entre diferentes tipos de contenido
      const contentType = faker.number.int({ min: 1, max: 5 });

      switch (contentType) {
        case 1:
          // Párrafo normal
          content += `<p>${faker.lorem.paragraph()}</p>\n\n`;
          break;

        case 2:
          // Lista desordenada
          content += `<ul>\n${Array.from({ length: 4 })
            .map(() => `  <li>${faker.lorem.sentence()}</li>`)
            .join("\n")}\n</ul>\n\n`;
          break;

        case 3:
          // Blockquote
          content += `<blockquote>\n  <p>${faker.lorem.sentence()}</p>\n  <cite>— ${faker.person.fullName()}</cite>\n</blockquote>\n\n`;
          break;

        case 4:
          // Código
          const snippet = faker.helpers.arrayElement(codeSnippets);
          content += `<pre><code class="language-${snippet.language}">${snippet.code}</code></pre>\n\n`;
          break;

        case 5:
          // Lista ordenada
          content += `<ol>\n${Array.from({ length: 3 })
            .map(() => `  <li>${faker.lorem.sentence()}</li>`)
            .join("\n")}\n</ol>\n\n`;
          break;
      }
    }
  }

  return content.trim();
}
