import { calculateProgressPercent } from "../../scripts/utils/trackingUtils.js";

describe('test suite: calculateProgressPercent', () => {
    // function parameters -> currentTimeOg, orderTimeOg, deliveryTimeOg

    it('calculates the percentage properly', () => {
        expect(calculateProgressPercent(
            '2025-11-03', '2025-10-27', '2025-11-05'
        )).toEqual(77);
    });

    it('returns 0 when order time equals current time', () => {
        expect(calculateProgressPercent(
            '2025-11-03', '2025-11-03', '2025-11-09'
        )).toEqual(0);
    });

    it('returns more than 100 when order has already been delivered', () => {
        expect(calculateProgressPercent(
            '2025-11-10', '2025-11-03', '2025-11-09'
        )).toEqual(116);
    });
});