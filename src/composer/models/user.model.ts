/**
 * @example
 * const u : User = {
 *     id: '1',
 *     name: 'jack',
 *     email: 'jack@example.com',
 *     claims: ["anonymouse"]
 * }
 */
export interface User {
    id: string;
    name: string;
    email: string;
    photo: string;
    claims: string[];
}
