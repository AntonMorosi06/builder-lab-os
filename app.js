async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }
  return response.json();
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <div>
      <div class="badges">
        <span class="badge">${project.category}</span>
        <span class="badge green">${project.status}</span>
      </div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <p><strong>Maturity:</strong> ${project.maturity}</p>
      <p><strong>Next:</strong> ${project.next}</p>
    </div>
    <a href="${project.repo}" target="_blank" rel="noopener">Open repository →</a>
  `;

  return card;
}

function createEvidenceItem(item) {
  const row = document.createElement("article");
  row.className = "evidence-item";

  row.innerHTML = `
    <strong>${item.project}</strong>
    <span>${item.status}</span>
    <p><strong>${item.type}:</strong> ${item.description}</p>
  `;

  return row;
}

function createStudyCard(item) {
  const card = document.createElement("article");
  card.className = "study-card";

  card.innerHTML = `
    <div>
      <div class="badges">
        <span class="badge">${item.area}</span>
        <span class="badge yellow">${item.status}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
    <p><strong>Output:</strong> ${item.output}</p>
  `;

  return card;
}

function createVideoItem(item) {
  const row = document.createElement("article");
  row.className = "video-item";

  row.innerHTML = `
    <strong>Episode ${item.episode}</strong>
    <span>${item.status}</span>
    <p><strong>${item.title}:</strong> ${item.goal}</p>
  `;

  return row;
}

function createValidationCard(item) {
  const card = document.createElement("article");
  card.className = "validation-card";

  card.innerHTML = `
    <div>
      <div class="badges">
        <span class="badge">${item.status}</span>
      </div>
      <h3>${item.metric}</h3>
      <p>${item.target}</p>
    </div>
  `;

  return card;
}

async function init() {
  const projectGrid = document.getElementById("projectGrid");
  const evidenceList = document.getElementById("evidenceList");
  const studyGrid = document.getElementById("studyGrid");
  const videoList = document.getElementById("videoList");
  const validationGrid = document.getElementById("validationGrid");

  const projectCount = document.getElementById("projectCount");
  const evidenceCount = document.getElementById("evidenceCount");
  const studyCount = document.getElementById("studyCount");
  const videoCount = document.getElementById("videoCount");

  try {
    const [projects, evidence, study, videos, validation] = await Promise.all([
      loadJson("data/projects.json"),
      loadJson("data/evidence.json"),
      loadJson("data/study.json"),
      loadJson("data/videos.json"),
      loadJson("data/validation.json")
    ]);

    projectGrid.innerHTML = "";
    evidenceList.innerHTML = "";
    studyGrid.innerHTML = "";
    videoList.innerHTML = "";
    validationGrid.innerHTML = "";

    projects.forEach((project) => projectGrid.appendChild(createProjectCard(project)));
    evidence.forEach((item) => evidenceList.appendChild(createEvidenceItem(item)));
    study.forEach((item) => studyGrid.appendChild(createStudyCard(item)));
    videos.forEach((item) => videoList.appendChild(createVideoItem(item)));
    validation.forEach((item) => validationGrid.appendChild(createValidationCard(item)));

    projectCount.textContent = projects.length;
    evidenceCount.textContent = evidence.length;
    studyCount.textContent = study.length;
    videoCount.textContent = videos.length;
  } catch (error) {
    projectGrid.innerHTML = `<article class="card"><h3>Data loading error</h3><p>${error.message}</p></article>`;
    evidenceList.innerHTML = "";
  }
}

init();
