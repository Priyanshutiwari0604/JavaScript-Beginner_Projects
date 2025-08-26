function convert() {
    const textbox = document.getElementById('textbox');
    const fahrenheitRadio = document.getElementById('fahrenheit');
    const celsiusRadio = document.getElementById('celsius');
    const result = document.getElementById('result');
    
    // Get the input temperature value
    const temp = parseFloat(textbox.value);
    
    // Check if the input is a valid number
    if (isNaN(temp)) {
        result.textContent = 'Please enter a valid number';
        return;
    }
    
    let convertedTemp;
    let resultText;
    
    // Check which radio button is selected
    if (fahrenheitRadio.checked) {
        // Convert Celsius to Fahrenheit
        convertedTemp = (temp * 9/5) + 32;
        resultText = `${temp}°C = ${convertedTemp.toFixed(2)}°F`;
    } else if (celsiusRadio.checked) {
        // Convert Fahrenheit to Celsius
        convertedTemp = (temp - 32) * 5/9;
        resultText = `${temp}°F = ${convertedTemp.toFixed(2)}°C`;
    } else {
        // No radio button selected
        result.textContent = 'Please select a conversion type';
        return;
    }
    
    // Display the result
    result.textContent = resultText;
}

// Optional: Add Enter key support
document.getElementById('textbox').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convert();
    }
});

// Optional: Add click event to radio option divs
document.querySelectorAll('.radio-option').forEach(option => {
    option.addEventListener('click', function() {
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
    });
});