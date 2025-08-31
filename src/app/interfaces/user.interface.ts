export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    contry: Country;
}
export interface Country {
    id: string;
    name: string;
}