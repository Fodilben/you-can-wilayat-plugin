# YouCan Wilaya Plugin

A vanilla JavaScript plugin for YouCan eCommerce stores that adds a dropdown field for selecting Algerian wilayas to the checkout or address form.

## Features

- Adds a dropdown with all 58 Algerian wilayas to the checkout form
- Includes both French and Arabic names for each wilaya
- Automatically injects into the shipping address form
- Required field validation
- Fully responsive design that adapts to different screen sizes
- No framework dependencies

## Installation

1. Download the plugin files:
   - `index.js` - Main plugin script
   - `wilayas.js` - Data file containing all Algerian wilayas
   - `style.css` - Optional styling for the dropdown

2. Upload the files to your YouCan store's theme assets or to a CDN.

3. Add the following code to your YouCan store's theme, just before the closing `</body>` tag:

```html
<!-- YouCan Wilaya Plugin -->
<script src="path/to/wilayas.js"></script>
<script src="path/to/index.js"></script>
<link rel="stylesheet" href="path/to/style.css">
```

## Configuration

You can customize the plugin by modifying the `config` object in `index.js`:

```javascript
const config = {
  formSelector: '#shipping-address-form', // Target form selector
  insertBeforeSelector: '.checkout-form__actions', // Insert before this element
  fieldName: 'shipping_address[wilaya]', // Name of the field for form submission
  labelText: 'Wilaya', // Label text
  placeholderText: 'Select a wilaya', // Placeholder text
  requiredField: true, // Whether the field is required
};
```

## How It Works

The plugin:

1. Waits for the DOM to be fully loaded
2. Finds the checkout form using the configured selector
3. Creates a dropdown with all Algerian wilayas
4. Injects the dropdown into the form
5. Adds validation to ensure a wilaya is selected if required
6. Automatically adjusts styling based on screen size
7. Submits the selected wilaya with the form

## Responsive Design

The plugin includes responsive design features:
- Automatically adjusts font size and height based on screen width
- Optimized for mobile, tablet, and desktop views
- Smooth transitions when resizing the browser window

## Troubleshooting

If the dropdown doesn't appear:

1. Check the browser console for any errors
2. Verify that the form selector (`#shipping-address-form`) matches your store's checkout form
3. Try changing the `formSelector` in the config to match your store's form structure

## License

MIT License 