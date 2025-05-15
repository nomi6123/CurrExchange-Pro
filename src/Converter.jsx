import { useState, useEffect } from "react";
import { RefreshCw, ArrowRightLeft } from "lucide-react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Sample exchange rates (in a real app, you'd fetch these from an API)
  const exchangeRates = {
    USD: { EUR: 0.92, GBP: 0.79, JPY: 155.42, CAD: 1.36, AUD: 1.51, INR: 83.27, CNY: 7.22 },
    EUR: { USD: 1.09, GBP: 0.85, JPY: 168.42, CAD: 1.47, AUD: 1.64, INR: 90.27, CNY: 7.83 },
    GBP: { USD: 1.27, EUR: 1.17, JPY: 196.45, CAD: 1.72, AUD: 1.91, INR: 105.12, CNY: 9.13 },
    JPY: { USD: 0.0064, EUR: 0.0059, GBP: 0.0051, CAD: 0.0087, AUD: 0.0097, INR: 0.53, CNY: 0.046 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 114.55, AUD: 1.11, INR: 61.17, CNY: 5.31 },
    AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 102.83, CAD: 0.90, INR: 54.96, CNY: 4.77 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.87, CAD: 0.016, AUD: 0.018, CNY: 0.087 },
    CNY: { USD: 0.14, EUR: 0.13, GBP: 0.11, JPY: 21.52, CAD: 0.19, AUD: 0.21, INR: 11.53 }
  };

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "INR", name: "Indian Rupee" },
    { code: "CNY", name: "Chinese Yuan" },
  ];

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with a small delay
      setTimeout(() => {
        if (fromCurrency === toCurrency) {
          setExchangeRate(1);
          setConvertedAmount(amount);
        } else {
          const rate = exchangeRates[fromCurrency][toCurrency];
          setExchangeRate(rate);
          setConvertedAmount((amount * rate).toFixed(2));
        }
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to convert currency. Please try again.");
      setIsLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t to-blue-500 from-fuchsia-400 p-4">
      <div className="bg-white shadow-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Currency Converter</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
          />
        </div>
        
        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {currencies.map((currency) => (
                <option key={`from-${currency.code}`} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={swapCurrencies}
            className="mt-6 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <ArrowRightLeft size={20} className="text-blue-600" />
          </button>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {currencies.map((currency) => (
                <option key={`to-${currency.code}`} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Exchange Rate:</span>
            <div className="flex items-center">
              <span className="font-medium">
                {exchangeRate ? `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}` : "..."}
              </span>
              <button 
                onClick={convertCurrency} 
                className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                <RefreshCw size={14} className={`text-blue-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">
              {amount} {fromCurrency} =
            </p>
            <p className="text-3xl font-bold text-blue-700">
              {isLoading ? "Converting..." : convertedAmount ? formatCurrency(convertedAmount, toCurrency) : "..."}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-hite text-center">
        <p>Exchange rates are for demonstration purposes only.</p>
        <p>Last updated: May 15, 2025</p>
      </div>
    </div>
  );
}