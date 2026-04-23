export function contactForm() {
  const form     = document.querySelector('#contactForm');
  const feedback = document.querySelector('#feedback');

  if (!form || !feedback) return;

  function showFeedback(message, isError) {
    feedback.innerHTML = '';

    const feedbackText = document.createElement('p');
    feedbackText.textContent = message;

    feedback.classList.remove('form-message', 'success', 'error');
    feedback.classList.add('form-message');

    if (isError) {
      feedback.classList.add('error');
    } else {
      feedback.classList.add('success');
    }

    feedback.appendChild(feedbackText);
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function resetButton(submitBtn) {
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Send Message';
  }

  function handleSubmit(event) {
    event.preventDefault();

    const thisForm  = event.currentTarget;
    const submitBtn = thisForm.querySelector('button[type="submit"]');

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending...';

    // I'm building the payload with only fields that exist in the form
    const formData = new URLSearchParams({
      first_name: thisForm.elements.first_name.value,
      last_name:  thisForm.elements.last_name.value,
      email:      thisForm.elements.email.value,
      social:     thisForm.elements.social.value,
      message:    thisForm.elements.message.value,
      website:    thisForm.elements.website.value,
    });

    fetch('includes/send.php', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    formData,
    })
      .then(function (response) {
        // I'm reading raw text first so a PHP warning doesn't break JSON.parse
        return response.text();
      })
      .then(function (text) {
        resetButton(submitBtn);

        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error('PHP response was not JSON:', text);
          showFeedback('Server error. Please email me directly at contact.ajayantony@gmail.com', true);
          return;
        }

        if (data.errors) {
          data.errors.forEach(function (error) {
            showFeedback(error, true);
          });
        } else {
          form.reset();
          showFeedback(data.message, false);
        }
      })
      .catch(function (networkError) {
        resetButton(submitBtn);
        showFeedback('Could not reach the server. Please try again.', true);
        console.error('Fetch error:', networkError);
      });
  }

  form.addEventListener('submit', handleSubmit);
}
