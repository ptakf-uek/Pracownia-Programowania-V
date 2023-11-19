document.getElementById("fillFormButton").onclick = () => { fillForm(); }
document.getElementById("customerForm").addEventListener("submit", (event) => { return saveCustomer(event); })

// Customer information modal box
let customerInfoModal = document.getElementById("customerInfoModal");
document.getElementById("closeCustomerInfoModal").onclick = () => { customerInfoModal.style.display = "none"; }
window.onclick = (event) => {
    if (event.target == customerInfoModal) {
        customerInfoModal.style.display = "none";
    }
}


const DEFAULT_CUSTOMER = new Customer("CoolCompany", "131314", "Krakał", "Wiślana",
    "154", "3", "12345", "This is a real cool company.", "1", true);

var customerMap = new Map();
refreshCustomerList();


function saveCustomer(event) {
    event.preventDefault();

    let newCustomer = new Customer();
    let formData = new FormData(document.getElementById("customerForm"));
    for (let data of formData) {
        newCustomer[data[0]] = data[1];
    }

    customerMap.set(newCustomer["nip"], newCustomer);

    refreshCustomerList();
}

function loadCustomer(nip) {
    let loadedCustomer = customerMap.get(nip);

    if (loadedCustomer) {
        fillForm(loadedCustomer);
    } else {
        console.log("No customer with the passed NIP could be found.");
    }
}

function displayCustomer(nip) {
    let loadedCustomer = customerMap.get(nip);

    if (loadedCustomer) {
        let customerInfoModal = document.getElementById("customerInfoModal");
        let customerInfoList = document.getElementById("customerInfoList");
        customerInfoList.innerHTML = "";

        for (key in loadedCustomer) {
            customerInfoList.innerHTML += `<div class="row align-items-start">
                <div class="col col-5 fw-bold">${JsToHumanReadableCustomerInfo[key]}</div>
                <div class="col col-7">${loadedCustomer[key]}</div>
            </div>`;
        }

        customerInfoModal.style.display = "block";
    } else {
        console.log("No customer with the passed NIP could be found.");
    }
}

function removeCustomer(nip) {
    customerMap.delete(nip);

    refreshCustomerList();
}

function fillForm(customer = DEFAULT_CUSTOMER) {
    for (let key in customer) {
        let element = document.getElementById(key);

        if (element.type == "checkbox") {
            element.checked = customer[key];
        } else {
            element.value = customer[key];
        }
    }
}

function refreshCustomerList() {
    let customerListContainer = document.getElementById("customerListContainer");

    if (customerMap.size == 0) {
        customerListContainer.style.display = "none";
    } else {
        let customerListElement = document.getElementById("customerList");
        customerListElement.innerHTML = "";

        for (let [nip, customer] of customerMap) {
            customerListElement.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center"">
            <div>${customer["companyName"]} <span class="fst-italic" style="color:gray;">(${nip})</span></div>
            <div>
                <button type="button" class="btn btn-primary" onclick="loadCustomer('${nip}')">Load</button>
                <button type="button" class="btn btn-secondary" onclick="displayCustomer('${nip}')">Display</button>
                <button type="button" class="btn btn-warning" onclick="removeCustomer('${nip}')">Remove</button>
            </div>
            </li>`;
        }

        customerListContainer.style.display = "block";
    }
}
