import React, { useState } from 'react';
import './App.css';

function App() {
  const [numberType, setNumberType] = useState('e');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:9876/numbers/${numberType}`);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="numberType">Select Number Type:</label>
            <select
              id="numberType"
              value={numberType}
              onChange={(e) => setNumberType(e.target.value)}
            >
              <option value="p">Prime Numbers</option>
              <option value="f">Fibonacci Numbers</option>
              <option value="e">Even Numbers</option>
              <option value="r">Random Numbers</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Calculate Average'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {response && (
          <div className="response">
            <h2>Results</h2>
            <div className="result-section">
              <h3>Previous Window State:</h3>
              <p>{JSON.stringify(response.windowPrevState)}</p>
            </div>
            <div className="result-section">
              <h3>Current Window State:</h3>
              <p>{JSON.stringify(response.windowCurrState)}</p>
            </div>
            <div className="result-section">
              <h3>New Numbers Received:</h3>
              <p>{JSON.stringify(response.numbers)}</p>
            </div>
            <div className="result-section">
              <h3>Average:</h3>
              <p>{response.avg}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
