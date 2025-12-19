document.getElementById('bmiForm').addEventListener('submit', function(e) {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const errorMessage = document.getElementById('errorMessage');

  errorMessage.style.display = 'none';

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
