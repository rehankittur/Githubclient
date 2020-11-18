import React from 'react';
import Button from './button';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';

// configure Enzyme to use react test adapter
Enzyme.configure({ adapter: new Adapter() });


describe('Button', () => {

  let props ={};
  beforeAll(() => {
    props.title = 'This is a title',
    props.disabled = false,
    props.onClick = () => { return 'return something for onPress' }
  });


  it('Renders without crashing', () => {
    const elem = mount(<Button {...props} />);
    expect(elem).toBeTruthy();
  });

  it('Renders the text given as title', () => {
    const elem = mount(<Button {...props} />);
    expect(elem.text()).toBe(props.title);
  });

  it('onClick callback works if not disabled', () => {
    const mockFn = jest.fn();
    props.onClick = mockFn;
    const elem = mount(<Button {...props} />);
    elem.find('button').simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('onClick callback does no work if disabled', () => {
    const mockFn = jest.fn();
    props.onClick = mockFn;
    props.disabled = true;
    const elem = mount(<Button {...props} />);
    elem.find('button').simulate('click');
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('Has disabled attribute if disabled', () => {
    props.disabled = true;
    const elem = mount(<Button {...props} />);
    expect(elem.find('[disabled]'));
  });

})