import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Input from 'components/form/Input';

afterEach(cleanup);

const setup = propOverrides => {
  const props = Object.assign({}, propOverrides);
  const utils = render(<Input {...props} />);
  return {
    props,
    ...utils,
  };
};

describe('render', () => {
  it('should render', () => {
    const { getByLabelText } = setup({ 'aria-label': 'test-input' });
    expect(getByLabelText('test-input')).toBeDefined();
  });
});
describe('interaction', () => {});
