import { renderHook } from 'react-hooks-testing-library';
import { useQuery } from './useQuery';

const mockCompany = {
    ticker: 'AAPL',
    name: 'Apple Inc.'
};

// ------------------------------------------------------------
// This works when QueryService is the default export
// See https://jestjs.io/docs/en/es6-class-mocks#calling-jestmock-docs-en-jest-object-jestmockmodulename-factory-options-with-the-module-factory-parameter
const mockQuery = jest.fn();
// jest.mock('./QueryService', () => {
//     return jest.fn().mockImplementation(() => {
//         return {query: mockQuery};
//     });
// });
// ------------------------------------------------------------

// ------------------------------------------------------------
// What to do when QueryService is a named export?
// ------------------------------------------------------------

describe('useQuery', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns a company', async () => {
        mockQuery.mockReturnValue(
            Promise.resolve({
                data: mockCompany
            })
        );

        const { result, waitForNextUpdate } = renderHook(() =>
            useQuery('AAPL')
        );

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeUndefined();
        expect(result.current.data).toBeUndefined();

        // Wait for the next hook update
        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeUndefined();
        expect(result.current.data).toEqual(mockCompany);
    });
});
