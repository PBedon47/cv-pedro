import React, { useRef, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CVDocument } from "./CVPdf.jsx";
import { cvData } from "./cvData";
import { downloadWord } from "./downloadUtils.jsx";
import "./CV.css";

function Tag({ children, highlight }) {
  return <span className={`tag${highlight ? " tag--hi" : ""}`}>{children}</span>;
}

function SectionTitle({ children }) {
  return <p className="section-title">{children}</p>;
}

function SubTitle({ children }) {
  return <p className="sub-title">{children}</p>;
}

export default function CV() {
  const [loadingWord, setLoadingWord] = useState(false);

  const handleWord = async () => {
    setLoadingWord(true);
    try { await downloadWord(); } catch (e) { alert("Error al generar Word."); }
    setLoadingWord(false);
  };

  const {
    name, title, contact, summary, experience,
    projects, skills, highlightSkills,
    education, certifications, languages,
  } = cvData;

  return (
    <div className="cv-root">

      {/* ── Botones de descarga ── */}
      <div className="cv-actions">
        <button className="btn-dl" onClick={handleWord} disabled={loadingWord}>
          {loadingWord ? "Generando..." : "⬇ Descargar Word"}
        </button>

        {/* PDF real con @react-pdf/renderer */}
        <PDFDownloadLink
          document={<CVDocument />}
          fileName="CV_Pedro_Bedon.pdf"
          className="btn-dl btn-dl--primary"
        >
          {({ loading }) => loading ? "Preparando PDF..." : "⬇ Descargar PDF"}
        </PDFDownloadLink>
      </div>

      {/* ── Vista previa del CV (para referencia visual) ── */}
      <div className="cv-paper" id="cv-content">

        {/* HEADER */}
        <div className="cv-header">
          <h1 className="cv-name">{name}</h1>
          <p className="cv-title">{title}</p>
          <div className="cv-contact">
            <span>📍 {contact.location}</span>
            <span>📞 {contact.phone}</span>
            <span>✉️ <a href={`mailto:${contact.email}`}>{contact.email}</a></span>
            <span>🌐 <a href={contact.portfolio} target="_blank" rel="noreferrer">Portfolio</a></span>
            <span>💻 <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a></span>
            <span>🔗 <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></span>
          </div>
        </div>

        {/* RESUMEN */}
        <div className="cv-section">
          <SectionTitle>Resumen Profesional</SectionTitle>
          <p className="cv-summary">{summary}</p>
        </div>

        {/* EXPERIENCIA */}
        <div className="cv-section">
          <SectionTitle>Experiencia Profesional</SectionTitle>
          {experience.map((exp, i) => (
            <div key={i} className="exp-item">
              <div className="exp-header">
                <span className="exp-role">{exp.role}</span>
                <span className="exp-period">{exp.period}</span>
              </div>
              <p className="exp-company">{exp.company} · {exp.modality}</p>

              <SubTitle>Funciones y Responsabilidades</SubTitle>
              <ul className="exp-bullets">
                {exp.functions.map((f, j) => <li key={j}>{f}</li>)}
              </ul>

              {exp.project && (
                <>
                  <SubTitle>{exp.project.title}</SubTitle>
                  <ul className="exp-bullets">
                    {exp.project.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </>
              )}

              {exp.techTags && (
                <>
                  <SubTitle>Tecnologías Utilizadas</SubTitle>
                  <div className="tag-group">
                    {exp.techTags.map((t) => <Tag key={t} highlight={highlightSkills.includes(t)}>{t}</Tag>)}
                  </div>
                </>
              )}

              {exp.aiTools && (
                <>
                  <SubTitle>Herramientas de IA</SubTitle>
                  <div className="tag-group">
                    {exp.aiTools.map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                </>
              )}

              {exp.logros && (
                <>
                  <SubTitle>Logros</SubTitle>
                  {exp.logros.map((l, j) => (
                    <p key={j} className="logro-item">▸ {l}</p>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        {/* PROYECTOS */}
        <div className="cv-section">
          <SectionTitle>Proyectos Destacados</SectionTitle>
          {projects.map((p, i) => (
            <div key={i} className="proj-item">
              <p className="proj-name">{p.name}</p>
              <p className="proj-desc">{p.desc}</p>
              <p className="proj-tech">{p.tech}</p>
            </div>
          ))}
        </div>

        {/* HABILIDADES */}
        <div className="cv-section">
          <SectionTitle>Conocimientos Técnicos</SectionTitle>
          <div className="skills-grid">
            {Object.entries(skills).map(([group, tags]) => (
              <div key={group}>
                <p className="skill-group-title">{group}</p>
                <div className="tag-group">
                  {tags.map((t) => <Tag key={t} highlight={highlightSkills.includes(t)}>{t}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCACIÓN */}
        <div className="cv-section">
          <SectionTitle>Educación</SectionTitle>
          {education.map((e, i) => (
            <div key={i} className="edu-row">
              <div>
                <p className="edu-school">{e.school}</p>
                <p className="edu-degree">{e.degree}</p>
              </div>
              <span className="exp-period">{e.status}</span>
            </div>
          ))}
        </div>

        {/* CERTIFICACIONES */}
        <div className="cv-section">
          <SectionTitle>Certificaciones</SectionTitle>
          <div className="tag-group">
            {certifications.map((c) => <Tag key={c}>{c}</Tag>)}
          </div>
        </div>

        {/* IDIOMAS */}
        <div className="cv-section" style={{ marginBottom: 0 }}>
          <SectionTitle>Idiomas</SectionTitle>
          <div className="lang-row">
            {languages.map((l) => (
              <span key={l.lang} className="lang-item">
                <strong>{l.lang}</strong> — {l.level}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
