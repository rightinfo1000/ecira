/* ECIRA Interiors — interior cost calculator + lead capture */
let calculatedTotal = 0;
let calculatorInputs = {};

function showCalcForm() {
  const getVal = (id) => Number(document.getElementById(id).value) || 0;
  const getText = (id) => {
    const el = document.getElementById(id);
    return el.options ? el.options[el.selectedIndex].text : el.value;
  };

  const designRate = getVal('design');
  const bedroomCount = getVal('bedrooms');
  const carpet = getVal('carpet');
  const kFeet = getVal('kitchenFeet');
  const kFinish = getVal('kitchenFinish');
  const ward = getVal('wardrobe');
  const ceil = getVal('ceiling');

  let bedroomPrice = 0;
  if (designRate === 1700) bedroomPrice = bedroomCount * 100000;
  else if (designRate === 2200) bedroomPrice = bedroomCount * 125000;
  else if (designRate === 3000) bedroomPrice = bedroomCount * 150000;

  calculatedTotal =
    (carpet * designRate) +
    bedroomPrice +
    (kFeet * kFinish) +
    (ward * 1400) +
    (carpet * ceil);

  if (calculatedTotal <= 0) {
    alert("Please enter carpet area or select options.");
    return;
  }

  /* Save all calculator selections so they can be packed into the message field later */
  calculatorInputs = {
    design_level: getText('design'),
    bedrooms: getText('bedrooms'),
    carpet_area_sqft: carpet,
    kitchen_running_feet: kFeet,
    kitchen_finish: getText('kitchenFinish'),
    wardrobe_area_sqft: ward,
    false_ceiling: getText('ceiling')
  };

  document.getElementById('calculatorUI').style.display = "none";
  document.getElementById('leadForm').style.display = "block";

  /* Scroll the lead form into view so the user doesn't have to scroll up manually */
  document.getElementById('leadForm').scrollIntoView({ behavior: "smooth", block: "start" });
}

function submitLead(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  const minPrice = Math.round(calculatedTotal * 0.85);
  const maxPrice = Math.round(calculatedTotal * 1.20);
  const rangeText = "₹" + minPrice.toLocaleString("en-IN") + " - ₹" + maxPrice.toLocaleString("en-IN");

  document.getElementById('amount').innerHTML =
    "₹ " + minPrice.toLocaleString("en-IN") + " – ₹ " + maxPrice.toLocaleString("en-IN");

  /* Pack every calculator selection into one readable line for the existing
     "message" column in the Google Sheet — no new columns needed. */
  const messageText =
    "Calculator Lead | Design: " + calculatorInputs.design_level +
    " | Bedrooms: " + calculatorInputs.bedrooms +
    " | Carpet Area: " + calculatorInputs.carpet_area_sqft + " sqft" +
    " | Kitchen: " + calculatorInputs.kitchen_running_feet + " ft (" + calculatorInputs.kitchen_finish + ")" +
    " | Wardrobe: " + calculatorInputs.wardrobe_area_sqft + " sqft" +
    " | False Ceiling: " + calculatorInputs.false_ceiling +
    " | Estimated Range: " + rangeText;

  const scriptURL = "https://script.google.com/macros/s/AKfycbyYZc_2LzGUJ0FVhqjzCUkAlU1tBimo8_FXOXMFCJPI_mC9KCu0yPGJD1x_-FGP7lRVfA/exec";
  const formData = new URLSearchParams();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('email', '');
  formData.append('message', messageText);
  formData.append('estimated_cost', calculatedTotal);

  fetch(scriptURL, { method: "POST", mode: "no-cors", body: formData });

  document.getElementById('leadForm').style.display = "none";
  document.getElementById('result').style.display = "block";
  document.getElementById('result').scrollIntoView({ behavior: "smooth", block: "start" });
}

/* Service-tabs switcher (separate namespace from homepage how-it-works tabs) */
function openServiceTab(evt, tabId) {
  document.querySelectorAll(".service-tab-content").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".service-tabs button").forEach(b => b.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  evt.currentTarget.classList.add("active");
}
