interface IpostProduct {

    title: string;
    price: number;
    category: string;
    image: string;
}

declare const axios: {
    get<T>(url: string): Promise<{ data: T }>;
    post<T>(url: string, data?: IpostProduct): Promise<{ data: T }>;
    put<T>(url: string, data?: IpostProduct): Promise<{ data: T }>;
    delete<T>(url: string): Promise<{ data: T }>;
};