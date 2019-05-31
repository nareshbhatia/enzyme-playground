import React, { useEffect, useState } from 'react';
import { TickerPublisher } from './TickerPublisher';
import { useCompanyQuery } from './useCompanyQuery';

export const HomePage = () => {
    // Save ticker in state
    const [ticker, setTicker] = useState<string>();

    // Capture context changes and save them in query state
    useEffect(() => {
        TickerPublisher.subscribe((ticker: string) => {
            setTicker(ticker);
        });
    }, []);

    // Use query state to fetch holdings
    const { loading, error, company } = useCompanyQuery(ticker);

    if (error) {
        return <div>{error.message}</div>;
    }

    // Protect against missing ticker
    if (!ticker) {
        return <div>Please select a ticker</div>;
    }

    if (loading) {
        return <div>Loading</div>;
    }

    if (!company) {
        return <div>Company query did not return data</div>;
    }

    return (
        <div>
            <h1>
                {company.name} ({ticker})
            </h1>
        </div>
    );
};
