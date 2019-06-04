import React from 'react';
import { ErrorBoundary } from './components';
import { HomePage, MockClassPage } from './pages';

export const App = () => {
    return (
        <ErrorBoundary>
            <div>HomePage</div>
            <HomePage />
            <hr />

            <div>MockClassPage</div>
            <MockClassPage ticker="AAPL" />
            <hr />
        </ErrorBoundary>
    );
};

export default App;
