export function contactForm() 
{
  const form = document.querySelector("#contactForm");
  const feedback = document.querySelector("#feedback");

  if (!form || !feedback) return;

  function showFeedback(message, isError) {
    feedback.innerHTML = "";

    const feedbackText = document.createElement("p");
    feedbackText.textContent = message;

    feedback.classList.remove("form-message", "success", "error");
    feedback.classList.add("form-message");

    if (isError) {
      feedback.classList.add("error");
    } else {
      feedback.classList.add("success");
    }

    feedback.appendChild(feedbackText);
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function resetButton(submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Hit It!";
  }

  function handleSubmit(event) {
    event.preventDefault();

    const thisForm = event.currentTarget;
    const submitBtn = thisForm.querySelector("button[type='submit']");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // I'm using URLSearchParams 
    const formData = new URLSearchParams({
      first_name: thisForm.elements.first_name.value,
      last_name:  thisForm.elements.last_name.value,
      email:      thisForm.elements.email.value,
      social:     thisForm.elements.social.value,
      message:    thisForm.elements.message.value,
      botCheck:   thisForm.elements.botCheck.value,
      website:    thisForm.elements.website.value,
    });

    fetch("includes/send.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        resetButton(submitBtn);

        if (data.errors) {
          // I'm looping all errors and showing them one by one
          data.errors.forEach(function (error) {
            showFeedback(error, true);
          });
        } else {
          form.reset();
          showFeedback(data.message, false);
        }
      })
      .catch(function (error) {
        resetButton(submitBtn);
        showFeedback("Something went wrong. Please try again later.", true);
        console.error("Fetch error:", error);
      });
  }

  form.addEventListener("submit", handleSubmit);
}