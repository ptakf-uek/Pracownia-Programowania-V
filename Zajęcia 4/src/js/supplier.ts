class Supplier extends Customer {
    accountNumber: string;
    invoices: string[];

    constructor(companyName: string, nip: string, city: string, street: string, streetNumber: string,
        apartmentNumber: string, zipCode: string, comment: string, industry: string, active: boolean, accountNumber: string) {
        super(companyName, nip, city, street, streetNumber, apartmentNumber, zipCode, comment, industry, active);

        this.accountNumber = accountNumber;
        this.invoices = [];
    }
}
