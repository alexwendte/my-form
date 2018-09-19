import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Form from 'components/form/Form';

afterEach(cleanup);

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides);
  const utils = render(<Form {...props} />);
  return {
    props,
    ...utils,
  };
};

describe('render', () => {
  it('should render', () => {
    const { getByLabelText } = setup({ 'aria-label': 'test-form' });
    expect(getByLabelText('test-form')).toBeDefined();
  });
});
describe('interaction', () => {});
