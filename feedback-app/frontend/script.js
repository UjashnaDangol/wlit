
const API_URL = "http://localhost:3000/api/feedback";

const form = document.getElementById("feedback-form");
const nameInput = document.getElementById("user-name");
const messageInput = document.getElementById("user-message");
const listEl = document.getElementById("feedback-list");
const errorBox = document.getElementById("error-box");

async function fetchFeedback() {
  showError(null);

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch feedback");
    }

    const data = await response.json();

    renderFeedback(data);

  } catch (err) {
    showError(err.message);
  }
}

async function submitFeedback(e) {
  e.preventDefault();
  showError(null);

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, message })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error);
    }

    form.reset();
    fetchFeedback();

  } catch (err) {
    showError(err.message);
  }
}

function renderFeedback(items) {
  listEl.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.name}</strong><span>${item.message}</span>`;
    listEl.appendChild(li);
  });
}

function showError(msg) {
  errorBox.classList.toggle("hidden", !msg);
  errorBox.textContent = msg || "";
}

form.addEventListener("submit", submitFeedback);

fetchFeedback();
