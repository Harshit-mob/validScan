export interface StandardResponse<T> {
    data: T;
    message: string;
    status: boolean;
}
