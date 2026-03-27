import React, { useState } from "react";

export default function JobApprovalWorkflow() {

  const [activeTab, setActiveTab] = useState("Pending");

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Stellar Tech",
      submitted: "2h ago",
      priority: "Medium",
      status: "Pending"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Code Labs",
      submitted: "5h ago",
      priority: "High",
      status: "Pending"
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "TechNova",
      submitted: "1 day ago",
      priority: "Low",
      status: "Approved"
    }
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [note, setNote] = useState("");

  const approveJob = (id) => {
    setJobs(
      jobs.map(job =>
        job.id === id ? { ...job, status: "Approved" } : job
      )
    );
  };

  const rejectJob = (id) => {
    setJobs(
      jobs.map(job =>
        job.id === id ? { ...job, status: "Rejected" } : job
      )
    );
  };

  const filteredJobs = jobs.filter(job => job.status === activeTab);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "220px",
        background: "#f5f6fa",
        padding: "20px"
      }}>
        <h3>Admin Portal</h3>

        <p style={{ marginTop: "20px" }}>Dashboard</p>
        <p style={{ color: "#2563eb", fontWeight: "bold" }}>Job Queue</p>
        <p>Users</p>
        <p>Companies</p>
        <p>Reports</p>
      </div>


      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "30px" }}>

        {/* TOP BAR */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}>
          <input
            placeholder="Search postings..."
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "6px",
              border: "1px solid #ddd"
            }}
          />

          <div>
            🔔 ⚙️ 👤
          </div>
        </div>


        <h2>Job Approval Queue</h2>
        <p>{filteredJobs.length} postings pending manual review</p>


        {/* TABS */}
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          {["Pending", "Approved", "Rejected"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                background: activeTab === tab ? "#2563eb" : "#e5e7eb",
                color: activeTab === tab ? "#fff" : "#000"
              }}
            >
              {tab}
            </button>
          ))}
        </div>


        <div style={{ display: "flex", gap: "20px" }}>

          {/* JOB TABLE */}
          <div style={{ flex: 2 }}>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse"
              }}
            >
              <thead>
                <tr style={{ background: "#f1f5f9" }}>
                  <th>Job Posting</th>
                  <th>Company</th>
                  <th>Submitted</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredJobs.map(job => (
                  <tr
                    key={job.id}
                    style={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}
                    onClick={() => setSelectedJob(job)}
                  >
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.submitted}</td>
                    <td>{job.priority}</td>

                    <td>
                      {job.status === "Pending" && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              approveJob(job.id);
                            }}
                            style={{
                              background: "green",
                              color: "#fff",
                              border: "none",
                              padding: "5px 10px",
                              marginRight: "5px"
                            }}
                          >
                            Approve
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              rejectJob(job.id);
                            }}
                            style={{
                              background: "red",
                              color: "#fff",
                              border: "none",
                              padding: "5px 10px"
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>

          </div>


          {/* RIGHT PANEL */}
          <div style={{
            flex: 1,
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px"
          }}>

            <h4>Internal Note / Rejection Reason</h4>

            {selectedJob ? (
              <>
                <p><b>{selectedJob.title}</b></p>

                <textarea
                  placeholder="Explain rejection or leave a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{
                    width: "100%",
                    height: "120px",
                    marginTop: "10px"
                  }}
                />
              </>
            ) : (
              <p>Select a job to review</p>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}