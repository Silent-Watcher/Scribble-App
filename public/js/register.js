'use strict';

window.addEventListener('load', () => {
  const recaptchaInput = document.querySelector('#recaptchaResponse');
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = {
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
      confirmPassword: document.querySelector('#confirmPassword').value,
      token: recaptchaInput.value,
    };

    fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
		if(response.status == 200){
			location.href = '/auth/verify-email'
		}
      });
  });

  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  grecaptcha.ready(function () {
    // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
    grecaptcha
      .execute('6LcHcl4qAAAAAEYgUW61g3S4usyHjPe5glAI-pye', {
        action: 'register',
      })
      .then(function (recaptchaToken) {
        recaptchaInput.value = recaptchaToken;
      });
  });
});
