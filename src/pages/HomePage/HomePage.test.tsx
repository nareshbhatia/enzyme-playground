import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { HomePage } from './HomePage';
import { TickerCallback, TickerPublisher } from './TickerPublisher';
import { useCompanyQuery } from './useCompanyQuery';

jest.mock('./TickerPublisher', () => ({
    TickerPublisher: {
        subscribe: jest.fn()
    }
}));

jest.mock('./useCompanyQuery', () => ({
    useCompanyQuery: jest.fn()
}));

describe('<HomePage />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders a help message when no ticker is selected', () => {
        (TickerPublisher.subscribe as jest.Mock).mockImplementation(
            (callback: TickerCallback) => {}
        );
        (useCompanyQuery as jest.Mock).mockReturnValue({
            loading: true,
            error: undefined,
            company: undefined
        });

        act(() => {
            console.log('---> test 1');
            const wrapper = mount(<HomePage />);
            console.log('--->', wrapper.debug());
            expect(
                wrapper.find('div[children="Please select a ticker"]')
            ).toHaveLength(1);
        });
    });

    it('renders a loading message when the ticker is selected but the company query is executing', () => {
        (TickerPublisher.subscribe as jest.Mock).mockImplementation(
            (callback: TickerCallback) => {
                callback('AAPL');
            }
        );
        (useCompanyQuery as jest.Mock).mockReturnValue({
            loading: true,
            error: undefined,
            company: undefined
        });

        act(() => {
            console.log('---> test 2');
            const wrapper = mount(<HomePage />);
            console.log('--->', wrapper.debug());
            wrapper.find('div[children="Loading"]');
        });
    });

    it('renders an error message when the company query fails', () => {
        (TickerPublisher.subscribe as jest.Mock).mockImplementation(
            (callback: TickerCallback) => {
                callback('AAPL');
            }
        );
        (useCompanyQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: new Error('Network Error'),
            company: undefined
        });

        act(() => {
            console.log('---> test 3');
            const wrapper = mount(<HomePage />);
            console.log('--->', wrapper.debug());
            expect(wrapper.find('div[children="Network Error"]')).toHaveLength(
                1
            );
        });
    });

    it('renders an error message when the company query succeeds but does not return a company', () => {
        (TickerPublisher.subscribe as jest.Mock).mockImplementation(
            (callback: TickerCallback) => {
                callback('AAPL');
            }
        );
        (useCompanyQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: undefined,
            company: undefined
        });

        act(() => {
            console.log('---> test 4');
            const wrapper = mount(<HomePage />);
            console.log('--->', wrapper.debug());
            expect(
                wrapper.find(
                    'div[children="Company query did not return data"]'
                )
            ).toHaveLength(1);
        });
    });

    it('renders the company when the company query succeeds and returns a company', () => {
        (TickerPublisher.subscribe as jest.Mock).mockImplementation(
            (callback: TickerCallback) => {
                callback('AAPL');
            }
        );
        (useCompanyQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: undefined,
            company: { ticker: 'AAPL', name: 'Apple Inc.' }
        });

        act(() => {
            console.log('---> test 5');
            const wrapper = mount(<HomePage />);
            console.log('--->', wrapper.debug());
            expect(wrapper.find('h1').text()).toBe('Apple Inc. (AAPL)');
        });
    });
});
