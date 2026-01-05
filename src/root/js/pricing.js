async function loadPricing() {
  console.log("pricing loading");
  try {
    const response = await fetch("js/data/pricing.json");
    const data = await response.json();

    // 1. Populate Policy
    document.getElementById("policy-title").innerText = data.policy.title;
    const policyList = document.getElementById("policy-list");
    policyList.innerHTML = data.policy.details
      .map((item) => `<li>${item}</li>`)
      .join("");

    // 2. Populate Table

    const tableBody = document.getElementById("pricing-body");
    const robuxIcon = `<img src="assets/images/robuxicon.png" 
                        class="currency-icon" 
                        alt="Robux">`;

    // Inside your .map() function for the pricing table:
    tableBody.innerHTML = data.systems
      .map(
        (item) => `
    <tr>
        <td>
            <span class="system-name">${item.name}</span>
            <span class="system-desc">${item.description}</span>
        </td>
        <td class="price-cell">
            <div class="price-wrapper">
                ${robuxIcon}
                <span>${item.robux}</span>
            </div>
        </td>
        <td class="price-cell">
            <span class="usd-tag">${item.usd}</span>
        </td>
    </tr>
`
      )
      .join("");

    console.log("pricing load success");
  } catch (error) {
    console.error("Error loading pricing:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadPricing);
