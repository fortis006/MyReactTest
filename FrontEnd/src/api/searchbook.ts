// __mocks__/searchBooks.ts
import { mockBooks } from './mock.ts';

export const searchBooks = async (query: string) => {
    return new Promise(resolve => {
        const results = mockBooks.filter(book => book.name.toLowerCase().includes(query.toLowerCase()));
        setTimeout(() => resolve(results), 500); // 模拟网络延迟
    });
};
