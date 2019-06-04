export class QueryService {
    query(queryText: string): Promise<any> {
        // ----- Query the API -----

        // ----- Return the result -----
        return Promise.resolve({
            data: {
                ticker: 'GOOG',
                name: 'Alphabet Company'
            }
        });
    }
}
