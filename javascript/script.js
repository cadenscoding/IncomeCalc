const form = document.getElementById("form");
let userArray = [];

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());

  userArray.push(dataObject);
  form.reset();

  summary(dataObject);
}

const marginalTaxRate = 0.22;

function summary(user) {
  let meTax = 0.071;
  let arTax = 0.059;
  let wvTax = 0.051;
  let userTax;
  let userState;
  if (user.userState === "Arkansas") {
    userTax = arTax;
  } else if (user.userState === "Maine") {
    userTax = meTax;
  } else if (user.userState === "West Virginia") {
    userTax = wvTax;
  } else {
    userTax = 0; // if state is not matched
  }

  let grossBlank = document.getElementById("grossOutput");
  grossBlank.textContent = parseFloat(user.grossIncome).toFixed(2);

  let stateDisplay = document.getElementById("stateInput");
  stateDisplay.textContent = user.userState;
  // console.log(stateInput.value)
  // console.log(userState);

  let taxCalc = document.getElementById("taxAmount");
  let taxAmount = parseFloat(user.grossIncome) * userTax;
  taxCalc.textContent = taxAmount.toFixed(2);

  let netCalc = document.getElementById("netPay");
  let netPay = parseFloat(user.grossIncome) - taxAmount;
  netCalc.textContent = netPay.toFixed(2);

  let monthlyCalc = document.getElementById("monthlyTax");
  let monthlyTax = netPay / 12;
  monthlyCalc.textContent = monthlyTax.toFixed(2);

  let marginalTaxCalc = document.getElementById("marginalTaxRate");
  marginalTaxCalc.textContent = (marginalTaxRate * 100).toFixed(2) + "%";

  let avgTaxCalc = document.getElementById("avgTaxRate");
  let avgTaxRate = taxAmount / parseFloat(user.grossIncome);
  avgTaxCalc.textContent = (avgTaxRate * 100).toFixed(2) + "%";
}