import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  const getExchangeRate = async () => {
    try {
      let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
      const res = await axios.get(url);
      console.log(res.data);
      const rate = res.data.rates[toCurrency];
      setExchangeRate(rate);
      setConvertedAmount(amount * rate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value); // convert to float from the value
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="App">
      <div className='title'></div>
      <h1>Currency Converter</h1>
      <label htmlFor='Amount' className='label'>Amount</label>
      <input
        className="input"
        type='number'
        id='amt'
        value={amount}
        onChange={handleAmountChange}
      />
      <label className='label'>From currency</label>
      <select
        className='drop'
        value={fromCurrency}
        onChange={handleFromCurrencyChange}
      >
        <option value="USD">USD - United States Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">GBP - British Pound Sterling</option>
        <option value="JPY">JPY - Japanese Yen</option>
        <option value="AUD">AUD - Australian Dollar</option>
        <option value="CAD">CAD - Canadian Dollar</option>
        <option value="CNY">CNY - Chinese Yuan</option>
        <option value="INR">INR - Indian Rupee</option>
        <option value="BRL">BRL - Brazilian Real</option>
        <option value="ZAR">ZAR - South African Rand</option>
      </select>
      <label className='label'>To currency</label>
      <select
        className='drop'
        id='tocurrency'
        value={toCurrency}
        onChange={handleToCurrencyChange}
      >
        <option value="USD">USD - United States Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">GBP - British Pound Sterling</option>
        <option value="JPY">JPY - Japanese Yen</option>
        <option value="AUD">AUD - Australian Dollar</option>
        <option value="CAD">CAD - Canadian Dollar</option>
        <option value="CNY">CNY - Chinese Yuan</option>
        <option value="INR">INR - Indian Rupee</option>
        <option value="BRL">BRL - Brazilian Real</option>
        <option value="ZAR">ZAR - South African Rand</option>
      </select>
      <div className='result'>
        <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
      </div>
    </div>
  );
}

export default App;
