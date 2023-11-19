const DEFAULT_FORM_DATA = {
    "companyName": "CoolCompany",
    "nip": "131314",
    "city": "Krakał",
    "street": "Wiślana",
    "streetNumber": "154",
    "apartmentNumber": "3",
    "zipCode": "11321",
    "comment": "This is a real cool company.",
    "industry": "rockstarring",
    "active": true
}

var customerList = []

function saveCustomer(event) {
    event.preventDefault();

    let newCustomer = new FormData(document.getElementById("customerForm"));

    customerIndex = customerList.findIndex((customer) => customer.get("nip") == newCustomer.get("nip"));
    if (customerIndex == -1) {
        customerList.push(newCustomer);
    } else {
        customerList[customerIndex] = newCustomer;
    }

    refreshCustomerList();
}

function loadCustomer(nip) {
    let loadedCustomer = customerList.find((customer) => customer.get("nip") == nip);
    if (loadedCustomer) {
        for (let customerData of loadedCustomer) {
            let element = document.getElementById(customerData[0]);

            if (element.type == "checkbox") {
                element.checked = customerData[1];
            } else {
                element.value = customerData[1];
            }
        }
    } else {
        console.log("No customer with passed NIP.");
    }
}

function removeCustomer(nip) {
    customerList.splice(
        customerList.findIndex((customer) => customer.get("nip") == nip),
        1);

    refreshCustomerList();
}

function autoInputValues(formData = DEFAULT_FORM_DATA) {
    for (let i = 0; i < Object.keys(formData).length; i++) {
        let element = document.getElementsByName(Object.keys(formData)[i])[0];

        if (element.type == "checkbox") {
            element.checked = Object.values(formData)[i];
        } else {
            element.value = Object.values(formData)[i];
        }
    }
}

function refreshCustomerList() {
    let customerListElement = document.getElementById("customerList");
    customerListElement.innerHTML = "";

    for (let customer of customerList) {
        customerListElement.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center"">
        <div>
            ${customer.get("companyName")} (${customer.get("nip")})</div>
        <div>
            <button type="button" class="btn btn-primary" onclick="loadCustomer(${customer.get("nip")})">Load</button>
            <button type="button" class="btn btn-warning" onclick="removeCustomer(${customer.get("nip")})">Remove</button>
        </div>
        </li>`
    }
}
