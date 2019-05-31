import { useState, useEffect } from 'react';
import { Company } from './Company';

export const useCompanyQuery = (
    ticker?: string
): { loading: boolean; error: any; company?: Company } => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [company, setCompany] = useState<Company>();

    useEffect(() => {
        const fetchData = async () => {
            // TODO: fetch company data by calling an API
        };

        fetchData();
    }, [ticker]);

    return { loading, error, company };
};
