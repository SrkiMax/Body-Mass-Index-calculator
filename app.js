


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
    if (bmi < 24.9) return "Normal weight";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
}

function getIdealWeightRangeKg(centimeters) {
    const heightM = parseFloat(centimeters) / 100;
    const minWeight = (18.5 * heightM * heightM).toFixed(1);
    const maxWeight = (24.9 * heightM * heightM).toFixed(1);
    return `${minWeight}kgs - ${maxWeight}kgs`;
}

function getIdealWeightRangeLbs(feet, inches) {
    const totalInches = (parseFloat(feet) * 12) + parseFloat(inches);
    const minWeight = ((18.5 * totalInches * totalInches) / 703).toFixed(1);
    const maxWeight = ((24.9 * totalInches * totalInches) / 703).toFixed(1);
    return `${minWeight}lbs - ${maxWeight}lbs`;
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
        // resultsContainer.textContent = "Please enter valid height and width"
        return
    }
    const bmi = calculateMetricBMI(weightKg, heightCm);
    const category = getClassification(parseFloat(bmi));
    displayResults(bmi, category);
}


function updateImperialBMI() {
    if (!heightFt.value || !heightIn.value || !weightSt.value || !weightLbs.value || heightFt.value <= 0 || heightIn.value <= 0 || weightSt.value <= 0 || weightLbs.value <= 0) {
        // resultsContainer.textContent = "Please enter valid imperial values";
        return
    }

    const bmi = calculateImperialBMI();
    const category = getClassification(parseFloat(bmi));
    displayResults(bmi, category);
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




heightCm.addEventListener("input", updateMetricBMI);
weightKg.addEventListener("input", updateMetricBMI);

heightFt.addEventListener("input", updateImperialBMI);
heightIn.addEventListener("input", updateImperialBMI);
weightSt.addEventListener("input", updateImperialBMI);
weightLbs.addEventListener("input", updateImperialBMI);