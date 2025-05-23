# YouCan Wilaya Plugin

A vanilla JavaScript plugin for YouCan eCommerce stores that adds a dropdown field for selecting Algerian wilayas to the checkout form.

## Features

- Adds a dropdown with all 58 Algerian wilayas to the checkout form
- Includes both French and Arabic names for each wilaya
- Automatically injects into the checkout form
- Fully responsive design that adapts to different screen sizes
- Arabic (RTL) support
- No framework dependencies

## Installation

### Option 1: Quick Installation (Recommended)

1. Download the single file plugin: `youcan-wilaya-plugin.js`

2. Upload the file to your YouCan store's theme assets or to a CDN.

3. Add the following code to your YouCan store's theme, just before the closing `</body>` tag:

```html
<!-- YouCan Wilaya Plugin -->
<script src="path/to/youcan-wilaya-plugin.js"></script>
```

### Option 2: Separate Files

1. Download the plugin files:
   - `index.js` - Main plugin script
   - `wilayas.js` - Data file containing all Algerian wilayas
   - `style.css` - Styling for the dropdown

2. Upload the files to your YouCan store's theme assets or to a CDN.

3. Add the following code to your YouCan store's theme, just before the closing `</body>` tag:

```html
<!-- YouCan Wilaya Plugin -->
<script src="path/to/wilayas.js"></script>
<script src="path/to/index.js"></script>
<link rel="stylesheet" href="path/to/style.css">
```

## How It Works

The plugin:

1. Waits for the DOM to be fully loaded
2. Finds the checkout form using the form selector
3. Creates a dropdown with all 58 Algerian wilayas
4. Injects the dropdown after the region field
5. Hides the original city input field
6. Uses the city field name for the wilaya selection
7. Automatically adjusts styling based on screen size

## Configuration

If you need to customize the plugin, you can edit the `config` object in the JavaScript file:

```javascript
const config = {
  formSelector: '#express-checkout-form, form[class*="checkout"], form.checkout-form', // Target form selector
  insertAfterSelector: 'input[name="region"], .form-group.is-required:has(input[name="region"])', // Insert after region field
  fieldName: "city", // Name of the field for form submission
  labelText: 'الولاية', // Label text in Arabic
  placeholderText: 'اختر الولاية', // Placeholder text in Arabic
  requiredField: true, // Whether the field is required
  formGroupClass: 'form-group is-required', // Class for form group to match store styling
  labelClass: 'form-label', // Class for label to match store styling
};
```

## Troubleshooting

If the dropdown doesn't appear:

1. Check the browser console for any errors
2. Verify that the form selector matches your store's checkout form structure
3. Make sure the region field exists in your checkout form
4. Try adding the script at the end of your checkout page

## License

MIT License 