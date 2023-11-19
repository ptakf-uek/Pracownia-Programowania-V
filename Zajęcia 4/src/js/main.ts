// TypeScript hack
function getElementById(elementName: string): HTMLFormElement {
    return document.getElementById(elementName) as HTMLFormElement;
}


getElementById("fillFormButton").onclick = () => { fillForm(); }
getElementById("customerForm").addEventListener("submit", (event) => { return saveCustomer(event); })

// Customer information modal box
let customerInfoModal = getElementById("customerInfoModal");
getElementById("closeCustomerInfoModal").onclick = () => { customerInfoModal.style.display = "none"; }
window.onclick = (event) => {
    if (event.target == customerInfoModal) {
        customerInfoModal.style.display = "none";
    }
}


const DEFAULT_CUSTOMER = new Customer("CoolCompany", "131314", "Krakał", "Wiślana",
    "154", "3", "12345", "This is a real cool company.", "1", true);

var customerMap = new Map();
refreshCustomerList();


function saveCustomer(event: Event) {
    event.preventDefault();

    let newCustomer: {[index: string]: any} = new Customer();
    let formData = new FormData(getElementById("customerForm"));
    for (let data of formData) {
        newCustomer[data[0]] = data[1];
    }

    customerMap.set(newCustomer["nip"], newCustomer);

    refreshCustomerList();
}

function loadCustomer(nip: string) {
    let loadedCustomer = customerMap.get(nip);

    if (loadedCustomer) {
        fillForm(loadedCustomer);
    } else {
        console.log("No customer with the passed NIP could be found.");
    }
}

function displayCustomer(nip: string) {
    let loadedCustomer = customerMap.get(nip);

    if (loadedCustomer) {
        let customerInfoModal = getElementById("customerInfoModal");
        let customerInfoList = getElementById("customerInfoList");
        customerInfoList.innerHTML = "";

        for (const key in loadedCustomer) {
            customerInfoList.innerHTML += `<div class="row align-items-start">
                <div class="col col-5 fw-bold">${jsToHumanReadableCustomerInfo[key]}</div>
                <div class="col col-7">${loadedCustomer[key]}</div>
            </div>`;
        }

        customerInfoModal.style.display = "block";
    } else {
        console.log("No customer with the passed NIP could be found.");
    }
}

function removeCustomer(nip: string) {
    customerMap.delete(nip);

    refreshCustomerList();
}

function fillForm(customer = DEFAULT_CUSTOMER) {
    let key: keyof typeof customer;
    for (key in customer) {
        let element = getElementById(key);

        if (element.type == "checkbox") {
            element.checked = customer[key];
        } else {
            element.value = customer[key];
        }
    }
}

function refreshCustomerList() {
    let customerListContainer = getElementById("customerListContainer");

    if (customerMap.size == 0) {
        customerListContainer.style.display = "none";
    } else {
        let customerListElement = getElementById("customerList");
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
