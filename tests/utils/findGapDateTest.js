import { findGap } from "../../scripts/utils/findGapDate.js";

describe('test suite: findGapDate', () => {
    it('finds the gap (in days) between two dates properly', () => {
        expect(findGap('2025-10-21', '2025-10-25')).toEqual(4);
        expect(findGap('2025-10-28', '2025-11-10')).toEqual(13);
    });
});