const jobsContainer = document.querySelector(".apiJobs");

fetch("https://api.joinrise.io/api/v1/jobs/public?page=1&limit=20")
  .then(res => res.json())
  .then(data => {
    jobsContainer.innerHTML = "";
    console.log(data)

    if (!data || !data.result || !data.result.jobs || !data.result.jobs.length) {
      jobsContainer.innerHTML = "<p>İş tapılmadı</p>";
      return;
    }


    data.result.jobs.slice(0, 20).forEach(job => {
      const card = document.createElement("div");
      card.className = "job-card";
      card.innerHTML = `
        <h3>${job.title}</h3>
        <p>🏢 ${job.company_name || "Şirkət yoxdur"}</p>
        <p>📍 ${job.location || "Yoxdur"}</p>
        <p>${job.remote ? "🌍 Remote" : ""}</p>
        <a href="${job.url}" target="_blank">Ətraflı bax</a>
      `;
      jobsContainer.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    jobsContainer.innerHTML = "<p>Xəta baş verdi</p>";
  });
