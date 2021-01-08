
import { shallow } from "enzyme";
import React from 'react'
import Rating from "./Rating";


it('expect to render Rating Component',() => {
    expect(shallow(<Rating/>).length).toEqual(1)
})

it('expect to render Rating Component',() => {
    expect(shallow(<Rating/>)).toMatchSnapshot()
})

