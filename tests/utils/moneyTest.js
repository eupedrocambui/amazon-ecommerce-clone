import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
    it('converts cents to dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('using 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounding numbers up', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    it('rounding numbers down', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });

    it('formats negative numbers', () => {
        expect(formatCurrency(-2000)).toEqual('-20.00');
    })
})