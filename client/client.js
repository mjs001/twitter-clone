const form = document.querySelector("form");
const loadingElement = document.querySelector(".loading");
const dataElement = document.querySelector("data");
const API_URL = "http://localhost:5500/capturedFormData";

loadingElement.style.display = "";

listAllData();

form.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  console.log("form was submitted");
  const content = formData.get("content");

  const capturedFormData = {
    name,
    content
  };
  console.log(capturedFormData);
  form.style.display = "none";
  loadingElement.style.display = "";
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(capturedFormData),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(createdData => {
      form.reset();
      setTimeout(() => {
        form.style.display = "";
      }, 15000);

      listAllData();
    });
});

function listAllData() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.reverse();
      data.forEach(data => {});
      const div = document.createElement("div");
      const header = document.createElement("h3");
      header.textContent = data.name;
      const contents = document.createElement("p");
      contents.textContent = data.content;

      const date = document.createElement("small");
      date.textContent = new Date(data.created);
      div.appendChild(header);
      div.appendChild(contents);
      div.appendChild(date);

      dataElement.appendChild(div);
    });
  loadingElement.style.display = "none";
}
