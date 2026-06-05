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
        <span class="badge">${project.status}</span>
      </div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
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

async function init() {
  const projectGrid = document.getElementById("projectGrid");
  const evidenceList = document.getElementById("evidenceList");
  const projectCount = document.getElementById("projectCount");
  const evidenceCount = document.getElementById("evidenceCount");

  try {
    const projects = await loadJson("data/projects.json");
    const evidence = await loadJson("data/evidence.json");

    projectGrid.innerHTML = "";
    evidenceList.innerHTML = "";

    projects.forEach((project) => {
      projectGrid.appendChild(createProjectCard(project));
    });

    evidence.forEach((item) => {
      evidenceList.appendChild(createEvidenceItem(item));
    });

    projectCount.textContent = projects.length;
    evidenceCount.textContent = evidence.length;
  } catch (error) {
    projectGrid.innerHTML = `<article class="card"><h3>Data loading error</h3><p>${error.message}</p></article>`;
    evidenceList.innerHTML = "";
  }
}

init();
