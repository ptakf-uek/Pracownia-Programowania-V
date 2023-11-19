"use strict";
class Supplier extends Customer {
    constructor(companyName, nip, city, street, streetNumber, apartmentNumber, zipCode, comment, industry, active, accountNumber) {
        super(companyName, nip, city, street, streetNumber, apartmentNumber, zipCode, comment, industry, active);
        this.accountNumber = accountNumber;
        this.invoices = [];
    }
}
