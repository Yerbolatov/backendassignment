const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BMI Calculator</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #1a1a1a;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 40px;
          max-width: 500px;
          width: 100%;
        }

        h1 {
          color: #333;
          text-align: center;
          margin-bottom: 10px;
          font-size: 2.5em;
        }

        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
          font-size: 0.9em;
        }

        .form-group {
          margin-bottom: 25px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 600;
          font-size: 0.95em;
        }

        input[type="number"] {
          width: 100%;
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
          outline: none;
        }

        input[type="number"]:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        input[type="number"]:invalid {
          border-color: #ff6b6b;
        }

        .unit-hint {
          font-size: 0.85em;
          color: #999;
          margin-top: 5px;
        }

        button {
          width: 100%;
          padding: 15px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        button:active {
          transform: translateY(0);
        }

        .error-message {
          color: #ff6b6b;
          font-size: 0.9em;
          margin-top: 10px;
          text-align: center;
          display: none;
        }

        .info-box {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 15px;
          margin-top: 25px;
          border-radius: 5px;
        }

        .info-box h3 {
          color: #333;
          font-size: 1em;
          margin-bottom: 10px;
        }

        .info-box ul {
          list-style: none;
          font-size: 0.85em;
          color: #666;
        }

        .info-box li {
          padding: 5px 0;
        }

        .info-box li::before {
          content: "• ";
          color: #667eea;
          font-weight: bold;
          margin-right: 8px;
        }

        @media (max-width: 600px) {
          .container {
            padding: 30px 20px;
          }

          h1 {
            font-size: 2em;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>BMI Calculator</h1>
        <p class="subtitle">Calculate your Body Mass Index</p>
        
        <form id="bmiForm" method="POST" action="/calculate-bmi">
          <div class="form-group">
            <label for="weight">Weight:</label>
            <input 
              type="number" 
              id="weight" 
              name="weight" 
              placeholder="Enter your weight"
              step="0.1" 
              min="0.1"
              required
            >
            <div class="unit-hint">Kilograms (kg)</div>
          </div>

          <div class="form-group">
            <label for="height">Height:</label>
            <input 
              type="number" 
              id="height" 
              name="height" 
              placeholder="Enter your height"
              step="0.1" 
              min="1"
              required
            >
            <div class="unit-hint">Centimeters (cm)</div>
          </div>

          <button type="submit">Calculate BMI</button>
          <div class="error-message" id="errorMessage"></div>
        </form>
      </div>

      <script>
        document.getElementById('bmiForm').addEventListener('submit', function(e) {
          const weight = parseFloat(document.getElementById('weight').value);
          const height = parseFloat(document.getElementById('height').value);
          const errorMessage = document.getElementById('errorMessage');

          errorMessage.style.display = 'none';

          // Validate inputs
          if (isNaN(weight) || weight <= 0) {
            e.preventDefault();
            errorMessage.textContent = 'Please enter a valid positive weight.';
            errorMessage.style.display = 'block';
            return false;
          }

          if (isNaN(height) || height <= 0) {
            e.preventDefault();
            errorMessage.textContent = 'Please enter a valid positive height.';
            errorMessage.style.display = 'block';
            return false;
          }
        });
      </script>
    </body>
    </html>
  `);
});

app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error - BMI Calculator</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #1a1a1a;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
          .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            text-align: center;
          }
          h1 { color: #ff6b6b; margin-bottom: 20px; }
          p { color: #666; margin-bottom: 30px; }
          a {
            display: inline-block;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 10px;
            transition: transform 0.2s ease;
          }
          a:hover { transform: translateY(-2px); }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Invalid Input</h1>
          <p>Please enter valid positive numbers for weight and height.</p>
          <a href="/">Go Back</a>
        </div>
      </body>
      </html>
    `);
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const bmiValue = bmi.toFixed(1);

  let category, color;

  if (bmi < 18.5) {
    category = 'Underweight';
    color = '#3498db';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight';
    color = '#2ecc71';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    color = '#f39c12';
  } else {
    category = 'Obese';
    color = '#e74c3c';
  }

  // Return result page
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BMI Result</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #1a1a1a;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 40px;
          max-width: 500px;
          width: 100%;
          text-align: center;
        }

        h1 {
          color: #333;
          margin-bottom: 30px;
          font-size: 2em;
        }

        .result-box {
          background: linear-gradient(135deg, ${color}22 0%, ${color}11 100%);
          border: 3px solid ${color};
          border-radius: 15px;
          padding: 30px;
          margin: 30px 0;
        }

        .bmi-value {
          font-size: 4em;
          font-weight: bold;
          color: ${color};
          margin: 20px 0;
        }

        .category {
          font-size: 1.8em;
          font-weight: 600;
          color: ${color};
          margin: 15px 0;
        }

        .input-info {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
        }

        .input-info p {
          color: #666;
          margin: 8px 0;
          font-size: 0.95em;
        }

        .input-info strong {
          color: #333;
        }

        .buttons {
          margin-top: 30px;
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .button {
          flex: 1;
          min-width: 140px;
          padding: 15px 25px;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .button-primary {
          background: #667eea;
          color: white;
        }

        .button-secondary {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .scale {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .scale h3 {
          color: #333;
          margin-bottom: 15px;
          font-size: 1em;
        }

        .scale-bar {
          height: 30px;
          border-radius: 15px;
          display: flex;
          overflow: hidden;
          margin-bottom: 15px;
        }

        .scale-segment {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7em;
          color: white;
          font-weight: 600;
        }

        .scale-labels {
          display: flex;
          justify-content: space-around;
          font-size: 0.75em;
          color: #666;
        }

        @media (max-width: 600px) {
          .container {
            padding: 30px 20px;
          }

          .bmi-value {
            font-size: 3em;
          }

          .category {
            font-size: 1.5em;
          }

          .buttons {
            flex-direction: column;
          }

          .button {
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Your BMI Result</h1>

        <div class="input-info">
          <p><strong>Weight:</strong> ${weight} kg</p>
          <p><strong>Height:</strong> ${height} cm</p>
        </div>

        <div class="result-box">
          <div class="bmi-value">${bmiValue}</div>
          <div class="category">${category}</div>
        </div>

        <div class="scale">
          <h3>BMI Scale</h3>
          <div class="scale-bar">
            <div class="scale-segment" style="background: #3498db;">Under</div>
            <div class="scale-segment" style="background: #2ecc71;">Normal</div>
            <div class="scale-segment" style="background: #f39c12;">Over</div>
            <div class="scale-segment" style="background: #e74c3c;">Obese</div>
          </div>
          <div class="scale-labels">
            <span>&lt;18.5</span>
            <span>18.5-24.9</span>
            <span>25-29.9</span>
            <span>≥30</span>
          </div>
        </div>

        <div class="buttons">
          <a href="/" class="button button-primary">Calculate Again</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`now running on http://localhost:${PORT}`);
});
