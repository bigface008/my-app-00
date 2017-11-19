import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer'
import ShallowRenderer from 'react-test-renderer/shallow';
// import TestUtils from 'react-addons-test-utils';
// import { shallow } from 'enzyme'
import Album from './album'
import ImgFigure from './album'

describe('DOM rendering', () => {
    test('Rendering without crash', function () {
        const div = document.createElement('div');
        ReactDOM.render(<Album />, div);
    });
    test('Check shallow render', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Album />);
        const result = renderer.getRenderOutput();
        expect(result.type).toBe('section');
        expect(result.props.children[0].type).toBe('section');
        expect(result.props.children[1].type).toBe('nav');
    });
    // test('Check info of Album', () => {
    //     const render_deep = TestRenderer.create(<Album />);
    //     const testInstance = render_deep.root;
    //     // expect(testInstance.findByProps());
    // });
});
