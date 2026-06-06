import React from "react";
import {
  Document, Page, Text, View, Link, StyleSheet,
} from "@react-pdf/renderer";
import { cvData } from "./cvData";

const C = {
  black:     "#1a1a1a",
  gray:      "#555555",
  lightGray: "#888888",
  border:    "#cccccc",
  tag:       "#f0ede8",
  tagText:   "#444444",
  hiTag:     "#ddeeff",
  hiText:    "#1a4fa0",
  white:     "#ffffff",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.black,
    backgroundColor: C.white,
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 44,
  },
  header: { borderBottomWidth: 1.5, borderBottomColor: C.black, paddingBottom: 10, marginBottom: 14 },
  name: { fontSize: 26, fontFamily: "Helvetica-Bold", letterSpacing: -0.3, marginBottom: 3 },
  titleText: { fontSize: 8, color: C.gray, letterSpacing: 1.2, marginBottom: 8 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  contactItem: { flexDirection: "row", alignItems: "center", marginRight: 14, marginBottom: 2 },
  contactText: { fontSize: 8, color: C.gray },
  contactLink: { fontSize: 8, color: C.hiText },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.4,
    color: C.black,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
    paddingBottom: 3,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: C.lightGray,
    letterSpacing: 0.6,
    marginTop: 7,
    marginBottom: 3,
  },
  projDesc: { fontSize: 8.5, color: C.gray, lineHeight: 1.55, fontFamily: "Helvetica-Oblique", marginBottom: 4 },
  summary: { fontSize: 9, color: C.gray, lineHeight: 1.7, fontFamily: "Helvetica-Oblique" },
  expItem: { marginBottom: 12 },
  expHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 1 },
  expRole: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.black },
  expPeriod: { fontSize: 7.5, color: C.lightGray },
  expCompany: { fontSize: 8.5, color: C.gray, fontFamily: "Helvetica-Oblique", marginBottom: 4 },
  bulletRow: { flexDirection: "row", marginBottom: 2, paddingLeft: 2 },
  bulletDash: { fontSize: 8, color: C.border, marginRight: 5, marginTop: 0.5 },
  bulletText: { fontSize: 8.5, color: C.gray, lineHeight: 1.55, flex: 1 },
  logroRow: { flexDirection: "row", marginBottom: 2, paddingLeft: 2 },
  logroArrow: { fontSize: 7, color: C.lightGray, marginRight: 5, marginTop: 1 },
  logroText: { fontSize: 8.5, color: C.gray, lineHeight: 1.55, flex: 1 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 3, marginTop: 3 },
  tag: { fontSize: 7.5, color: C.tagText, backgroundColor: C.tag, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 3 },
  tagHi: { fontSize: 7.5, color: C.hiText, backgroundColor: C.hiTag, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 3, fontFamily: "Helvetica-Bold" },
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  skillCol: { width: "30%", marginBottom: 6 },
  skillGroupTitle: { fontSize: 7, fontFamily: "Helvetica-Bold", color: C.lightGray, letterSpacing: 0.7, marginBottom: 3 },
  eduRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  eduSchool: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  eduDegree: { fontSize: 8.5, color: C.gray, fontFamily: "Helvetica-Oblique" },
  projItem: { marginBottom: 8 },
  projName: { fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  projDescStand: { fontSize: 8.5, color: C.gray, lineHeight: 1.55 },
  projTech: { fontSize: 7.5, color: C.lightGray, fontFamily: "Helvetica-Oblique", marginTop: 1 },
  certRow: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  langRow: { flexDirection: "row", gap: 20 },
  langItem: { fontSize: 8.5, color: C.gray },
  langBold: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: C.black },
  pageNumber: { position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", fontSize: 7, color: C.border },
});

const SectionTitle = ({ children }) => <Text style={s.sectionTitle}>{children.toUpperCase()}</Text>;
const SubTitle = ({ children }) => <Text style={s.subTitle}>{children.toUpperCase()}</Text>;
const Bullet = ({ text }) => (
  <View style={s.bulletRow}>
    <Text style={s.bulletDash}>—</Text>
    <Text style={s.bulletText}>{text}</Text>
  </View>
);
const Logro = ({ text }) => (
  <View style={s.logroRow}>
    <Text style={s.logroArrow}>▸</Text>
    <Text style={s.logroText}>{text}</Text>
  </View>
);
const Tag = ({ children, hi }) => <Text style={hi ? s.tagHi : s.tag}>{children}</Text>;
const PageNum = () => (
  <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
);

