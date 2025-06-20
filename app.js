


const metric = document.querySelector('.height-weight-metric');
const imperial = document.querySelector('.height-weight-imperial');
const radioMetric = document.getElementById('Radios1');
const radioImperial = document.getElementById('Radios2');


// Input fields
const heightCm = document.getElementById("metricHeight");
const weightKg = document.getElementById("metricWeight");
const heightFt = document.getElementById("heightFt");
const heightIn = document.getElementById("heightIn");
const weightSt = document.getElementById("weightSt");
const weightLbs = document.getElementById("weightLbs");

const allInputs = document.querySelectorAll("input");

const resultsContainer = document.querySelector(".BMI");
const defaultResultsHTML = resultsContainer.innerHTML; // Original content

function resetForm() {
    resultsContainer.innerHTML = defaultResultsHTML;
    allInputs.forEach(input => {
        input.value = 0;
    });


}


radioMetric.addEventListener('change', () => {
    if (radioMetric.checked) {
        metric.style.display = 'grid';
        imperial.style.display = 'none';
        resetForm();
        updateMetricBMI();

    }
});

radioImperial.addEventListener('change', () => {
    if (radioImperial.checked) {
        metric.style.display = 'none';
        imperial.style.display = 'grid';
        resetForm();
        updateImperialBMI();

    }
});


function getClassification(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
}

function getIdealWeightRangeKg(centimeters) {
    const heightM = parseFloat(centimeters) / 100;
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 25 * heightM * heightM;
    return `${minWeight.toFixed(1)}kgs - ${maxWeight.toFixed(1)}kgs`;
}

function getIdealWeightRangeLbs(feet, inches) {
    const totalInches = (parseFloat(feet) * 12) + parseFloat(inches);
    const minWeight = (18.5 * totalInches * totalInches / 703);
    const maxWeight = (25 * totalInches * totalInches / 703);
    return `${minWeight.toFixed(1)}lbs - ${maxWeight.toFixed(1)}lbs`;
}

function calculateMetricBMI(weightKg, heightCm) {
    const heightM = heightCm.value / 100;
    const bmi = weightKg.value / (heightM * heightM)
    return bmi.toFixed(1);
}



function calculateImperialBMI() {
    const totalInches = (parseFloat(heightFt.value) * 12) + parseFloat(heightIn.value);
    const totalPounds = (parseFloat(weightSt.value) * 14) + parseFloat(weightLbs.value);
    const bmi = (totalPounds * 703) / (totalInches * totalInches);
    return bmi.toFixed(1);
}


function updateMetricBMI() {
    if (!heightCm.value || !weightKg.value || heightCm.value <= 0 || weightKg.value <= 0) {

        return
    }


    const rawBMI = weightKg.value / ((heightCm.value / 100) ** 2);
    const category = getClassification(rawBMI); // No rounding here!
    const displayBMI = rawBMI.toFixed(1);       // Only for display

    displayResults(displayBMI, category);
}


function updateImperialBMI() {
    if (!heightFt.value || !heightIn.value || !weightSt.value || !weightLbs.value || heightFt.value <= 0 || heightIn.value <= 0 || weightSt.value <= 0 || weightLbs.value <= 0) {

        return
    }



    const totalInches = (parseFloat(heightFt.value) * 12) + parseFloat(heightIn.value);
    const totalPounds = (parseFloat(weightSt.value) * 14) + parseFloat(weightLbs.value);
    const rawBMI = (totalPounds * 703) / (totalInches ** 2);
    const category = getClassification(rawBMI); // Use raw BMI
    const displayBMI = rawBMI.toFixed(1);       // Display version

    displayResults(displayBMI, category);
}


function displayResults(bmi, category) {
    resultsContainer.innerHTML = "";

    const bmiHeader = document.createElement("p");
    bmiHeader.textContent = `Your BMI is...`
    bmiHeader.classList.add("bmiHeader");

    const bmiSpan = document.createElement("span");
    bmiSpan.textContent = `${bmi}`;
    bmiSpan.classList.add("score");

    const bmiText = document.createElement("p");
    const idealRangeKg = getIdealWeightRangeKg(heightCm.value);
    const idealRangeLbs = getIdealWeightRangeLbs(heightFt.value, heightIn.value);



    if (radioMetric.checked) {
        bmiText.textContent = `Your BMI suggest you're ${category}. Your ideal weight is between ${idealRangeKg}.`;
    } else if (radioImperial.checked) {
        bmiText.textContent = `Your BMI suggest you're ${category}. Your ideal weight is between ${idealRangeLbs}.`;
    }

    bmiText.classList.add("bmiText");

    const scoreWrapper = document.createElement("div");
    scoreWrapper.appendChild(bmiHeader);
    scoreWrapper.appendChild(bmiSpan);
    scoreWrapper.classList.add("scoreWrapper");

    resultsContainer.appendChild(scoreWrapper);
    resultsContainer.appendChild(bmiText);
    resultsContainer.classList.add("resultsContainer");



}



// Validation: prevent entering more than 11 inches
heightIn.addEventListener("input", () => {
    const value = parseFloat(heightIn.value);
    if (value > 11) {
        alert("Please enter inches between 0 and 11.");
        heightIn.value = 11;
    }
});

// Validation: prevent entering more than 13.9 lbs
weightLbs.addEventListener("input", () => {
    const value = parseFloat(weightLbs.value);
    if (value > 13.9) {
        alert("Please enter pounds between 0 and 13.");
        weightLbs.value = 13.9;
    }
});




heightCm.addEventListener("input", updateMetricBMI);
weightKg.addEventListener("input", updateMetricBMI);

heightFt.addEventListener("input", updateImperialBMI);
heightIn.addEventListener("input", updateImperialBMI);
weightSt.addEventListener("input", updateImperialBMI);
weightLbs.addEventListener("input", updateImperialBMI);