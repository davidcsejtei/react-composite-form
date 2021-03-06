import React from 'react';
import {shallow, mount} from 'enzyme';
import CreatableSelectField from "../../../lib/factory/fields/CreatableSelectField";


describe('CreatableSelectField', () => {
    const mockValueUpdateHandler = jest.fn();
    const mockChangeHandler = jest.fn();
    let creatableSelectField = shallow(<CreatableSelectField valueUpdateHandler={mockValueUpdateHandler} changeHandler={mockChangeHandler} options={[]} name={'testName'} />);

    it('renders properly', () => {
        expect(creatableSelectField).toMatchSnapshot();
    });

    it('stops loading if it contains options', () => {
        expect(creatableSelectField.find('CreatableSelect').prop('isLoading')).toEqual(true);
        creatableSelectField.setProps({options: [{label: 'Test', value: 1}]}, () => {
            expect(creatableSelectField.find('CreatableSelect').prop('isLoading')).toEqual(false);
        });
    });

    it('should create a new option', () => {
        const selection = {
            value: 'testValue',
        };
        creatableSelectField.find('CreatableSelect').simulate('change', selection);
        expect(mockValueUpdateHandler).toBeCalledWith('testName', 'testValue');
        expect(mockChangeHandler).toBeCalledWith(selection);
    });

    it('should select an existing option', () => {
        const selection = {
            value: 1,
        };
        creatableSelectField.find('CreatableSelect').simulate('change', selection);
        expect(mockValueUpdateHandler).toBeCalledWith('testName', 1);
        expect(mockChangeHandler).toBeCalledWith(selection);
    });

    it('changes the id, name to label, value', () => {
        creatableSelectField = mount(<CreatableSelectField valueUpdateHandler={mockValueUpdateHandler} changeHandler={mockChangeHandler} options={[]} labelKey={'name'} valueKey={'id'} name={'testName'} />);
        creatableSelectField.setProps({options: [{name: 'Test', id: 1}]}, () => {
            expect(creatableSelectField.prop('options')).toEqual([{name: 'Test', id: 1}]);
            expect(creatableSelectField.find('CreatableSelect').prop('options')).toEqual([{label: 'Test', value: 1}]);
            creatableSelectField.setProps({notOptions: []});
            expect(creatableSelectField.prop('options')).toEqual([{name: 'Test', id: 1}]);
        });
    });

});
