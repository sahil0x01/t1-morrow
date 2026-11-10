const clock = document.querySelector("#clock");
const form = document.querySelector("#waitlist-form");
const email = document.querySelector("#email");
const website = document.querySelector("#website");
const status = document.querySelector("#form-status");
const button = form?.querySelector("button");

function tick() {
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

tick();
setInterval(tick, 15_000);

function setStatus(message, kind = "info") {
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("is-error", kind === "error");
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const value = email?.value.trim() ?? "";
  if (!email?.checkValidity() || !value) {
    email?.reportValidity();
    setStatus("Enter a valid email address.", "error");
    email?.focus();
    return;
  }

  button?.setAttribute("disabled", "");
  if (button) button.textContent = "Joining…";
  setStatus("");

  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: value, website: website?.value ?? "" }),
    });

    if (!response.ok) throw new Error("Request failed");

    setStatus("You’re on the list. We’ll write when it’s ready.");
    if (button) button.textContent = "On the list";
    if (email) email.disabled = true;
  } catch {
    button?.removeAttribute("disabled");
    if (button) button.textContent = "Join the list →";
    setStatus("Couldn’t save that. Please try again.", "error");
  }
});
