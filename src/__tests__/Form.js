import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Form from 'components/form/Form';
import Input from 'components/form/Input';

afterEach(cleanup);

const setup = propOverrides => {
  const props = Object.assign(
    {
      'aria-label': 'test-form',
      onSubmit: jest.fn(),
    },
    propOverrides
  );
  const utils = render(<Form {...props} onSubmit={props.onSubmit} />);

  const form = utils.getByLabelText(props['aria-label']);
  const submit = utils.getByLabelText('submit-button');
  return {
    props,
    form,
    submit,
    ...utils,
  };
};

describe('render', () => {
  it('should render', () => {
    const { form } = setup({ children: 'Not Null' });
    expect(form).toBeDefined();
  });
});
describe('interaction', () => {
  it("should submit the form with the input's values", () => {
    const { getByLabelText, form, props } = setup({
      children: <Input allName="test-input" />,
    });
    const input = getByLabelText('test-input');
    expect(input).toBeDefined();
    const inputText = 'I am input';
    input.value = inputText;
    fireEvent.submit(form);
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    expect(props.onSubmit).toHaveBeenCalledWith({
      'test-input': 'I am input',
    });
  });

  it('should not submit if a required input is empty', () => {
    const { form, getByLabelText, props } = setup({ children: <Input allName="test-input" required /> });
    const input = getByLabelText('test-input');
    input.value = '';
    fireEvent.submit(form);
    expect(props.onSubmit).toHaveBeenCalledTimes(0);
  });
});
