
import { shallow } from "enzyme";
import React from 'react'
import Tour from "./Tour";


it('expect to render Tour Component',() => {
    const tour = [
        {
            
            tour:'Athens'
        }
    ]
    expect(shallow(<Tour tour={tour}/> ).length).toEqual(1)
})

it('take a tour snapshot',() => {
    const tour = [
        {
            
            tour:'Athens'
        }
    ]
    expect(shallow(<Tour  tour={tour}/>)).toMatchSnapshot()
})

