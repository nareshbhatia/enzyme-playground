import { useState, useEffect } from 'react';
import { QueryService } from './QueryService';

export const useQuery = <TData>(
    queryText: string
): { loading: boolean; error: any; data?: TData } => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState<TData>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const queryService = new QueryService();
                const response = await queryService.query(queryText);
                setData(response.data);
                setLoading(false);
            } catch (e) {
                setError(e);
            }
        };

        fetchData();
    }, [queryText]);

    return { loading, error, data };
};
