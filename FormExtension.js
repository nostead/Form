const FormExtension = {
  name: 'Forms',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_form' || trace.payload.name === 'ext_form',
  render: ({ trace, element }) => {
    if (!trace.payload) {
      console.error('Payload is missing');
      return;
    }

    const formContainer = document.createElement('form');
    formContainer.innerHTML = `
      <style>
        /* Your styles here */
      </style>
      <label for="name">Name</label>
      <input type="text" class="name" name="name" required><br><br>
      <label for="email">Email</label>
      <input type="email" class="email" name="email" required><br><br>
      <label for="phone">Phone Number</label>
      <input type="tel" class="phone" name="phone" required><br><br>
      <input type="submit" class="submit" value="Submit">
    `;

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = formContainer.querySelector('.name');
      const email = formContainer.querySelector('.email');
      const phone = formContainer.querySelector('.phone');

      if (
        !name.checkValidity() ||
        !email.checkValidity() ||
        !phone.checkValidity()
      ) {
        name.classList.add('invalid');
        email.classList.add('invalid');
        phone.classList.add('invalid');
        return;
      }

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { name: name.value, email: email.value, phone: phone.value },
      });
    });

    element.appendChild(formContainer);
  },
};
