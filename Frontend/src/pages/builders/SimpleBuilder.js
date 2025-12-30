import React, { useState } from "react";

const ResumeBuilder = ({ resume: initialResume = {} }) => {
  const [resume, setResume] = useState({
  personal: {
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    ...(initialResume.personal || {}), // ✅ ONLY FIX
  },
  summary: initialResume.summary || "",
  skills: initialResume.skills || [],
  experience: initialResume.experience || [],
  education: initialResume.education || [],
  certifications: initialResume.certifications || [],
  projects: initialResume.projects || [],
  additionalInfo: initialResume.additionalInfo || [],
});


  const updatePersonal = (k, v) =>
    setResume({ ...resume, personal: { ...resume.personal, [k]: v } });

  const addItem = (key, item) =>
    setResume({ ...resume, [key]: [...resume[key], item] });

  const updateItem = (key, i, field, value) => {
    const copy = [...resume[key]];
    copy[i][field] = value;
    setResume({ ...resume, [key]: copy });
  };

  const removeItem = (key, i) => {
    const copy = [...resume[key]];
    copy.splice(i, 1);
    setResume({ ...resume, [key]: copy });
  };

  return (
    <div className="grid grid-cols-2 h-screen font-sans">
      {/* LEFT PANEL - FORMS */}
      <div className="p-6 overflow-y-auto border-r bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Resume Builder</h1>

        <Section title="Personal Details">
          <Input
            placeholder="Full Name"
            value={resume.personal.name}
            onChange={(e) => updatePersonal("name", e.target.value)}
          />
          <Input
            placeholder="Job Title"
            value={resume.personal.role}
            onChange={(e) => updatePersonal("role", e.target.value)}
          />
          <Input
            placeholder="City, State"
            value={resume.personal.location}
            onChange={(e) => updatePersonal("location", e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={resume.personal.phone}
            onChange={(e) => updatePersonal("phone", e.target.value)}
          />
          <Input
            placeholder="Email"
            value={resume.personal.email}
            onChange={(e) => updatePersonal("email", e.target.value)}
          />
          <Input
            placeholder="LinkedIn URL"
            value={resume.personal.linkedin}
            onChange={(e) => updatePersonal("linkedin", e.target.value)}
          />
        </Section>

        <Section title="Professional Summary">
          <textarea
            className="input h-32"
            placeholder="Brief professional summary..."
            value={resume.summary}
            onChange={(e) => setResume({ ...resume, summary: e.target.value })}
          />
        </Section>

        <Section title="Work Experience">
          {resume.experience.map((ex, i) => (
            <Box key={i}>
              <Input
                placeholder="Job Title"
                value={ex.role}
                onChange={(e) =>
                  updateItem("experience", i, "role", e.target.value)
                }
              />
              <Input
                placeholder="Company Name"
                value={ex.company}
                onChange={(e) =>
                  updateItem("experience", i, "company", e.target.value)
                }
              />
              <Input
                placeholder="Location"
                value={ex.location}
                onChange={(e) =>
                  updateItem("experience", i, "location", e.target.value)
                }
              />
              <Input
                placeholder="Duration (e.g., May 2022 - Present)"
                value={ex.duration}
                onChange={(e) =>
                  updateItem("experience", i, "duration", e.target.value)
                }
              />
              <textarea
                className="input h-24"
                placeholder="Bullet points (one per line)"
                value={ex.description}
                onChange={(e) =>
                  updateItem("experience", i, "description", e.target.value)
                }
              />
              <button
                onClick={() => removeItem("experience", i)}
                className="text-red-600 text-sm mt-2"
              >
                Remove
              </button>
            </Box>
          ))}
          <AddButton
            onClick={() =>
              addItem("experience", {
                role: "",
                company: "",
                location: "",
                duration: "",
                description: "",
              })
            }
          >
            + Add Experience
          </AddButton>
        </Section>

        <Section title="Education">
          {resume.education.map((ed, i) => (
            <Box key={i}>
              <Input
                placeholder="Degree"
                value={ed.degree}
                onChange={(e) =>
                  updateItem("education", i, "degree", e.target.value)
                }
              />
              <Input
                placeholder="University/Institution"
                value={ed.institute}
                onChange={(e) =>
                  updateItem("education", i, "institute", e.target.value)
                }
              />
              <Input
                placeholder="Graduation Year"
                value={ed.year}
                onChange={(e) =>
                  updateItem("education", i, "year", e.target.value)
                }
              />
              <button
                onClick={() => removeItem("education", i)}
                className="text-red-600 text-sm mt-2"
              >
                Remove
              </button>
            </Box>
          ))}
          <AddButton
            onClick={() =>
              addItem("education", { degree: "", institute: "", year: "" })
            }
          >
            + Add Education
          </AddButton>
        </Section>

        <Section title="Additional Information">
          <Input
            placeholder="Type info & press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                addItem("additionalInfo", e.target.value.trim());
                e.target.value = "";
              }
            }}
          />
          <div className="mt-2 space-y-1">
            {resume.additionalInfo.map((info, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span>• {info}</span>
                <button
                  onClick={() => removeItem("additionalInfo", i)}
                  className="text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* RIGHT PANEL - A4 RESUME PREVIEW */}
      <div className="bg-gray-100 p-6 overflow-y-auto">
        <div
          className="mx-auto bg-white shadow-lg"
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: "15mm 20mm",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* HEADER */}
          <div className="text-center border-b-2 border-black pb-3">
            <h1 className="text-4xl font-bold uppercase tracking-wide">
              {resume.personal.name || "YOUR NAME"}
            </h1>
            <p className="text-sm mt-2">
              {[
                resume.personal.location,
                resume.personal.phone,
                resume.personal.email,
              ]
                .filter(Boolean)
                .join(" • ")}
            </p>
            {resume.personal.linkedin && (
              <p className="text-sm">{resume.personal.linkedin}</p>
            )}
          </div>

          {/* PROFESSIONAL SUMMARY */}
          {resume.summary && (
            <div className="mt-5">
              <SectionTitle>PROFESSIONAL SUMMARY</SectionTitle>
              <p className="text-sm leading-relaxed">{resume.summary}</p>
            </div>
          )}

          {/* WORK EXPERIENCE */}
          {resume.experience.length > 0 && (
            <div className="mt-5">
              <SectionTitle>WORK EXPERIENCE</SectionTitle>
              {resume.experience.map((ex, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-sm">
                      {ex.role} - {ex.company}
                      {ex.location && ` - ${ex.location}`}
                    </p>
                    <p className="text-sm italic">{ex.duration}</p>
                  </div>
                  {ex.description && (
                    <ul className="list-disc ml-5 mt-1 text-sm space-y-1">
                      {ex.description
                        .split("\n")
                        .filter((line) => line.trim())
                        .map((line, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {line.trim()}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* EDUCATION */}
          {resume.education.length > 0 && (
            <div className="mt-5">
              <SectionTitle>EDUCATION</SectionTitle>
              {resume.education.map((ed, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-sm">{ed.degree}</p>
                    <p className="text-sm italic">{ed.year}</p>
                  </div>
                  <p className="text-sm">{ed.institute}</p>
                </div>
              ))}
            </div>
          )}

          {/* ADDITIONAL INFORMATION */}
          {resume.additionalInfo.length > 0 && (
            <div className="mt-5">
              <SectionTitle>ADDITIONAL INFORMATION</SectionTitle>
              {resume.additionalInfo.map((info, i) => (
                <p key={i} className="text-sm mb-1">
                  • {info}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded font-semibold"
          >
            Download as PDF
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .mx-auto.bg-white, .mx-auto.bg-white * {
            visibility: visible;
          }
          .mx-auto.bg-white {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            box-shadow: none;
          }
        }
        
        .input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .input:focus {
          outline: none;
          border-color: #3b82f6;
          ring: 2px;
        }
        
        .btn {
          background-color: #3b82f6;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          border: none;
        }
        
        .btn:hover {
          background-color: #2563eb;
        }
      `}</style>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="font-bold text-lg mb-3 text-gray-800">{title}</h2>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-sm font-bold uppercase border-b-2 border-black pb-1 mb-3">
    {children}
  </h2>
);

const Input = (props) => <input {...props} className="input" />;

const Box = ({ children }) => (
  <div className="border border-gray-300 p-4 mb-3 rounded bg-white shadow-sm">
    {children}
  </div>
);

const AddButton = ({ children, ...props }) => (
  <button {...props} className="btn w-full">
    {children}
  </button>
);

export default ResumeBuilder;