import { formatDate, formatDate2, formatDate3, formatDate4 } from "../../scripts/utils/formatDate.js";

describe('test suite: formatDate', () => {
    it('converts 2025-10-28T12:00:00Z format to "October 28" format', () => {
        expect(formatDate('2024-02-27T20:57:02.235Z')).toEqual('February 27');
        expect(formatDate('2025-10-28T12:00:00Z')).toEqual('October 28');
    });
});

describe('test suite: formatDate2', () => {
    it('converts 2025-10-28T12:00:00Z format to "2025-10-28" format', () => {
        expect(formatDate2('2024-02-27T20:57:02.235Z')).toEqual('2024-02-27');
        expect(formatDate2('2025-10-28T12:00:00Z')).toEqual('2025-10-28');
    });
});

describe('test suite: formatDate3', () => {
    it('converts "2025-10-28" format to "October, 28" format', () => {
        expect(formatDate3('2024-02-27')).toEqual('February, 27');
        expect(formatDate3('2025-10-28')).toEqual('October, 28');
    });
});

describe('test suite: formatDate4', () => {
    it('converts "2025-11-03" format to "Monday, November 3" format', () => {
        expect(formatDate4('2025-11-03')).toEqual('Monday, November 3');
    });
});
