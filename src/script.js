document.getElementById('addInput').addEventListener('click', function() {
    const newInputRow = document.createElement('div');
    newInputRow.classList.add('inputRow', 'flex', 'mb-3');

    const newFeetInput = document.createElement('input');
    newFeetInput.classList.add('feetInput', 'flex-1', 'mr-1', 'py-2', 'w-1/2', 'px-4', 'rounded', 'border', 'border-gray-300');
    newFeetInput.type = 'number';
    newFeetInput.placeholder = 'Feet';

    const newInchesInput = document.createElement('input');
    newInchesInput.classList.add('inchesInput', 'flex-1', 'ml-1', 'py-2', 'w-1/2', 'px-4', 'rounded', 'border', 'border-gray-300');
    newInchesInput.type = 'number';
    newInchesInput.placeholder = 'Inches';

    newInputRow.appendChild(newFeetInput);
    newInputRow.appendChild(newInchesInput);

    document.getElementById('inputsArea').appendChild(newInputRow);
});

document.getElementById('add').addEventListener('click', calculate('add'));
document.getElementById('subtract').addEventListener('click', calculate('subtract'));
document.getElementById('multiply').addEventListener('click', calculate('multiply'));
document.getElementById('divide').addEventListener('click', calculate('divide'));

function calculate(operation) {
    return function() {
        const feetInputs = Array.from(document.getElementsByClassName('feetInput'));
        const inchesInputs = Array.from(document.getElementsByClassName('inchesInput'));

        let totalFeet = Number(feetInputs[0].value);
        let totalInches = Number(inchesInputs[0].value);

        let total = convertToInches(totalFeet, totalInches);

        for (let i = 1; i < feetInputs.length; i++) {
            let feet = Number(feetInputs[i].value);
            let inches = Number(inchesInputs[i].value);

            if (operation === 'add') {
                total += convertToInches(feet, inches);
            } else if (operation === 'subtract') {
                total -= convertToInches(feet, inches);
            } else if (operation === 'multiply') {
                total *= convertToInches(feet, inches);
            } else if (operation === 'divide') {
                let divisor = convertToInches(feet, inches);
                if (divisor !== 0) {
                    total /= divisor;
                } else {
                    alert('Cannot divide by zero');
                    return;
                }
            }
        }

        totalFeet = Math.floor(total / 12);
        totalInches = total % 12;
        totalMeters = totalFeet * 0.3048;

        document.getElementById('result').textContent = `${totalFeet}'${totalInches}" (${totalMeters.toFixed(2)} m)`;
    };
}

function convertToInches(feet, inches) {
    return (feet * 12) + inches;
}

document.getElementById('reset').addEventListener('click', function() {
    const inputArea = document.getElementById('inputsArea');
    while (inputArea.firstChild) {
        inputArea.firstChild.remove();
    }

    // Add a new input row
    document.getElementById('addInput').click();

    document.getElementById('result').textContent = '';
});