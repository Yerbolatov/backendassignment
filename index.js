const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
    return res.sendFile(path.join(__dirname, 'public', 'error.html'));
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

  let html = fs.readFileSync(path.join(__dirname, 'views', 'result.html'), 'utf8');
  html = html.replace('{{WEIGHT}}', weight);
  html = html.replace('{{HEIGHT}}', height);
  html = html.replace('{{BMI_VALUE}}', bmiValue);
  html = html.replace('{{CATEGORY}}', category);
  
  html = html.replace('<div class="result-box" id="resultBox">', 
    `<div class="result-box" id="resultBox" style="background: linear-gradient(135deg, ${color}22 0%, ${color}11 100%); border-color: ${color};">`);
  html = html.replace('<div class="bmi-value" id="bmiValue">', 
    `<div class="bmi-value" id="bmiValue" style="color: ${color};">`);
  html = html.replace('<div class="category" id="category">', 
    `<div class="category" id="category" style="color: ${color};">`);

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`now running on http://localhost:${PORT}`);
});
