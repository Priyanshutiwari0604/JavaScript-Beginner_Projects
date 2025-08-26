const display = document.getElementById("display");
let currentInput = "";
let shouldResetDisplay = false;

function appendToDisplay(input) {
    if (shouldResetDisplay) {
        display.value = "";
        shouldResetDisplay = false;
    }
    
    // Prevent display from getting too long (limit to 15 characters)
    if (display.value.length >= 15 && !['+', '-', '*', '/'].includes(input)) {
        return;
    }
    
    // Prevent multiple operators in a row
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/'];
    
    if (operators.includes(input) && operators.includes(lastChar)) {
        return;
    }
    
    // Prevent multiple decimal points in the same number
    if (input === '.') {
        const parts = display.value.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) {
            return;
        }
    }
    
    display.value += input;
    adjustFontSize();
}

function calculate() {
    try {
        // Replace display symbols with actual operators for calculation
        let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Check for division by zero
        if (expression.includes('/0')) {
            display.value = "Cannot divide by zero";
            shouldResetDisplay = true;
            return;
        }
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Check for invalid results
        if (isNaN(result) || !isFinite(result)) {
            display.value = "Error";
        } else {
            // Format the result to avoid floating point issues and handle large numbers
            let formattedResult = parseFloat(result.toFixed(10)).toString();
            
            // Handle very large numbers with scientific notation
            if (formattedResult.length > 12) {
                formattedResult = result.toExponential(6);
            }
            
            display.value = formattedResult;
        }
        
        shouldResetDisplay = true;
        adjustFontSize();
    } catch (error) {
        display.value = "Error";
        shouldResetDisplay = true;
        adjustFontSize();
    }
}

function clearDisplay() {
    display.value = "";
    shouldResetDisplay = false;
    adjustFontSize();
}

function deleteLast() {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
        adjustFontSize();
    }
}

// Function to dynamically adjust font size based on content length
function adjustFontSize() {
    const length = display.value.length;
    let fontSize;
    
    if (length <= 8) {
        fontSize = "2.5rem";
    } else if (length <= 12) {
        fontSize = "2rem";
    } else if (length <= 15) {
        fontSize = "1.5rem";
    } else {
        fontSize = "1.2rem";
    }
    
    display.style.fontSize = fontSize;
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

// Prevent context menu on buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});