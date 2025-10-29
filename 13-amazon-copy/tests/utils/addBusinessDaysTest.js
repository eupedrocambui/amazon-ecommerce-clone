import { addBusinessDays } from "../../scripts/utils/addBusinessDays.js";

describe('teste suite: addBusinessDays', () => {
    it('adds business days properly', () => {
        expect(addBusinessDays('2025-10-28', 5)).toEqual('2025-11-04');
        expect(addBusinessDays('2025-10-27', 3)).toEqual('2025-10-30');
    });
});