import { useState, useEffect } from "react";
import Slider from "react-slick";
import { RefreshCw, ArrowRightLeft } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("PKR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencies = [
    { code: "PKR", name: "Pakistani Rupee", description: "Currency of Pakistan" },
    { code: "USD", name: "US Dollar", description: "Currency of the United States" },
    { code: "EUR", name: "Euro", description: "Currency used by the European Union" },
    { code: "GBP", name: "British Pound", description: "Currency of the United Kingdom" },
    { code: "JPY", name: "Japanese Yen", description: "Currency of Japan" },
    { code: "CAD", name: "Canadian Dollar", description: "Currency of Canada" },
    { code: "AUD", name: "Australian Dollar", description: "Currency of Australia" },
    { code: "INR", name: "Indian Rupee", description: "Currency of India" },
    { code: "CNY", name: "Chinese Yuan", description: "Currency of China" },
    { code: "AED", name: "Emirati Dirham", description: "Currency of the United Arab Emirates" },
    { code: "SAR", name: "Saudi Riyal", description: "Currency of Saudi Arabia" },
    { code: "CHF", name: "Swiss Franc", description: "Currency of Switzerland" },
    { code: "ZAR", name: "South African Rand", description: "Currency of South Africa" },
    { code: "BRL", name: "Brazilian Real", description: "Currency of Brazil" },
    { code: "RUB", name: "Russian Ruble", description: "Currency of Russia" },
    { code: "TRY", name: "Turkish Lira", description: "Currency of Turkey" },
    { code: "KRW", name: "South Korean Won", description: "Currency of South Korea" },
    { code: "NGN", name: "Nigerian Naira", description: "Currency of Nigeria" },
    { code: "MXN", name: "Mexican Peso", description: "Currency of Mexico" },
    { code: "THB", name: "Thai Baht", description: "Currency of Thailand" },
  ];

  const exchangeRates = {
    PKR: {
      USD: 0.0036, EUR: 0.0033, GBP: 0.0028, INR: 0.30, CNY: 0.026, PKR: 1
    },
    USD: {
      PKR: 278, EUR: 0.92, GBP: 0.79, JPY: 155.42, CAD: 1.36, AUD: 1.51, INR: 83.27, CNY: 7.22
    },
    EUR: {
      PKR: 300, USD: 1.09, GBP: 0.85, JPY: 168.42, CAD: 1.47, AUD: 1.64, INR: 90.27, CNY: 7.83
    },
    GBP: {
      PKR: 350, USD: 1.27, EUR: 1.17, JPY: 196.45, CAD: 1.72, AUD: 1.91, INR: 105.12, CNY: 9.13
    },
    JPY: {
      USD: 0.0064, EUR: 0.0059, GBP: 0.0051, CAD: 0.0087, AUD: 0.0097, INR: 0.53, CNY: 0.046
    },
    CAD: {
      USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 114.55, AUD: 1.11, INR: 61.17, CNY: 5.31
    },
    AUD: {
      USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 102.83, CAD: 0.90, INR: 54.96, CNY: 4.77
    },
    INR: {
      USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.87, CAD: 0.016, AUD: 0.018, CNY: 0.087, PKR: 3.4
    },
    CNY: {
      USD: 0.14, EUR: 0.13, GBP: 0.11, JPY: 21.52, CAD: 0.19, AUD: 0.21, INR: 11.53, PKR: 38
    }
    // Add more rates if needed
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    setIsLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        if (fromCurrency === toCurrency) {
          setExchangeRate(1);
          setConvertedAmount(amount);
        } else {
          const rate = exchangeRates[fromCurrency]?.[toCurrency];
          if (!rate) {
            setError("Exchange rate not available for selected currencies.");
            setConvertedAmount(null);
          } else {
            setExchangeRate(rate);
            setConvertedAmount((amount * rate).toFixed(2));
          }
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t to-blue-500 from-fuchsia-400 p-4">
      <div className="w-full max-w-md mb-6">
        <Slider {...sliderSettings}>
          <div className="bg-blue-100 text-blue-900 p-4 rounded-lg text-center">
            <p>1 PKR = 0.0036 USD</p>
          </div>
          <div className="bg-blue-100 text-blue-900 p-4 rounded-lg text-center">
            <p>1 USD = 278 PKR</p>
          </div>
          <div className="bg-blue-100 text-blue-900 p-4 rounded-lg text-center">
            <p>1 EUR = 300 PKR</p>
          </div>
        </Slider>
      </div>

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 relative z-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Currency Converter</h1>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

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
            <p className="text-xs text-gray-500 mt-1">
              {currencies.find((c) => c.code === fromCurrency)?.description}
            </p>
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
            <p className="text-xs text-gray-500 mt-1">
              {currencies.find((c) => c.code === toCurrency)?.description}
            </p>
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
                <RefreshCw size={14} className={`text-blue-600 ${isLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">
              {amount} {fromCurrency} =
            </p>
            <p className="text-3xl font-bold text-blue-700">
              {isLoading
                ? "Converting..."
                : convertedAmount
                ? formatCurrency(convertedAmount, toCurrency)
                : "..."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-white text-center">
        <p>Exchange rates are for demonstration purposes only.</p>
        <p>Last updated: May 16, 2025</p>
      </div>
    </div>
  );
}
