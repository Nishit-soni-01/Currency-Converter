import { useId } from 'react'

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = 'usd',
  amountDisable = false,
  isLoading = false,
  className = '',
}) {
  const id = useId()

  // Allow only digits and a single decimal point
  const handleChange = (e) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) onAmountChange && onAmountChange(value)
  }

  return (
    <div
      className={`rounded-xl border bg-white p-3 transition focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-600/20 ${
        amountDisable ? 'border-transparent bg-slate-50' : 'border-slate-200'
      } ${className}`}
    >
      <label htmlFor={`${id}-amount`} className="mb-1 block text-xs font-medium text-slate-600">
        {label}
      </label>

      <div className="flex items-center gap-3">
        <input
          id={`${id}-amount`}
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          autoComplete="off"
          className="w-full min-w-0 bg-transparent text-2xl font-semibold tabular-nums text-slate-900 placeholder-slate-300 outline-none"
          value={amount}
          disabled={amountDisable}
          readOnly={amountDisable}
          onChange={handleChange}
        />

        <select
          aria-label={`${label} currency`}
          className="shrink-0 cursor-pointer rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold uppercase text-slate-800 outline-none transition hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-teal-600 disabled:cursor-wait disabled:opacity-60"
          value={selectCurrency}
          disabled={isLoading}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {/* Keep the current value selectable while rates are still loading */}
          {isLoading && <option value={selectCurrency}>{selectCurrency}</option>}
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default InputBox