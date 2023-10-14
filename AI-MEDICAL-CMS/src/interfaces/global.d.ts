interface Window {
    addListener(method: any, listener: (this: Document, ev: any) => any): void;
    removeListener(method: any, listener: (this: Document, ev: any) => any): void;
}

interface Document {
    addListener(method: any, listener: (this: Document, ev: any) => any): void;
    removeListener(method: any, listener: (this: Document, ev: any) => any): void;
}

interface StringConstructor {
    isNullOrWhitespace(str?: string): boolean;
}

interface ArrayConstructor {
    isNullOrEmpty<T>(arr?: Array<T>): boolean;
}

interface Element {
    addListener(method: any, listener: (this: Document, ev: any) => any): void;
    removeListener(method: any, listener: (this: Document, ev: any) => any): void;
}