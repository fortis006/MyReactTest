export type BookResponse = {
    id: string,
    name: string,
    author: string,
    daysremainingtoreturn: number,
    _links: {
        self: {href: string},
        book: {href: string},
        owner: {href: string}
    }
}

export type Book = {
    id: number;
    name: string;
    author: string;
    borrower: string;
    daysremainingtoreturn: number;
    image: string;
}

export type BookEntry = {
    book: Book;
    url: string;
}

export type Owner = {
    firstname: string,
    lastname: string
}
export type OwnerResponse = {
    firstname: string,
    lastname: string,
    _links: {
        self: {href: string},
        owner: {href: string}
    }
}
export type OwnerEntry = {
    owner: Owner;
    url: string;
}