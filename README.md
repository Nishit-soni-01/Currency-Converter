# Currency Converter

A clean, responsive currency converter built with React and Tailwind CSS. Pick two currencies, type an amount, and the converted value updates instantly.

## Features

- Live conversion as you type, with no separate Convert button
- Swap currencies in one click; the converted value becomes the new amount
- Exchange rate line (for example, `1 USD = 83.12 INR`)
- Loading and error states for rates that are unavailable
- Input validation: digits and a single decimal point only
- Formatted results with thousands separators
- Responsive layout with a full-screen background image
- Accessible: labelled fields, visible focus rings, and screen-reader updates for rates

<img width="1912" height="872" alt="image" src="https://github.com/user-attachments/assets/6989e51e-a7b4-479c-96ae-c07a06e4cd81" />

<img width="1917" height="877" alt="image" src="https://github.com/user-attachments/assets/fcece570-200b-4ecf-8168-abfcac3fd000" />

<img width="1916" height="862" alt="image" src="https://github.com/user-attachments/assets/a5e90a7a-cfe6-483c-ae14-1548e6c05d89" />


## Tech stack

- [React](https://react.dev/) (hooks)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/) (recommended dev server and bundler)

## Project structure

```
src/
├── App.jsx                     # Main screen: state, conversion logic, layout
├── components/
│   ├── index.js                # Re-exports components
│   └── InputBox.jsx            # Amount field + currency dropdown
└── hooks/
    └── useCurrencyInfo.js      # Fetches exchange rates for a base currency
```

`components/index.js` should contain:

```js
export { default as InputBox } from './InputBox'
```

## Getting started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm

### Install and run

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# create a production build
npm run build

# preview the production build locally
npm run preview
```

If you are starting from scratch, create the project and add Tailwind first, then copy the files above into `src/`:

```bash
npm create vite@latest currency-converter -- --template react
cd currency-converter
npm install
```

Then follow the [Tailwind installation guide for Vite](https://tailwindcss.com/docs/installation) and make sure your CSS entry file (usually `src/index.css`) includes Tailwind.

## How it works

1. `App.jsx` keeps three pieces of state: the `amount`, the `from` currency, and the `to` currency.
2. `useCurrencyInfo(from)` returns an object of rates for the selected base currency, for example `{ inr: 83.12, eur: 0.92, ... }`.
3. The list of currency options comes from the keys of that object.
4. The converted amount is calculated from `amount × rates[to]` each time an input changes.
5. `swap` exchanges `from` and `to`, and moves the converted value into the amount field.

### `InputBox` props

| Prop               | Type       | Description                                         |
| ------------------ | ---------- | --------------------------------------------------- |
| `label`            | `string`   | Text shown above the field                          |
| `amount`           | `string`   | Value shown in the field                            |
| `onAmountChange`   | `function` | Called with the new amount string                   |
| `currencyOptions`  | `string[]` | Currency codes shown in the dropdown                |
| `selectCurrency`   | `string`   | Currently selected currency code                    |
| `onCurrencyChange` | `function` | Called with the newly selected currency code        |
| `amountDisable`    | `boolean`  | Makes the field read-only (used for the result)     |
| `isLoading`        | `boolean`  | Disables the dropdown while rates are loading       |
| `className`        | `string`   | Extra classes for the wrapper                       |

## Customization

All changes are Tailwind classes in `App.jsx` and `InputBox.jsx`.

| What to change        | Where                                                              |
| --------------------- | ------------------------------------------------------------------ |
| Background image      | The `backgroundImage` URL in `App.jsx`                             |
| Overlay darkness      | `bg-slate-950/55` in `App.jsx` (try `/40` for lighter, `/70` for darker) |
| Card width            | `max-w-sm` in `App.jsx` (`max-w-xs` is smaller, `max-w-md` is larger) |
| Accent color          | Replace `teal-*` classes with another Tailwind color               |
| Default currencies    | The initial `from` and `to` values in `App.jsx`                    |
| Default amount        | The initial `amount` value in `App.jsx`                            |

## Troubleshooting

**The background does not cover the whole screen.**
Remove leftover Vite starter styles from `index.css` or `App.css`, such as a `#root { max-width; padding }` rule or a default `body` margin or flex layout.

**The dropdown is empty or says "Loading exchange rates…" forever.**
Check the browser's Network tab for a failed request. The problem is usually the API URL in `useCurrencyInfo` or no internet connection.

**"No rate available" appears for a currency pair.**
The rates API does not provide that pair. Choose a different currency.

**Tailwind classes have no effect.**
Confirm Tailwind is installed and imported in your main CSS file, and that your Tailwind config scans `./src/**/*.{js,jsx}`.

## Notes

- Rates are indicative and may differ from bank or card rates.
- The background photo is loaded from Pexels. For production, download it into `public/` or `src/assets/` and reference it locally so the page does not depend on a third-party URL.

## License

Add your preferred license here (for example, MIT).
