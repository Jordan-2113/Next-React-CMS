import { filterKeys, getUrlParams, isUrl, keepKeys, objectToFormData, serializeToQueryString, stripHTML, toRgb } from "./helper";

test('White hex toRgb', () => {
    expect(toRgb('#fff')).toMatchObject({ r: 255, g: 255, b: 255, a: 1 });
});

test('White rgb toRgb', () => {
    expect(toRgb('rgb(255, 255, 255)')).toMatchObject({ r: 255, g: 255, b: 255, a: 1 });
});

test('White rgba toRgb', () => {
    expect(toRgb('rgba(255, 255, 255, 0.6)')).toMatchObject({ r: 255, g: 255, b: 255, a: 0.6 });
});

test('Parse url params 1', () => {
    expect(getUrlParams('a=abc&b=abc')).toMatchObject({ a: 'abc', b: 'abc' });
});

test('Parse url params 2', () => {
    expect(getUrlParams('a=abc&a=abc')).toMatchObject({ a: [ 'abc', 'abc' ] });
});

test('Parse url params 3', () => {
    expect(getUrlParams('a=abc&a=abc&b=abc')).toMatchObject({ a: [ 'abc', 'abc' ], b: 'abc' });
});

test('Parse url params 4', () => {
    expect(getUrlParams('a=1&b=2')).toMatchObject({ a: '1', b: '2' });
});

test('serializeToQueryString 1', () => {
    expect(serializeToQueryString({ a: 'abc' })).toMatch('a=abc');
});

test('serializeToQueryString 2', () => {
    expect(serializeToQueryString({ a: 'abc', b: 'def' })).toMatch('a=abc&b=def');
});

test('serializeToQueryString 3', () => {
    expect(serializeToQueryString({ a: 'abc', b: ['def', 'efg'] })).toMatch('a=abc&b=def&b=efg');
});

test('serializeToQueryString 4', () => {
    expect(serializeToQueryString({ a: 1001, b: [true, 1] })).toMatch('a=1001&b=true&b=1');
});

test('isUrl 1', () => {
    expect(isUrl("https://example.com")).toBeTruthy();
});

test('isUrl 2', () => {
    expect(isUrl("http://example.com")).toBeTruthy();
});

test('isUrl 3', () => {
    expect(isUrl("ftp://example.com")).toBeTruthy();
});

test('isUrl 4', () => {
    expect(isUrl("//example.com")).toBeTruthy();
});

test('isUrl 5', () => {
    expect(isUrl("sub.example.com")).toBeTruthy();
});

test('isUrl 6', () => {
    expect(isUrl("12345")).toBeFalsy();
});

test('keepKeys 1', () => {
    expect(keepKeys({ a: 'abc', b: '123', c: 'def' }, [ 'c' ])).toMatchObject({ c: 'def' });
});

test('keepKeys 2', () => {
    expect(keepKeys({ a: 'abc', b: '123', c: 'def' }, [])).toMatchObject({});
});

test('filterKeys 1', () => {
    expect(filterKeys({ a: 'abc', b: '123', c: 'def' }, [ 'c' ])).toMatchObject({ a: 'abc', b: '123' });
});

test('filterKeys 2', () => {
    expect(filterKeys({ a: 'abc', b: '123', c: 'def' }, [])).toMatchObject({ a: 'abc', b: '123', c: 'def' });
});

test('object to formData 1', () => {
    const formdata = objectToFormData({ a: "123", e: "def" });
    expect(formdata.get("a")).toMatch("123");
    expect(formdata.get("e")).toMatch("def");
});

test('object to formData 2', () => {
    const formdata = objectToFormData({ a: ["123", "def"] });
    expect(formdata.getAll("a")).toEqual(["123", "def"]);
});

test('object to formData 3', () => {
    const formdata = objectToFormData({ a: { bc: "123", ef: "def" } });
    expect(formdata.getAll("a")).toEqual(["123", "def"]);
});

test('parse html 1', () => {
    expect(stripHTML("<p>abc</p>")).toMatch("abc");
});

test('parse html 2', () => {
    expect(stripHTML("<p>abc<br />123</p>")).toMatch("abc123");
});

test('parse html 3', () => {
    expect(stripHTML("<p>abcdefg</p>")).toMatch("abcdefg");
});