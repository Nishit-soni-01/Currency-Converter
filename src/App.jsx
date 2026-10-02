import { useMemo, useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

const formatNumber = (value) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: value !== 0 && Math.abs(value) < 1 ? 6 : 2,
  }).format(value)

function App() {
  const [amount, setAmount] = useState('1')
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')

  const currencyInfo = useCurrencyInfo(from) || {}
  const options = Object.keys(currencyInfo)
  const isLoading = options.length === 0

  const rate = currencyInfo[to]
  const numericAmount = parseFloat(amount)
  const hasValidAmount = !Number.isNaN(numericAmount) && numericAmount >= 0

 
  const convertedAmount = useMemo(() => {
    if (!rate || !hasValidAmount) return ''
    return formatNumber(numericAmount * rate)
  }, [rate, numericAmount, hasValidAmount])

  const swap = () => {
    setFrom(to)
    setTo(from)
    if (convertedAmount) setAmount(String(numericAmount * rate))
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center px-4 py-8">
      {/* Fixed layer: always fills the entire viewport, regardless of parent size or scroll */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/5277968/pexels-photo-5277968.jpeg')`,
        }}
        aria-hidden="true"
      />
      {/* Dark overlay keeps text readable on top of the photo */}
      <div className="fixed inset-0 -z-10 bg-slate-950/55" aria-hidden="true" />

      <div className="relative w-full max-w-sm">
        <header className="mb-4 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Currency converter
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            Live exchange rates, updated as you type.
          </p>
        </header>

        <section className="rounded-2xl bg-white/95 p-4 shadow-2xl shadow-black/40 ring-1 ring-white/20 backdrop-blur-sm">
          <InputBox
            label="Amount"
            amount={amount}
            currencyOptions={options}
            selectCurrency={from}
            onCurrencyChange={setFrom}
            onAmountChange={setAmount}
            isLoading={isLoading}
          />

          <div className="relative my-2 flex items-center">
            <div className="h-px flex-1 bg-slate-200" />
            <button
              type="button"
              onClick={swap}
              aria-label="Swap currencies"
              title="Swap currencies"
              className="mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700 shadow-sm transition hover:bg-teal-50 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M7 4v16M7 20l-3-3M7 20l3-3" />
                <path d="M17 20V4M17 4l-3 3M17 4l3 3" />
              </svg>
            </button>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <InputBox
            label="Converted to"
            amount={convertedAmount}
            currencyOptions={options}
            selectCurrency={to}
            onCurrencyChange={setTo}
            amountDisable
            isLoading={isLoading}
          />

          <div
            className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5 text-sm"
            aria-live="polite"
          >
            {isLoading ? (
              <span className="text-slate-500">Loading exchange rates…</span>
            ) : !rate ? (
              <span className="text-red-600">
                No rate available for {from.toUpperCase()} to {to.toUpperCase()}.
                Try a different currency.
              </span>
            ) : (
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-slate-500">Exchange rate</span>
                <span className="font-medium tabular-nums text-slate-900">
                  1 {from.toUpperCase()} = {formatNumber(rate)} {to.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {!hasValidAmount && amount !== '' && (
            <p className="mt-3 text-sm text-red-600" role="alert">
              Enter a valid positive number.
            </p>
          )}
        </section>

        <p className="mt-4 text-center text-xs text-slate-300">
          Rates are indicative and may differ from bank or card rates.
        </p>
      </div>
    </main>
  )
}

export default App