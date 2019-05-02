import React from 'react'

import Card from './index'

test('render a Card', () => {
    const wrapper = shallow(
        <Card></Card>
    );
    expect(wrapper).toMatchSnapshot();
});

test('render a Card with a header', () => {
    const wrapper = shallow(
        <Card header="Has header"></Card>
    );
    expect(wrapper).toMatchSnapshot();
});