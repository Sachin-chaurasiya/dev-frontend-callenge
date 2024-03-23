const form = document.querySelector('form');
const activitySelect = document.querySelector('#activity-select');
const foodAllergies = document.querySelector('#food-allergies');
const additionalInfo = document.querySelector('#additional-info');

// add placeholder text to food allergies and additional info
foodAllergies.placeholder = 'Please list any food allergies';
additionalInfo.placeholder = 'Please provide any additional information';

// remove alert error when activity is selected
activitySelect.addEventListener('change', () => {
  const alertError = document.querySelector('#alert-error');
  if (alertError) {
    alertError.remove();
  }
});

// form submit event
form.addEventListener('submit', (e) => {
  const alertError = document.createElement('p');
  alertError.textContent = 'Please select an activity';
  alertError.classList.add('alert-error');
  alertError.id = 'alert-error';

  const alertSuccess = document.createElement('p');
  alertSuccess.textContent = `Thank you for your submission. Your activity has been booked. We will send you a confirmation email shortly.`;
  alertSuccess.classList.add('alert-success');
  alertSuccess.id = 'alert-success';

  e.preventDefault();

  const formData = new FormData(form);
  const data = {
    activity: '',
    food_allergies: '',
    additional_info: '',
  };

  // get form data
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // check if activity is selected
  // if not, show alert error
  if (!data.activity) {
    const existingAlertError = document.querySelector('#alert-error');
    if (existingAlertError) {
      existingAlertError.remove();
    }
    activitySelect.insertAdjacentElement('afterend', alertError);
  } else {
    const existingAlertSuccess = document.querySelector('#alert-success');
    if (existingAlertSuccess) {
      existingAlertSuccess.remove();
    }

    form.insertAdjacentElement('afterend', alertSuccess);

    // clear form fields
    form?.reset();

    // remove alert success after 5 seconds
    setTimeout(() => {
      alertSuccess.remove();
    }, 5000);
  }
});
