/**
 * @example
 * const u : User = {
 *     id: '1',
 *     name: 'jack',
 *     email: 'jack@example.com',
 *     claims: {anonymouse: true}
 * }
 */
export interface User {
    id: string;
    name: string;
    email: string;
    claims: string[];
}
