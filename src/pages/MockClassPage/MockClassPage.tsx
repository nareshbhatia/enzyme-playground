import React from 'react';
import { Company } from './Company';
import { useQuery } from './useQuery';

export const MockClassPage = ({ ticker }: { ticker: string }) => {
    const { loading, error, data: company } = useQuery<Company>(ticker);

    if (error) {
        return <div>{error.message}</div>;
    }

    if (loading) {
        return <div>Loading</div>;
    }

    if (!company) {
        return <div>Query did not return data</div>;
    }

    return (
        <div>
            <h1>
                {company.name} ({company.ticker})
            </h1>
        </div>
    );
};
