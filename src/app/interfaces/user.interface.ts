export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: string;
    country: Country;
}
export interface Country {
    id: string;
    name: string;
    value?: string;
    iso2?: string;
    iso3?: string;
    unicodeFlag?: string;
}