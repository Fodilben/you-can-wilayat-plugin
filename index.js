/**
 * YouCan Wilaya Plugin
 * Injects a dropdown for selecting Algerian wilayas into the checkout form
 */

// Import wilayas if in a module environment, otherwise assume it's loaded in the global scope
let wilayasData;
if (typeof require !== 'undefined') {
  wilayasData = require('./wilayas.js');
} else {
  wilayasData = window.wilayas || [];
}

(function() {
  // Configuration
  const config = {
    formSelector: '#shipping-address-form', // Target form selector
    insertBeforeSelector: '.checkout-form__actions, button[type="submit"]', // Insert before this element
    fieldName: 'shipping_address[wilaya]', // Name of the field for form submission
    labelText: 'Wilaya', // Label text
    placeholderText: 'Select a wilaya', // Placeholder text
    requiredField: true, // Whether the field is required
  };

  // Initialize the plugin when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initWilayaDropdown);

  // Also try to initialize on page load in case DOMContentLoaded already fired
  window.addEventListener('load', function() {
    // Small delay to ensure all YouCan scripts have loaded
    setTimeout(initWilayaDropdown, 500);
  });

  // Function to initialize the wilaya dropdown
  function initWilayaDropdown() {
    // Find the target form
    const form = document.querySelector(config.formSelector);
    
    // If form doesn't exist, try again later or with different selectors
    if (!form) {
      console.log('YouCan Wilaya Plugin: Form not found. Retrying in 1 second...');
      setTimeout(function() {
        const alternativeSelectors = [
          'form.checkout-form',
          'form.shipping-form',
          'form[action*="shipping"]',
          'form[action*="checkout"]'
        ];
        
        for (const selector of alternativeSelectors) {
          const alternativeForm = document.querySelector(selector);
          if (alternativeForm) {
            injectWilayaDropdown(alternativeForm);
            return;
          }
        }
        
        console.error('YouCan Wilaya Plugin: Could not find a suitable form to inject the wilaya dropdown.');
      }, 1000);
      return;
    }
    
    // If form exists, inject the dropdown
    injectWilayaDropdown(form);
  }

  // Function to inject the wilaya dropdown into the form
  function injectWilayaDropdown(form) {
    // Check if the dropdown is already injected
    if (form.querySelector('.wilaya-container')) {
      return;
    }
    
    // Create container for the wilaya field
    const container = document.createElement('div');
    container.className = 'wilaya-container';
    
    // Create label
    const label = document.createElement('label');
    label.className = 'wilaya-label';
    label.setAttribute('for', 'wilaya-select');
    label.textContent = config.labelText;
    
    // Add required asterisk if the field is required
    if (config.requiredField) {
      const requiredSpan = document.createElement('span');
      requiredSpan.className = 'wilaya-required';
      requiredSpan.textContent = '*';
      label.appendChild(requiredSpan);
    }
    
    // Create select element
    const select = document.createElement('select');
    select.className = 'wilaya-select';
    select.id = 'wilaya-select';
    select.name = config.fieldName;
    
    if (config.requiredField) {
      select.setAttribute('required', 'required');
    }
    
    // Add placeholder option
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = config.placeholderText;
    placeholderOption.selected = true;
    placeholderOption.disabled = true;
    select.appendChild(placeholderOption);
    
    // Add wilaya options
    wilayasData.forEach(function(wilaya) {
      const option = document.createElement('option');
      option.value = wilaya.code;
      option.textContent = wilaya.name + ' (' + wilaya.code + ')';
      option.setAttribute('data-arabic', wilaya.arabic_name);
      select.appendChild(option);
    });
    
    // Create error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'wilaya-error';
    errorMessage.textContent = 'Please select a wilaya';
    
    // Append elements to container
    container.appendChild(label);
    container.appendChild(select);
    container.appendChild(errorMessage);
    
    // Find where to insert the container
    const insertBefore = form.querySelector(config.insertBeforeSelector);
    
    if (insertBefore) {
      // Insert before the specified element
      insertBefore.parentNode.insertBefore(container, insertBefore);
    } else {
      // If the specified element doesn't exist, append to the form
      form.appendChild(container);
    }
    
    // Add validation to the form
    form.addEventListener('submit', function(event) {
      if (config.requiredField && !select.value) {
        event.preventDefault();
        errorMessage.classList.add('show');
        select.focus();
      } else {
        errorMessage.classList.remove('show');
      }
    });
    
    // Hide error message when the user selects a wilaya
    select.addEventListener('change', function() {
      errorMessage.classList.remove('show');
    });
    
    // Inject CSS if it's not already injected
    injectCSS();
    
    console.log('YouCan Wilaya Plugin: Wilaya dropdown successfully injected.');
  }

  // Function to inject CSS
  function injectCSS() {
    // Check if the CSS is already injected
    if (document.getElementById('wilaya-plugin-css')) {
      return;
    }
    
    // Try to load the external CSS file
    const link = document.createElement('link');
    link.id = 'wilaya-plugin-css';
    link.rel = 'stylesheet';
    link.href = 'style.css';
    
    // Fallback to inline CSS if the external file fails to load
    link.onerror = function() {
      const style = document.createElement('style');
      style.id = 'wilaya-plugin-css';
      style.textContent = `
        .wilaya-container { margin-bottom: 15px; width: 100%; max-width: 100%; }
        .wilaya-label { display: block; margin-bottom: 5px; font-weight: 500; }
        .wilaya-select { 
          width: 100%; 
          max-width: 100%;
          padding: 10px; 
          border: 1px solid #ddd; 
          border-radius: 4px; 
          background-color: #fff; 
          font-size: 16px; 
          height: 46px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 12px;
          padding-right: 30px;
          text-overflow: ellipsis;
        }
        .wilaya-select:focus { outline: none; border-color: #4a90e2; box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2); }
        .wilaya-select option { font-size: inherit; }
        .wilaya-required { color: #e74c3c; margin-left: 3px; }
        .wilaya-error { color: #e74c3c; font-size: 12px; margin-top: 5px; display: none; }
        .wilaya-error.show { display: block; }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .wilaya-select { font-size: 15px; height: 44px; }
        }
        @media (max-width: 480px) {
          .wilaya-select { font-size: 14px; height: 42px; padding: 8px; padding-right: 28px; background-position: right 8px center; }
          .wilaya-label { font-size: 14px; }
        }
      `;
      document.head.appendChild(style);
    };
    
    document.head.appendChild(link);
  }
})(); 