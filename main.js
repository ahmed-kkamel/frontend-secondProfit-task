const form = (() => {
  const form = document.getElementById("checkoutForm");
  const steps = Array.from(document.querySelectorAll(".step"));
  const nextButton = document.querySelector("[data-next]");
  const prevButton = document.querySelector("[data-prev]");
  const progressItems = document.querySelectorAll(".step-indicator");
  const progressFill = document.querySelector(".progress-fill");
  let currentStep = 0; // Track the current step

  // Validation rules for each field
  const validators = {
    firstName: (value) => value.trim().length >= 2, // At least 2 characters
    lastName: (value) => value.trim().length >= 2, // At least 2 characters
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Valid email format
    address: (value) => value.trim().length >= 5, // At least 5 characters
    city: (value) => value.trim().length >= 2, // At least 2 characters
    zipCode: (value) => /^\d{3,}$/.test(value), // Valid zip code format: only numbers and at least 3 digits
    cardNumber: (value) => /^\d{16}$/.test(value), // Exactly 16 digits
    expiry: (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value), // Valid MM/YY format
    cvv: (value) => /^\d{3,4}$/.test(value), // 3 or 4 digits
    cardName: (value) => value.trim().length >= 3, // At least 3 characters
  };

  // Debounce function to limit the rate of validation
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Show error message for invalid input
  function showError(input, message) {
    const error = input.nextElementSibling;
    error.textContent = message;
    error.classList.add("show");
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
  }

  // Clear error message for valid input
  function clearError(input) {
    const error = input.nextElementSibling;
    error.textContent = "";
    error.classList.remove("show");
    input.classList.remove("input-error");
    input.removeAttribute("aria-invalid");
  }

  // Validate a single input field
  function validateField(input) {
    if (!input.required) return true;
    const validator = validators[input.name];
    if (!validator) return true;

    // Validate the field value
    const isValid =
      input.type === "checkbox"
        ? validator(input)
        : validator(input.value.trim());
    if (!isValid) {
      showError(input, input.dataset.error);
      return false;
    }
    clearError(input);
    return true;
  }

  // Debounced validation function
  const debouncedValidateField = debounce(validateField, 300);

  // Populate the review step with entered data
  function handleReviewStep() {
    if (currentStep === 2) {
      // Only on the review step
      // Process shipping data
      const shippingHTML = Array.from(
        document.querySelectorAll('[data-review="shipping"]')
      )
        .map(
          (input) => `
            <div class="review-item">
              <span class="review-label">${input.previousElementSibling.textContent}</span>
              <span class="review-value">${input.value}</span>
            </div>
          `
        )
        .join("");

      // Process payment data
      const paymentHTML = Array.from(
        document.querySelectorAll('[data-review="payment"]')
      )
        .map((input) => {
          const label = input.previousElementSibling.textContent;
          const value =
            input.name === "cardNumber"
              ? `**** **** **** ${input.value.slice(-4)}`
              : input.value;

          return `
            <div class="review-item">
              <span class="review-label">${label}</span>
              <span class="review-value ${input.name}">${value}</span>
            </div>
          `;
        })
        .join("");

      // Update review section with shipping and payment data
      document.getElementById("review-shipping").innerHTML = shippingHTML;
      document.getElementById("review-payment").innerHTML = `
        <div class="payment-card-preview">
          <div class="card-chip"></div>
          <div class="payment-card-number">
            ${document
              .querySelector('[name="cardNumber"]')
              .value.match(/.{1,4}/g)
              .join(" ")} <!-- Format card number -->
          </div>
          <div class="card-details">
            <div>Expiry: ${
              document.querySelector('[name="expiry"]').value
            }</div>
            <div>CVV: ***</div> <!-- Mask CVV -->
          </div>
          <div class="card-name">
            ${document.querySelector('[name="cardName"]').value}
          </div>
        </div>
        ${paymentHTML}
      `;
    }
  }

  // Update progress bar and step indicators
  function updateProgress() {
    const totalSteps = steps.length - 1;

    // Update active step indicator
    progressItems.forEach((item, index) => {
      item.classList.toggle("active", index === currentStep);
      item.setAttribute(
        "aria-current",
        index === currentStep ? "step" : "false"
      );
    });

    // Update progress bar width
    const widthPercentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${widthPercentage}%`;
  }

  // Simulate form submission
  async function handleFormSubmit() {
    nextButton.disabled = true;
    nextButton.innerHTML = '<div class="loading"></div> Processing...';

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay

    alert("Order placed successfully!");
    nextButton.disabled = false;
    nextButton.textContent = "Next";
    form.reset();
    currentStep = 0;
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === 0);
    });
    updateProgress();
  }

  // Handle navigation between steps
  function handleStepNavigation(direction) {
    const currentStepEl = steps[currentStep];
    const inputs = currentStepEl.querySelectorAll("input, select");
    let isValid = true;

    // Validate all inputs in the current step
    inputs.forEach((input) => {
      if (input.required && !validateField(input)) isValid = false;
    });

    if (!isValid) return; // Stop if validation fails

    // Move to the next/previous step
    currentStepEl.classList.remove("active");
    currentStep += direction;
    steps[currentStep].classList.add("active");

    // Update button text on the last step
    if (currentStep === steps.length - 1) {
      nextButton.textContent = "Submit";
      handleReviewStep();
    } else {
      nextButton.textContent = "Next";
    }

    updateProgress();
  }

  // Initialize form functionality
  function init() {
    // Validate fields on input with debounce
    form.addEventListener("input", (e) => {
      if (e.target.tagName === "INPUT") debouncedValidateField(e.target);
    });

    // Handle next button click
    nextButton.addEventListener("click", () => {
      if (currentStep < steps.length - 1) handleStepNavigation(1);
      else handleFormSubmit();
    });

    // Handle previous button click
    prevButton.addEventListener("click", () => {
      if (currentStep > 0) handleStepNavigation(-1);
    });

    // Prevent default form submission
    form.addEventListener("submit", (e) => e.preventDefault());

    // Initialize progress bar
    updateProgress();
  }

  return { init };
})();

// Initialize form when the DOM is loaded
document.addEventListener("DOMContentLoaded", form.init);
