class Customer {
    companyName: string;
    nip: string;
    city: string;
    street: string;
    streetNumber: string;
    apartmentNumber: string;
    zipCode: string;
    comment: string;
    industry: string;
    active: boolean;

    constructor(companyName = "", nip = "", city = "", street = "", streetNumber = "",
        apartmentNumber = "", zipCode = "", comment = "", industry = "", active = false) {
        this.companyName = companyName;
        this.nip = nip;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
        this.apartmentNumber = apartmentNumber;
        this.zipCode = zipCode;
        this.comment = comment;
        this.industry = industry;
        this.active = active;
    }
}
