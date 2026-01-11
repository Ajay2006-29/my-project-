document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop page reload

    // Show submitting message
    status.innerText = "Submitting...";

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      // Success message from backend
      status.innerText = "Submitted successfully ✅";

      form.reset();
    } catch (error) {
      status.innerText = "❌ Backend not running or error occurred";
    }
  });
});
