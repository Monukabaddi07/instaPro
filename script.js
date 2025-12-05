document.getElementById('sendDMBtn').addEventListener('click', async () => {
  const toUser = document.getElementById('dmUser').value;
  const message = document.getElementById('dmMessage').value;
  const status = document.getElementById('dmStatus');

  if (!toUser || !message) {
    status.textContent = "Please enter username and message";
    status.style.color = "red";
    return;
  }

  status.textContent = "Sending...";
  status.style.color = "black";

  try {
    // Replace with your Vercel backend endpoint
    const res = await fetch(`https://your-vercel-domain.vercel.app/api/sendDM?toUser=${toUser}&message=${encodeURIComponent(message)}`);
    const data = await res.json();

    if (data.success) {
      status.textContent = "DM sent successfully!";
      status.style.color = "green";
    } else {
      status.textContent = Error: ${data.error};
      status.style.color = "red";
    }
  } catch (err) {
    status.textContent = "Network error or backend issue.";
    status.style.color = "red";
  }
});
