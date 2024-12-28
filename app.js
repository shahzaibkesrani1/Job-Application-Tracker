const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');
const alertContainer = document.getElementById('alertContainer');

let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

function showAlert(message, type) {
    const alertHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                       <strong>${type === 'success' ? 'Success' : 'Error'}!</strong> ${message}
                       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                     </div>`;
    alertContainer.innerHTML = alertHTML;
}

function renderJobs(filteredJobs = jobs) {
    jobList.querySelector('tbody').innerHTML = filteredJobs.map((job, index) => `
    <tr>
      <td>${job.title}</td>
      <td>${job.company}</td>
      <td>${job.status}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editJob(${index})">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteJob(${index})">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </td>
    </tr>
  `).join('');
}

jobForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newJob = {
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('companyName').value,
        status: document.getElementById('jobStatus').value,
    };

    jobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    showAlert('Job added successfully!', 'success');
    renderJobs();
    jobForm.reset();
});

function editJob(index) {
    const job = jobs[index];
    document.getElementById('jobTitle').value = job.title;
    document.getElementById('companyName').value = job.company;
    document.getElementById('jobStatus').value = job.status;
    jobs.splice(index, 1);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    renderJobs();
    showAlert('Job updated successfully!', 'success');
}

function deleteJob(index) {
    jobs.splice(index, 1);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    renderJobs();
    showAlert('Job deleted successfully!', 'danger');
}

document.getElementById('filterApplied').addEventListener('click', () => {
    renderJobs(jobs.filter(job => job.status === 'Applied'));
});

document.getElementById('filterInterviewing').addEventListener('click', () => {
    renderJobs(jobs.filter(job => job.status === 'Interviewing'));
});

document.getElementById('filterOffer').addEventListener('click', () => {
    renderJobs(jobs.filter(job => job.status === 'Offer'));
});

document.getElementById('filterRejected').addEventListener('click', () => {
    renderJobs(jobs.filter(job => job.status === 'Rejected'));
});

renderJobs();
