import { pdf } from "@react-pdf/renderer";
import { CVDocument } from "./CVPdf.jsx";
import { Document, Packer, Paragraph, TextRun, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import { cvData } from "./cvData.js";

// ── PDF con @react-pdf/renderer (páginas A4 reales, links clickeables) ──
export async function downloadPDF() {
  const blob = await pdf(<CVDocument />).toBlob();
  saveAs(blob, "CV_Pedro_Bedon.pdf");
}

// ── Word limpio y estructurado ──
export async function downloadWord() {
  const {
    name, title, contact, summary,
    experience, projects, skills,
    education, certifications, languages,
  } = cvData;

  const secTitle = (t) =>
    new Paragraph({
      children: [new TextRun({ text: t.toUpperCase(), bold: true, size: 22, color: "111111" })],
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "AAAAAA" } },
      spacing: { before: 320, after: 100 },
    });

  const subTitle = (t) =>
    new Paragraph({
      children: [new TextRun({ text: t, bold: true, size: 18, color: "444444" })],
      spacing: { before: 140, after: 40 },
    });

  const bul = (t) =>
    new Paragraph({
      text: t,
      bullet: { level: 0 },
      spacing: { after: 40 },
      run: { size: 20, color: "333333" },
    });

  const logro = (t) =>
    new Paragraph({
      children: [new TextRun({ text: "▸  " + t, size: 19, color: "333333" })],
      spacing: { after: 40 },
    });

  const children = [
    // Header
    new Paragraph({
      children: [new TextRun({ text: name, bold: true, size: 44, color: "000000" })],
    }),
    new Paragraph({
      children: [new TextRun({ text: title, size: 20, color: "555555" })],
      spacing: { after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `${contact.location}  |  ${contact.phone}  |  `, size: 18, color: "666666" }),
        new TextRun({ text: contact.email, size: 18, color: "1a4fa0" }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Portfolio: ", size: 18, color: "666666" }),
        new TextRun({ text: contact.portfolio, size: 18, color: "1a4fa0" }),
        new TextRun({ text: "   GitHub: ", size: 18, color: "666666" }),
        new TextRun({ text: "github.com/PBedon47", size: 18, color: "1a4fa0" }),
      ],
      spacing: { after: 240 },
    }),

    // Resumen
    secTitle("Resumen Profesional"),
    new Paragraph({
      children: [new TextRun({ text: summary, size: 20, italics: true, color: "333333" })],
      spacing: { after: 120 },
    }),

    // Experiencia
    secTitle("Experiencia Profesional"),
  ];

  for (const exp of experience) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: exp.role, bold: true, size: 22 }),
          new TextRun({ text: `   |   ${exp.period}`, size: 18, color: "888888" }),
        ],
        spacing: { before: 180 },
      }),
      new Paragraph({
        children: [new TextRun({ text: `${exp.company}  ·  ${exp.modality}`, size: 19, italics: true, color: "666666" })],
        spacing: { after: 60 },
      }),
      subTitle("Funciones y Responsabilidades"),
      ...exp.functions.map(bul)
    );
    if (exp.project) {
      children.push(subTitle(exp.project.title), ...exp.project.bullets.map(bul));
    }
    if (exp.techTags) {
      children.push(
        subTitle("Tecnologías Utilizadas"),
        new Paragraph({ children: [new TextRun({ text: exp.techTags.join("  ·  "), size: 19, color: "333333" })], spacing: { after: 60 } })
      );
    }
    if (exp.aiTools) {
      children.push(
        subTitle("Herramientas de IA"),
        new Paragraph({ children: [new TextRun({ text: exp.aiTools.join("  ·  "), size: 19, color: "333333" })], spacing: { after: 60 } })
      );
    }
    if (exp.logros) {
      children.push(subTitle("Logros"), ...exp.logros.map(logro));
    }
  }

  // Proyectos
  children.push(secTitle("Proyectos Destacados"));
  for (const p of projects) {
    children.push(
      new Paragraph({ children: [new TextRun({ text: p.name, bold: true, size: 22 })], spacing: { before: 120 } }),
      new Paragraph({ children: [new TextRun({ text: p.desc, size: 20, color: "333333" })] }),
      new Paragraph({ children: [new TextRun({ text: p.tech, size: 18, italics: true, color: "777777" })], spacing: { after: 80 } })
    );
  }

  // Skills
  children.push(secTitle("Conocimientos Técnicos"));
  for (const [group, tags] of Object.entries(skills)) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${group}: `, bold: true, size: 20 }),
          new TextRun({ text: tags.join(", "), size: 20, color: "333333" }),
        ],
        spacing: { after: 40 },
      })
    );
  }

  // Educación
  children.push(secTitle("Educación"));
  for (const e of education) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: e.school, bold: true, size: 22 }),
          new TextRun({ text: `  —  ${e.degree}  (${e.status})`, size: 20, color: "333333" }),
        ],
      })
    );
  }

  // Certificaciones
  children.push(
    secTitle("Certificaciones"),
    new Paragraph({ children: [new TextRun({ text: certifications.join("  ·  "), size: 20, color: "333333" })] })
  );

  // Idiomas
  children.push(
    secTitle("Idiomas"),
    new Paragraph({
      children: languages.flatMap((l, i) => [
        new TextRun({ text: `${l.lang}: `, bold: true, size: 20 }),
        new TextRun({ text: l.level + (i < languages.length - 1 ? "     " : ""), size: 20 }),
      ]),
    })
  );

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 }, // Letter: 8.5x11 in twips
          margin: { top: 720, right: 900, bottom: 720, left: 900 },
        },
      },
      children,
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "CV_Pedro_Bedon.docx");
}
