document.addEventListener("DOMContentLoaded", () => {

  const workersContainer = document.getElementById("workers");
  const workersSearch = document.getElementById('workerssearch');
  const searchBtn = document.querySelector('.search');
  const firstinput = document.getElementById('firstinput');
  const secondinput = document.getElementById('secondinput');


  if (workersContainer) {
    fetch("https://randomuser.me/api/?results=50")
      .then(res => res.json())
      .then(data => {
        workersContainer.innerHTML = "";
        data.results.forEach(user => {
          const card = createWorkerCard(user, "Usta", user.location.city);
          workersContainer.appendChild(card);
        });
      })
      .catch(err => console.error(err));
  }


  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const jobTitle = firstinput.value || "Usta";
      const city = secondinput.value || "Şəhər";

      fetch("https://randomuser.me/api/?results=16")
        .then(res => res.json())
        .then(data => {
          workersSearch.innerHTML = "";
          data.results.forEach(user => {
            const card = createWorkerCard(user, jobTitle, city);
            workersSearch.appendChild(card);
          });
        })
        .catch(err => console.error(err));
    });
  }

  function createWorkerCard(user, title, city) {
    const card = document.createElement("div");
    card.className = "service-card";

    const rating = (Math.random() * 1 + 4).toFixed(1); // 4.0 - 5.0

    card.innerHTML = `
      <img src="${user.picture.large}" class="icon">
      <h3>${user.name.first} ${user.name.last}</h3>
      <span>${title} • ⭐ ${rating}</span>
      <p>${city}</p>
      <p>+1111111</p>
    `;

    card.addEventListener("click", () => {
      const url = `details.html?name=${user.name.first} ${user.name.last}&city=${city}&img=${user.picture.large}&rating=${rating}`;
      window.location.href = url;
    });

    return card;
  }

});
