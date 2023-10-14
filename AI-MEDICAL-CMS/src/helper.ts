class URLEncodedFormData {
    form: HTMLFormElement | null = null;
    data: { [key: string]: any } = {};
    constructor(form: HTMLFormElement){
        this.form = form;

        // initial
        if (form instanceof Node) {
            const formData = new FormData(form);
            for (const [ key, value ] of formData.entries()){
                this.set(key, value);
            }
        }
    }
    set(key: string, value: any){
        const internalKey = key.replace("[]", "");
        if (this.data.hasOwnProperty(internalKey)) {
            if (key.indexOf("[]") > -1) {
                if (!Array.isArray(this.data[internalKey])) {
                    // replace value to array
                    this.data[internalKey] = [ this.data[internalKey] ]
                }
                this.data[internalKey].push(value);
            } else {
                this.data[internalKey] = value;
            }
        } else {
            if (key.indexOf("[]") > -1) {
                this.data[internalKey] = [ value ];
            } else {
                this.data[internalKey] = value;
            }
        }
    }
    remove(key: string){
        delete this.data[key.replace("[]", "")];
    }
    toString = () => serializeToQueryString(this.data);
}

export const getRandString = (length: number) : string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const toRgb = (str: string) => {
    const rgb = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/gmi.exec(str)
    if (rgb == null) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        str = str.length === 4 ? str.replace(shorthandRegex, (m, r, g, b) => r+r+g+g+b+b) : str;
        const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(str)
        if (hex == null) return null
        return {
            r: parseInt(hex[1], 16),
            g: parseInt(hex[2], 16),
            b: parseInt(hex[3], 16),
            a: 1
        }
    }
    return {
        r: parseInt(rgb[1]),
        g: parseInt(rgb[2]),
        b: parseInt(rgb[3]),
        a: parseFloat(rgb[4] ?? 1)
    }
}

// Read a page's GET URL variables and return them as an associative array.
export const getUrlParams = (query?: string) => {
    const pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = (s: string) => { return decodeURIComponent(s.replace(pl, " ")); },
        searchQuery  = query || window.location.search.substring(1);

    const urlParams : { [key: string]: string | string[] } = {};
    let match;
    while ((match = search.exec(searchQuery)) !== null) {
        if (urlParams[decode(match[1])] != null) {
            if (!Array.isArray(urlParams[decode(match[1])])) {
                urlParams[decode(match[1])] = [ urlParams[decode(match[1])] ] as string[];
            }
            (urlParams[decode(match[1])] as string[]).push(decode(match[2]));
            continue;
        }
        urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams;
}

type QueryStringValueType = number | boolean | string;

export const serializeToQueryString = (obj : { [key: string]: QueryStringValueType | QueryStringValueType[] }) => {
    let str = "";
    Object.keys(obj).forEach(key => {
        if (str !== "") {
            str += "&";
        }
        if (typeof obj[key] === "string" || typeof obj[key] === "number" || typeof obj[key] === "boolean") {
            str += key + "=" + encodeURIComponent(obj[key] as QueryStringValueType);
        } else if (Array.isArray(obj[key])) {
            str = str.slice(0, -1);
            (obj[key] as []).forEach(value => {
                if (str !== "") {
                    str += "&";
                }
                if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                    str += key + "=" + encodeURIComponent(value);
                } else {
                    throw new Error("serializeToQueryString: Unknown value type.");
                }
            });
        } else {
            throw new Error("serializeToQueryString: Unknown value type.");
        }
    })
    return str;
}

export const getFormAttributes = (form: HTMLFormElement) => {
    const formdata = new URLEncodedFormData(form);
    return formdata.data;
}

export const clearFormAttributesFromURL = (form: HTMLFormElement) => {
    const names = Array.from(form.querySelectorAll<HTMLInputElement>(":input:not([disabled])")).map((elm) => elm.name);

    const params = getUrlParams();
    names.forEach(name => {
        delete params[name];
    });

    if (Object.keys(params).length === 0) {
        return window.location.origin+window.location.pathname;
    }
    return window.location.origin+window.location.pathname+"?"+serializeToQueryString(params);
}

export const isUrl = (str: string): boolean => {
    return /((https?|s?ftp):\/\/|\/\/)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi.test(str);
}

export const sleepSync = (ms: number): void => {
    const start = new Date().getTime();
    const expire = start + ms;
    while (new Date().getTime() < expire) {}
    return;
}

export const mergeRefs = <T>(...refs: Array<React.ForwardedRef<T> | React.MutableRefObject<T> | ((inputElement: T) => void) | null>) => {
    const filteredRefs = refs.filter(Boolean);
    if (!filteredRefs.length) return null;
    if (filteredRefs.length === 0) return filteredRefs[0];
    return (obj: T) => {
        for (const ref of filteredRefs) {
            if (typeof ref === 'function') {
                ref(obj);
            } else if (ref) {
                ref.current = obj;
            }
        }
    };
}

export const keepKeys = (raw: { [key: string]: any }, keepKeys: string[]) => {
    return Object.keys(raw).filter(key => keepKeys.includes(key)).reduce((obj: { [key: string]: any }, key) => {
        obj[key] = raw[key];
        return obj;
    }, {})
}

export const filterKeys = (raw: { [key: string]: any }, filter: string[]) => {
    return Object.keys(raw).filter(key => !filter.includes(key)).reduce((obj: { [key: string]: any }, key) => {
        obj[key] = raw[key];
        return obj;
    }, {})
}

/**
 * if object inside object will consider transfer to value array
 */
export const objectToFormData = (object: { [key: string]: any }): FormData => {
    const formdata = new FormData();

    for (const key in object) {
        if (object[key] instanceof FileList) {
            for (const file of Array.from<File>(object[key])) {
                formdata.append(key, file);
            }
        } else if (Array.isArray(object[key])) {
            object[key].forEach((el: any) => {
                formdata.append(key, el);
            });
        } else if (typeof object[key] === 'object' && object[key] != null) {
            Object.values(object[key]).forEach((el: any) => {
                formdata.append(key, el);
            })
        } else {
            formdata.append(key, object[key]);
        }
    }

    return formdata;
}

export const stripHTML = (html: string): string => {
    return new DOMParser().parseFromString(html, 'text/html').body.textContent || "";
}

// TODO: Inline editing image and upload to server
export const dataURLtoBlob = (dataURI: string): Blob => {
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ? atob(dataURI.split(',')[1]) : unescape(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ ab ], { type: mimeString });
}