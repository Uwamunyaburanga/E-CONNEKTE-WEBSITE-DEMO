# E-CONNEKTE website prototype — version 2.3

## Files
- `index.html` — website structure and content
- `styles.css` — layout, brand styling and responsive design
- `script.js` — prototype interactions, language selection and accessibility controls
- `assets/econnekte-logo.png` — official E-CONNEKTE wordmark supplied by the project team

## Run locally
Open `index.html` in a browser, or use the VS Code Live Server extension.

## What's new in v2.3
- Added the official E-CONNEKTE logo to the website header.
- Added language selection for English, Italian, French, Spanish and German. Core navigation, welcome content, service cards, About and Contact content are translated. Other prototype content and modal messages may remain in English and should be translated in a later pass with native-speaker review.
- Added accessibility controls for larger/smaller text, high contrast and reduced motion.
- Added an inclusion statement and descriptive alternative text for the logo.

## Important prototype limitations
The language and accessibility settings run in the browser. This is an early accessibility improvement, not a formal accessibility certification. Keyboard and screen-reader testing with users is still needed. Translations should be reviewed by fluent speakers before public launch. Contact, accounts, listings, messaging and other demo actions are not connected to a production backend and do not send data to a server.

## What's improved in v2.4
- Refined the four home service cards with clearer typography, more readable descriptions and coordinated pastel artwork.
- Matched the service accents to a shared app/website palette: Mobility `#315FBD`, Marketplace `#187568`, Arrival & Living `#99500F`, Study Groups `#526B96`.
- Improved the accessibility toolbar, button states and keyboard focus indicators.
- Strengthened high-contrast mode so card descriptions and controls remain clearly readable.
- Kept the existing logo, page structure, language selector and prototype interactions.

## Note
The service colour values are also listed in `styles.css` as `--service-*` variables. Update the four MIT App Inventor button BackgroundColor properties to the same values for a consistent app and website identity.
