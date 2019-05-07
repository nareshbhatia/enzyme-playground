import React from 'react';
import { shallow } from 'enzyme';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorFallbackComponent } from './ErrorFallbackComponent';

const Child = () => {
    return <div>I am a child</div>;
};

describe('<ErrorBoundary />', () => {
    it('renders its child when there is no error', () => {
        const wrapper = shallow(
            <ErrorBoundary>
                <Child />
            </ErrorBoundary>
        );

        const child = wrapper.find(Child);
        expect(child).toHaveLength(1);
    });

    it('renders the fallback UI when the child throws an error', () => {
        const wrapper = shallow(
            <ErrorBoundary>
                <Child />
            </ErrorBoundary>
        );

        const child = wrapper.find(Child);
        child.simulateError(new Error('Simulated Error'));
        const fallbackUI = wrapper.find(ErrorFallbackComponent);
        expect(fallbackUI).toHaveLength(1);
    });
});
