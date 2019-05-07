import React from 'react';

export interface ErrorFallbackComponentProps {
    error: any;
}

export const ErrorFallbackComponent = ({
    error
}: ErrorFallbackComponentProps) => {
    const message =
        error instanceof Error
            ? error.message
            : typeof error === 'string'
            ? error
            : 'Something went wrong';

    return <div data-testid="error-fallback-ui">{message}</div>;
};
