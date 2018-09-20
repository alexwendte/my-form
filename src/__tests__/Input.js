import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Input from 'components/form/Input';

afterEach(cleanup);

const setup = propOverrides => {
  const props = Object.assign({ allName: 'test-input' }, propOverrides);
  const utils = render(<Input {...props} />);
  const input = utils.getByLabelText(props.allName);
  return {
    props,
    input,
    ...utils,
  };
};

describe('render', () => {
  it("should have the correct id's and labels", () => {
    const { input, getByText } = setup({
      allName: 'test-input',
      hasLabel: true,
      labelContent: 'Test Label',
      id: 'shouldOverride',
    });
    expect(getByText('Test Label')).toBeDefined();
    expect(input.id).toBe('shouldOverride');
  });
  it('should not render a label if hasLabel is false or not defined', () => {
    const { queryByText } = setup({ labelContent: 'Test Label' });
    expect(queryByText('Test Label')).toBeNull();
  });
  describe('Required Error', () => {
    it('should not render the required error if the form was not submitted', () => {
      const requiredMessage = 'This input is required';
      const { input, queryByText } = setup({ required: true, requiredMessage, wasSubmitted: false });
      input.value = 'Has Content';
      expect(input.value).toBe('Has Content');
      expect(queryByText(requiredMessage)).toBeNull();
    });

    it('should render required error when the form was submitted and input is empty', () => {
      const requiredMessage = 'This input is required';
      const { input, queryByText } = setup({ required: true, requiredMessage, wasSubmitted: true });
      expect(input.value).toBe('');
      expect(queryByText(requiredMessage)).not.toBeNull();
    });
    it('should not render the required error when the form was submitted and the input is not empty', () => {
      const requiredMessage = 'This input is required';
      const { input, queryByText } = setup({ required: true, requiredMessage, wasSubmitted: true });
      expect(input.value).toBe('');
      fireEvent.change(input, { target: { value: 'Not Empty' } });
      expect(queryByText(requiredMessage)).toBeNull();
    });
  });
});
describe('interaction', () => {
  it('should show text on change if no onChange prop is defined', () => {
    const { input } = setup();
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'f' } });
    expect(input.value).toBe('f');
  });
});
