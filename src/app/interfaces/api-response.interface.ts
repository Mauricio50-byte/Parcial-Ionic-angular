export interface ApiResponseInterface<T> {
    data: T;
    message: string;
    error: boolean;
}
