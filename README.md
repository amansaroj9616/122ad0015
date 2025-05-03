📊 Average Calculator HTTP Microservice
Description
The Average Calculator is a RESTful microservice designed to calculate the average of qualified numbers (Prime, Fibonacci, Even, and Random) fetched from a third-party API. It maintains a sliding window of a configurable size (default: 10) and ensures performance by responding within 500ms and handling timeouts/errors gracefully.

🔗 Endpoint
```
GET /numbers/{numberid}
```
Path Parameters:
{numberid}: Type of number to fetch. Must be one of:

p – Prime numbers

f – Fibonacci numbers

e – Even numbers

r – Random numbers

⚙️ Features
✅ Fetches numbers from a Test Server API (3rd-party)

✅ Supports types: Prime, Fibonacci, Even, and Random

✅ Maintains sliding window of fixed size (default: 10)

✅ Ignores:

Duplicate values

Responses > 500ms

Error responses

✅ Calculates average of stored values (if any)

✅ Returns:

Previous window state

Current window state

Newly added numbers

Average (rounded to 3 decimal places)

📦 Response Format
json
```
{
  "previousWindowState": [1, 1, 2, 3, 5],
  "currentWindowState": [1, 1, 2, 3, 5, 8, 13],
  "newNumbersReceived": [8, 13],
  "average": 4.714
}
```
⚠️ Constraints
❌ Do not generate numbers locally

✅ Only use Test Server API

🕓 Response must be returned within 500ms

🧠 All numbers must be unique

♻️ Once window exceeds limit, the oldest number is replaced

🔧 Configuration
You can configure the window size (default: 10) in the service settings.

🚀 How to Run
Clone the repository:
```
git clone https://github.com/yourusername/average-calculator-service.git
cd average-calculator-service
```
Install dependencies:

```
npm install
```
Start the server:
```
node server.js
```

GET /numbers/f
Returns:
```
{
  "previousWindowState": [1, 1, 2, 3, 5],
  "currentWindowState": [1, 1, 2, 3, 5, 8, 13],
  "newNumbersReceived": [8, 13],
  "average": 4.714
}
```
🧪 Testing
Ensure requests simulate real API calls, validate 500ms timeouts, and check correctness of the sliding window logic and average calculation.

👨‍💻 Author
Aman Saroj
122ad0015
IIIT Kurnool
