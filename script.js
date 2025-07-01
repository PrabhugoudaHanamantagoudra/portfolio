// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  window.scrollTo(0, window.scrollY); // Prevent scroll jump

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const messageEl = document.getElementById("formMessage");

  if (!name || !email || !phone || !subject || !message) {
    messageEl.textContent = "Please fill in all required fields.";
    messageEl.style.color = "red";
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("subject", subject);
  formData.append("message", message);

  fetch("https://script.google.com/macros/s/AKfycby3LGAKtTEFGOUMVqm9Vnj5hV2nTieky6eIoblgScmIo7gcz-VpBiI0yL0JizS-ImJSEw/exec", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(data => {
      console.log("Response from Google Apps Script:", data);
      if (data.toLowerCase().includes("success")) {
        messageEl.textContent = "Message sent successfully!";
        messageEl.style.color = "green";
        document.getElementById("contactForm").reset();
      } else {
        messageEl.textContent = data;
        messageEl.style.color = "red";
      }
    })
    .catch(err => {
      console.error("Network or fetch error:", err);
      messageEl.textContent = "Something went wrong. Check your connection and try again.";
      messageEl.style.color = "red";
    });
});
