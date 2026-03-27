```javascript
import React, { useState } from "react";

export default function JobApprovalWorkflow() {

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      status: "Pending",
      description: "React developer needed with 2+ years experience"
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Data Systems",
      location: "New York",
      status: "Pending",
      description: "Node.js developer required"
    },
    {
      id: 3,
      title: "UI Designer",
      company: "Creative Studio",
      location: "London",
      status: "Pending",
      description: "Figma and UI/UX expert required"
    }
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [comment, setComment] = useState("");

  const handleApprove = (id) => {
    const updated = jobs.map((job) =>
      job.id === id ? { ...job, status: "Approved" } : job
    );
    setJobs(updated);
    alert("Job Approved ✅");
  };

  const handleReject = (id) => {
    const updated = jobs.map((job) =>
      job.id === id ? { ...job, status: "Rejected" } : job
    );
    setJobs(updated);
    alert("Job Rejected ❌");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🧾 Job Approval Workflow</h2>

      <div style={{ display: "flex", gap: "20px" }}>

        {/* Job List */}
        <div style={{ width: "40%" }}>
          <h3>Pending Jobs</h3>

          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
                borderRadius: "6px"
              }}
            >
              <strong>{job.title}</strong>
              <p>{job.company}</p>
              <span>Status: {job.status}</span>
            </div>
          ))}
        </div>

        {/* Job Details */}
        <div style={{ width: "60%" }}>
          {selectedJob ? (
            <div>
              <h3>Job Details</h3>

              <p><b>Title:</b> {selectedJob.title}</p>
              <p><b>Company:</b> {selectedJob.company}</p>
              <p><b>Location:</b> {selectedJob.location}</p>
              <p><b>Description:</b> {selectedJob.description}</p>

              <textarea
                placeholder="Add comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: "100%",
                  height: "80px",
                  marginTop: "10px",
                  padding: "8px"
                }}
              />

              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleApprove(selectedJob.id)}
                  style={{
                    background: "green",
                    color: "#fff",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px"
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(selectedJob.id)}
                  style={{
                    background: "red",
                    color: "#fff",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px"
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <p>Select a job to review</p>
          )}
        </div>

      </div>
    </div>
  );
}
```