export function CVDocument() {
  const { name, title, contact, summary, experience, projects, skills, highlightSkills, education, certifications, languages } = cvData;

  return (
    <Document title={`CV — ${name}`} author={name} subject="Curriculum Vitae">

      {/* ── PÁGINA 1 — Header + Resumen + Experiencia Empresoft ── */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{name}</Text>
          <Text style={s.titleText}>{title.toUpperCase()}</Text>
          <View style={s.contactRow}>
            <View style={s.contactItem}><Text style={s.contactText}>📍 {contact.location}  </Text></View>
            <View style={s.contactItem}><Text style={s.contactText}>📞 {contact.phone}  </Text></View>
            <View style={s.contactItem}>
              <Text style={s.contactText}>✉ </Text>
              <Link src={`mailto:${contact.email}`} style={s.contactLink}>{contact.email}</Link>
            </View>
            <View style={s.contactItem}>
              <Text style={s.contactText}>🌐 </Text>
              <Link src={contact.portfolio} style={s.contactLink}>Portfolio</Link>
            </View>
            <View style={s.contactItem}>
              <Text style={s.contactText}>💻 </Text>
              <Link src={contact.github} style={s.contactLink}>GitHub</Link>
            </View>
            <View style={s.contactItem}>
              <Text style={s.contactText}>🔗 </Text>
              <Link src={contact.linkedin} style={s.contactLink}>LinkedIn</Link>
            </View>
          </View>
        </View>

        <View style={s.section}>
          <SectionTitle>Resumen Profesional</SectionTitle>
          <Text style={s.summary}>{summary}</Text>
        </View>

        <View style={s.section}>
          <SectionTitle>Experiencia Profesional</SectionTitle>
          {(() => {
            const exp = experience[0];
            return (
              <View style={s.expItem}>
                <View style={s.expHeader}>
                  <Text style={s.expRole}>{exp.role}</Text>
                  <Text style={s.expPeriod}>{exp.period}</Text>
                </View>
                <Text style={s.expCompany}>{exp.company} · {exp.modality}</Text>

                <SubTitle>Funciones y Responsabilidades</SubTitle>
                {exp.functions.map((f, i) => <Bullet key={i} text={f} />)}

                {/* ── Proyecto Destacado con descripción ── */}
                <SubTitle>{exp.project.title}</SubTitle>
                <Text style={s.projDesc}>{exp.project.desc}</Text>
                {exp.project.bullets.map((b, i) => <Bullet key={i} text={b} />)}

                <SubTitle>Tecnologías Utilizadas</SubTitle>
                <View style={s.tagRow}>
                  {exp.techTags.map((t) => <Tag key={t} hi={highlightSkills.includes(t)}>{t}</Tag>)}
                </View>

                <SubTitle>Herramientas de IA Aplicadas al Desarrollo</SubTitle>
                <View style={s.tagRow}>
                  {exp.aiTools.map((t) => <Tag key={t}>{t}</Tag>)}
                </View>

                <SubTitle>Logros</SubTitle>
                {exp.logros.map((l, i) => <Logro key={i} text={l} />)}
              </View>
            );
          })()}
        </View>
        <PageNum />
      </Page>

      {/* ── PÁGINA 2 — Experiencia APM + Proyectos ── */}
      <Page size="A4" style={s.page}>
        <View style={s.section}>
          <SectionTitle>Experiencia Profesional (continuación)</SectionTitle>
          {[experience[1], experience[2]].map((exp, idx) => (
            <View key={idx} style={s.expItem}>
              <View style={s.expHeader}>
                <Text style={s.expRole}>{exp.role}</Text>
                <Text style={s.expPeriod}>{exp.period}</Text>
              </View>
              <Text style={s.expCompany}>{exp.company} · {exp.modality}</Text>
              <SubTitle>Funciones y Responsabilidades</SubTitle>
              {exp.functions.map((f, i) => <Bullet key={i} text={f} />)}
              <SubTitle>Logros</SubTitle>
              {exp.logros.map((l, i) => <Logro key={i} text={l} />)}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <SectionTitle>Proyectos Destacados</SectionTitle>
          {projects.map((p, i) => (
            <View key={i} style={s.projItem}>
              <Text style={s.projName}>{p.name}</Text>
              <Text style={s.projDescStand}>{p.desc}</Text>
              <Text style={s.projTech}>{p.tech}</Text>
            </View>
          ))}
        </View>
        <PageNum />
      </Page>

      {/* ── PÁGINA 3 — Skills + Edu + Cert + Idiomas JUNTOS, sin cortes ── */}
      <Page size="A4" style={s.page}>

        {/* Skills — wrap=false evita que se parta entre páginas */}
        <View style={s.section} wrap={false}>
          <SectionTitle>Conocimientos Técnicos</SectionTitle>
          <View style={s.skillsGrid}>
            {Object.entries(skills).map(([group, tags]) => (
              <View key={group} style={s.skillCol}>
                <Text style={s.skillGroupTitle}>{group.toUpperCase()}</Text>
                <View style={s.tagRow}>
                  {tags.map((t) => <Tag key={t} hi={highlightSkills.includes(t)}>{t}</Tag>)}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Educación, Cert e Idiomas — wrap=false los mantiene pegados a Skills */}
        <View wrap={false}>
          <View style={s.section}>
            <SectionTitle>Educación</SectionTitle>
            {education.map((e, i) => (
              <View key={i}>
                <View style={s.eduRow}>
                  <Text style={s.eduSchool}>{e.school}</Text>
                  <Text style={s.expPeriod}>{e.status}</Text>
                </View>
                <Text style={s.eduDegree}>{e.degree}</Text>
              </View>
            ))}
          </View>

          <View style={s.section}>
            <SectionTitle>Certificaciones</SectionTitle>
            <View style={s.certRow}>
              {certifications.map((c) => <Tag key={c}>{c}</Tag>)}
            </View>
          </View>

          <View style={s.section}>
            <SectionTitle>Idiomas</SectionTitle>
            <View style={s.langRow}>
              {languages.map((l) => (
                <View key={l.lang} style={{ flexDirection: "row", gap: 4 }}>
                  <Text style={s.langBold}>{l.lang}:</Text>
                  <Text style={s.langItem}>{l.level}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <PageNum />
      </Page>

    </Document>
  );
}