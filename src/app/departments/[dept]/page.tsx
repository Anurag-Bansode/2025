"use client";

import EmptyNotice from "@/components/EmptySection/EmptyNotice";
import InfoSection from "@/components/InfoSection/InfoSection";
import PersonCard from "@/components/PersonCard/PersonCard";
import { Department } from "@/types/Department.types";
import { validURL } from "@/types/validator";
import { Box, Skeleton, Typography, List, ListItemButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import nextConfig from "../../../../next.config";
import styles from "./department.module.css";
import { PieChart, Tooltip, Cell, Pie, Legend } from "recharts";

const Cse: React.FC = () => {
  const params = useParams();
  const dept = params?.dept as string;
  const [cseData, setCseData] = useState<Department | null>(null);
  const [activeSection, setActiveSection] = useState<string>("About");

  // Sections mapped to JSON keys
  const sectionMap: { [key: string]: string } = {
    About: "about",
    "Message from the Head of Department": "message_from_hod",
    "Faculty Members": "faculty_members",
    "Programme Offered": "Programme offered",
    "Research Scholars": "research_scholars",
    "Research Areas": "research_areas",
    "Notable Alumni": "notable_alumni",
    "Placed Students": "placed_student",
    "Rank Holders": "rank_holder",
    Demographics: "demographic",
    "Lab Facilities": "lab_facilities",
    Timetable: "time_table",
    "Class Coordinators": "class coordinator",
    Announcements: "announcements",
    "Latest News": "latest_news",
    Publications: "publications",
    "Contact Us": "contact",
  };

  const sections = Object.keys(sectionMap);

  useEffect(() => {
    document.title = `${dept} | IIIT Tiruchirappalli`;
    return () => {
      document.title = "IIIT Trichy";
    };
  }, [dept]);

  useEffect(() => {
    fetch(`/json/departments/${dept}.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch ${dept} data`);
        return response.json();
      })
      .then((data) => setCseData(data.data))
      .catch((error) =>
        console.error("Error fetching department data:", error)
      );
  }, [dept]);

  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div>
      <Grid container spacing={2} className={styles.departmentContainer}>
        {/* Left Sidebar */}
        <Grid size={{ xs: 12, sm: 3, md: 2 }}>
          <Box
            sx={{
              borderRight: "1px solid #ddd",
              height: "100%",
              position: "sticky",
              top: "80px",
            }}
          >
            <List>
              {sections.map((section) => (
                <ListItemButton
                  key={section}
                  selected={activeSection === section}
                  onClick={() => setActiveSection(section)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    bgcolor:
                      activeSection === section ? "#f0fdf4" : "transparent",
                    "&.Mui-selected": {
                      bgcolor: "#d1fae5",
                      fontWeight: "bold",
                    },
                  }}
                >
                  {section}
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Right Content Area */}
        <Grid size={{ xs: 12, sm: 9, md: 10 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            className={styles.departmentThemeText}
          >
            <Box
              component="span"
              sx={{
                fontSize: { xs: "28px", sm: "42px", md: "54px" },
                fontWeight: 600,
                display: "inline-block",
                background: "linear-gradient(45deg, #1a5d3a, #2e8b57)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "2rem",
                letterSpacing: "1px",
              }}
            >
              {cseData ? cseData.department : <Skeleton width="200px" />}
            </Box>
          </Typography>

          {!cseData ? (
            [...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={150}
                sx={{ borderRadius: 2, mb: 2, width: "100%" }}
              />
            ))
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {activeSection === "About" && (
                  <InfoSection title="About">
                    <Typography>{cseData.about}</Typography>
                  </InfoSection>
                )}

                {activeSection === "Message from the Head of Department" && (
                  <InfoSection title="Message from the Head of Department">
                    <Typography sx={{ fontStyle: "italic" }}>
                      "{cseData.message_from_hod.message}"
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      – {cseData.message_from_hod.name},{" "}
                      {cseData.message_from_hod.designation}
                    </Typography>
                  </InfoSection>
                )}

                {activeSection === "Faculty Members" && (
                  <InfoSection title="Faculty Members">
                    {Array.isArray(cseData.faculty_members) &&
                    cseData.faculty_members.length > 0 ? (
                      <Grid container spacing={2}>
                        {cseData.faculty_members.map((faculty, index) => (
                          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Box>
                              <Typography>{faculty.name}</Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {faculty.designation}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <EmptyNotice />
                    )}
                    <Box mt={2} textAlign="right">
                      <a
                        href="/faculty"
                        style={{
                          color: "#1a5d3a",
                          fontWeight: "bold",
                          textDecoration: "none",
                        }}
                      >
                        Know more &rarr;
                      </a>
                    </Box>
                  </InfoSection>
                )}

                {activeSection === "Programme Offered" && (
                  <InfoSection title="Programme Offered">
                    {cseData["programme_offered"]?.filter(Boolean).length ? (
                      cseData["programme_offered"].map((p, i) => (
                        <Typography key={i}>{p}</Typography>
                      ))
                    ) : (
                      <EmptyNotice />
                    )}
                  </InfoSection>
                )}

                {activeSection === "Research Scholars" && (
                  <InfoSection title="Research Scholars">
                    <div className={styles.scholargrid}>
                      {Array.isArray(cseData.research_scholars) &&
                      cseData.research_scholars.length > 0 ? (
                        cseData.research_scholars.map((scholar, index) => (
                          <div key={index}>
                            <PersonCard
                              name={scholar.name}
                              emailID={scholar.emailId}
                              src={scholar.src}
                              src_type="phd"
                              dept={scholar.dept}
                              researchArea={scholar.researchArea}
                              Supervisor={scholar.supervisor}
                              PersonalPage={scholar.PersonalPage}
                              status={scholar.status}
                            />
                          </div>
                        ))
                      ) : (
                        <EmptyNotice />
                      )}
                    </div>
                  </InfoSection>
                )}

                {activeSection === "Research Areas" && (
                  <InfoSection title="Research Areas">
                    {cseData.research_areas?.length ? (
                      cseData.research_areas.map((a, i) => (
                        <Typography key={i}>{a}</Typography>
                      ))
                    ) : (
                      <EmptyNotice />
                    )}
                  </InfoSection>
                )}

                {activeSection === "Notable Alumni" && (
                  <InfoSection title="Notable Alumni">
                    {cseData.notable_alumni?.length ? (
                      cseData.notable_alumni.map((a, i) => (
                        <Typography key={i}>{a}</Typography>
                      ))
                    ) : (
                      <EmptyNotice />
                    )}
                  </InfoSection>
                )}

                {activeSection === "Placed Students" && (
                  <InfoSection title="Placed Students">
                    {cseData.placed_student?.length &&
                    cseData.placed_student[0].student_placed?.length ? (
                      cseData.placed_student.map((p, i) => (
                        <Typography key={i}>{p.company}</Typography>
                      ))
                    ) : (
                      <EmptyNotice />
                    )}
                  </InfoSection>
                )}
                {activeSection === "Demographics" && (
                  <InfoSection title="Demographics">
                    <div className="charts-container">
                      {/* B.Tech Donut */}
                      <div className="chart-box">
                        <h3 className="chart-title">B.Tech</h3>
                        <p className="chart-subtitle">
                          Total: {cseData.demographic.btech.total}
                        </p>
                        <PieChart width={300} height={300}>
                          <Pie
                            data={cseData.demographic.btech.year_wise}
                            dataKey="count"
                            nameKey="year"
                            outerRadius={100}
                            innerRadius={60}
                            label
                          >
                            {cseData.demographic.btech.year_wise.map(
                              (entry, index) => (
                                <Cell
                                  key={`cell-btech-${index}`}
                                  fill={
                                    [
                                      "#3b82f6",
                                      "#60a5fa",
                                      "#93c5fd",
                                      "#bfdbfe",
                                    ][index % 4]
                                  }
                                />
                              )
                            )}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </div>

                      {/* M.Tech Donut */}
                      <div className="chart-box">
                        <h3 className="chart-title">M.Tech</h3>
                        <p className="chart-subtitle">
                          Total: {cseData.demographic.mtech.total}
                        </p>
                        <PieChart width={300} height={300}>
                          <Pie
                            data={cseData.demographic.mtech.year_wise}
                            dataKey="count"
                            nameKey="year"
                            outerRadius={100}
                            innerRadius={60}
                            label
                          >
                            {cseData.demographic.mtech.year_wise.map(
                              (entry, index) => (
                                <Cell
                                  key={`cell-mtech-${index}`}
                                  fill={
                                    [
                                      "#f97316",
                                      "#fb923c",
                                      "#fdba74",
                                      "#fed7aa",
                                    ][index % 4]
                                  }
                                />
                              )
                            )}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </div>
                    </div>
                  </InfoSection>
                )}

                {activeSection === "Rank Holders" && (
                  <InfoSection title="Rank Holders">
                    {cseData.rank_holder?.length ? (
                      <Typography>Data Available</Typography>
                    ) : (
                      <EmptyNotice />
                    )}
                  </InfoSection>
                )}

                {activeSection === "Lab Facilities" && (
                  <InfoSection title="Lab Facilities">
                    {cseData.lab_facilities?.map((lab, index) => (
                      <div key={index} className="mb-3">
                        <Typography>{lab.description}</Typography>
                        {lab.link && (
                          <a href="#" className="text-blue-500 underline">
                            {lab.link}
                          </a>
                        )}
                      </div>
                    ))}
                  </InfoSection>
                )}

                {activeSection === "Announcements" && (
                  <InfoSection title="Announcements">
                    {Array.isArray(cseData.announcements) &&
                    cseData.announcements.length > 0 ? (
                      cseData.announcements.map((a, i) => (
                        <Box key={i} mb={1.5}>
                          <a
                            href={
                              validURL(a.link)
                                ? a.link
                                : `${nextConfig.env?.DOCUMENT}/${a.link}`
                            }
                            className={styles.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Typography variant="subtitle1" fontWeight="bold">
                              {a.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {a.date}
                            </Typography>
                          </a>
                        </Box>
                      ))
                    ) : (
                      <EmptyNotice />
                    )}
                  </InfoSection>
                )}

                {activeSection === "Latest News" && (
                  <InfoSection title="Latest News">
                    {cseData.latest_news?.length ? (
                      cseData.latest_news.map((n, i) => (
                        <Typography key={i}>{n.title}</Typography>
                      ))
                    ) : (
                      <EmptyNotice />
                    )}
                  </InfoSection>
                )}

                {activeSection === "Contact Us" && (
                  <InfoSection title="Contact Us">
                    {cseData.contact?.department && (
                      <Typography>
                        <strong>Department:</strong>{" "}
                        {cseData.contact.department}
                      </Typography>
                    )}
                    {cseData.contact?.college && (
                      <Typography>
                        <strong>College:</strong> {cseData.contact.college}
                      </Typography>
                    )}
                    {cseData.contact?.location && (
                      <Typography>
                        <strong>Location:</strong> {cseData.contact.location}
                      </Typography>
                    )}
                  </InfoSection>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Cse;
