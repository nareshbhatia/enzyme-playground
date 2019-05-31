import React from 'react';
import { ErrorBoundary } from './components';
import { HomePage } from './pages';

export const App = () => {
    return (
        <ErrorBoundary>
            <HomePage />
        </ErrorBoundary>
    );
};

export default App;
