# E-Commerce Checkout Multi-Step Form

## Overview

This project implements a **multi-step checkout form** designed for an e-commerce platform. The form is built using **plain HTML, CSS, and JavaScript** without reliance on any front-end frameworks. The focus is on **performance**, **validation**, **accessibility**, and **clean code structure**. The form includes real-time validation, a progress bar, and visual feedback, all while maintaining accessibility standards and optimizing for low-bandwidth connections.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Optimization Techniques](#optimization-techniques)
4. [Accessibility Considerations](#accessibility-considerations)
5. [File Structure](#file-structure)
6. [Setup and Usage](#setup-and-usage)
7. [Performance Report](#performance-report)

---

## Features

- **Multi-Step Form**: The form includes several steps to collect shipping, payment, and review information.
- **Real-Time Validation**: Input fields are validated as users type (e.g., email, zip code, and credit card validation).
- **Progress Bar**: A visual progress indicator shows the user’s current step in the process.
- **Error and Success Indicators**: Provides immediate feedback to users, such as error messages for invalid input or success indicators when validation passes.
- **Theme Toggle**: Users can switch between light and dark themes for better accessibility and customization.
- **Client-Side Form Submission**: The form submission is simulated with a loading state, and users receive an alert upon successful submission.
- **Keyboard Navigation**: The form is fully navigable using the keyboard for improved accessibility.

---

## Technologies Used

- **HTML5**: Used for the semantic structure of the form and ensuring accessibility through proper ARIA roles and attributes.
- **CSS3**: Modern styling with Flexbox and Grid for responsive design. A dark/light theme toggle is implemented.
- **JavaScript (ES6+)**: Plain JavaScript used for the form logic, validation, and modularity.
- **Optimized Techniques**: Defer script loading, lazy loading of images, and CSS modularization to reduce file sizes.

---

## Optimization Techniques

- **Defer Script Loading**: JavaScript is loaded asynchronously to avoid blocking the HTML parsing, improving first-paint performance.
- **First-Paint Optimization**: The focus was on reducing critical CSS and JavaScript to ensure that the page renders as quickly as possible.

---

## Accessibility Considerations

- **Semantic HTML**: Elements like `<label>`, `<fieldset>`, `<legend>`, and `<input>` are used to enhance accessibility.
- **ARIA Roles**: ARIA attributes like `aria-invalid`, `aria-live`, and `aria-labelledby` are used to provide better context for screen readers.
- **Keyboard Navigation**: The form is fully keyboard navigable. Input fields can be accessed using `Tab`, and users can navigate between steps using `Next` and `Previous` buttons.
- **Focus Management**: When moving between steps, the focus is shifted to the first input field of the new step to maintain a smooth user experience.

---

## File Structure

/checkout-form ├── index.html # Main HTML structure of the form ├── styles.css # Global styles (CSS) ├── scripts.js # Main JavaScript functionality ├── form-validation.js # JavaScript for form validation ├── utils.js # Helper functions for optimization └── images/ # Directory for any images (e.g., icons for the progress bar)

## Setup and Usage

1. **Clone the repository**:
   ```bash
   https://github.com/ahmed-kkamel/frontend-secondProfit-task.git
   cd frontend-secondProfit-task
   ```

---

## Performance Report

The form has been optimized for performance with the following enhancements:

## Optimizations

- **Defer Script Loading**  
  Ensures scripts do not block HTML parsing, resulting in faster page loads.

- **Debounce for Validations**  
  Implements a delay in executing validation logic, reducing redundant checks and improving performance during rapid input changes.

### Performance Scores

- **Lighthouse Performance**: 100/100
- **Lighthouse SEO**: 100/100
- **Lighthouse Accessibility**: 96/100

- **WebPageTest**: Fully loads in **2.2 seconds** on slow 3G connection.

### Recommendations for Further Improvements

- **Implement Clean and Modular Code**  
  Structure JavaScript into small, reusable modules to improve readability, maintainability, and debugging.

- **Minify JavaScript and CSS**  
  Use tools to minify JavaScript and CSS files, reducing file sizes and improving load times.

---
