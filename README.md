# BrewYard coffee project

A small React and TypeScript storefront with ordinary CSS. This is a demonstration, not a real shop.

## Run it in VS Code

1. Open this folder in VS Code.
2. Choose Terminal > New Terminal.
3. Run `npm install` once.
4. Run `npm run dev` and open http://localhost:3000.

If port 3000 is already occupied by the preview, use that preview or stop its terminal before starting a second server.

## Files to show

- `src/App.tsx`: product data, React state, cart functions and page sections.
- `src/index.css`: layout, colours and mobile breakpoints.
- `src/main.tsx`: mounts the app into the HTML root element.
- `server.ts`: starts the local preview server.

## Explain the interaction

1. The `products` array contains names, numeric prices and image references.
2. `useState` remembers the category, cart, mobile-menu state and feedback message.
3. `filter` selects products for the chosen category.
4. `map` turns product records into cards.
5. `addToCart` updates an existing quantity or adds a new row.
6. `reduce` calculates the number of items and the total cost.
7. The CSS media queries change the columns and menu on smaller screens.

## Personalise it

Change the heading and About paragraph to your own wording. Update the products array for your chosen menu. Change `--accent` in the CSS to try a different colour. Explain the code you understand and credit assistance according to your presentation requirements.

## Checks and limitations

`npm run check` checks TypeScript. `npm run build` creates the production files in dist. `npm run preview` serves that production build.

This is a browser-only demo cart: no real orders, address collection or payments. Cart contents reset on refresh. Coffee photos are illustrative Unsplash images and require an internet connection. No API key is needed.
