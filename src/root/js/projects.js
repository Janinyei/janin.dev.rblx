

let projectData = [];

//project loading

async function loadProjects() {
  const container = document.querySelector(".projects-container");
  if (!container) return;

  try {
    const response = await fetch("js/data/projects.json");
    const projects = await response.json();
    projectData = projects

    container.innerHTML = projects
      .map((project) => {
        // Logic for optional features: convert array to spans
        const featureSpans = project.features
          .map((f) => `<span class="project-skill-frame">${f}</span>`)
          .join("");

        // Logic for optional "View Details" button
        const detailsBtn = project.details
          ? `<button class="btn-primary" onclick="openModal('${project.id}')">View Details</button>`
          : "";

        const projectBanner = project.banner
          ? `<div class="project-banner">
                        <img src="${project.banner}" alt="${project.title} banner" />
                    </div>
`
          : "";

        // Return the exact HTML structure you wanted
        return `
                <div class="project-card" data-category="${project.category}">
                
                        ${projectBanner}

                    <div class="project-body">
                        <h2 class="project-title">${project.title}</h2>
                        ${detailsBtn}

                        <span class="section-divider"></span>

                        <section class="project-body-section">
                            <h3>Description</h3>
                            <p>${project.description}</p>
                        </section>

                        <span class="section-divider"></span>

                        <section class="project-body-section">
                            <h3>Features</h3>
                            <div class="project-skills">
                                ${featureSpans}
                          </div>
                        </section>
                    </div>
                </div>
            `;
      })
      .join("");

    // Store projects globally so the Modal can find them later
    window.allProjects = projects;
  } catch (error) {
    console.error("Error generating projects:", error);
  }
}

function openModal(projectId) {
    // 1. Find the specific project in our stored data
    const project = projectData.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    
    // 2. Fill Text Content
    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-desc').innerText = project.details?.longDescription || project.description;


    // 4. Handle Media (Video or Image)
    const mediaContainer = document.getElementById('modal-media-container');
    if (project.details?.mediaType == "video") {
        mediaContainer.innerHTML = `<video src="${project.details.mediaUrl}" controls autoplay loop></video>`;
    } 
    else if(project.details?.mediaType == "youtube") {
mediaContainer.innerHTML = `
    <iframe 
        src="https://www.youtube-nocookie.com/embed/${project.details.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        style="width: 100%; height: 100%;">
    </iframe>`;
    }
    else {
        mediaContainer.innerHTML = `<img src="${project.banner}" style="object-fit: contain;">`;


    }

    // 5. Show Modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

// Close Logic
document.getElementById('close-modal').addEventListener('click', () => {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('modal-media-container').innerHTML = ''; // Kill video audio
});



document.addEventListener("DOMContentLoaded", loadProjects);


