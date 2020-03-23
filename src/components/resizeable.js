import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


export default class Resizeable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalX: 0,
            originalY: 0,
            currentResizeSide: ''
        };
    }

    // Fix resize
    onResizeStart = (e, side) => {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        this.setState({
            currentResizeSide: side,
            originalX: e.clientX,
            originalY: e.clientY,

            translateX: 0,
            translateY: 0,

            lastTranslateX: 0,
            lastTranslateY: 0,
        });
    }


    resizeRight = () => {
        const { props } = this;
        const { state } = this;
        if (props.degrees >= 135 && props.degrees <= 225) {
            props.changeFunc(-state.translateX, 0, state.translateX, 0);
        } else if (props.degrees >= 225 && props.degrees <= 315) {
            props.changeFunc(-state.translateY, 0, 0, 0);
        } else if (props.degrees >= 45 && props.degrees <= 135) {
            props.changeFunc(state.translateY, 0, 0, 0);
        } else {
            props.changeFunc(state.translateX, 0, 0, 0);
        }
    }

    resizeLeft = () => {
        const { props } = this;
        const { state } = this;
        if (props.degrees >= 135 && props.degrees <= 225) {
            props.changeFunc(state.translateX, 0, 0, 0);
        } else if (props.degrees >= 225 && props.degrees <= 315) {
            props.changeFunc(state.translateY, 0, 0, 0);
        } else if (props.degrees >= 45 && props.degrees <= 135) {
            props.changeFunc(-state.translateY, 0, 0, 0);
        } else {
            props.changeFunc(-state.translateX, 0, state.translateX, 0);
        }
    }

    resizeTop = () => {
        const { props } = this;
        const { state } = this;
        if (props.degrees >= 135 && props.degrees <= 225) {
            props.changeFunc(0, state.translateY, 0, 0);
        } else if (props.degrees >= 225 && props.degrees <= 315) {
            props.changeFunc(0, -state.translateX, 0, 0);
        } else if (props.degrees >= 45 && props.degrees <= 135) {
            props.changeFunc(0, state.translateX, 0, 0);
        } else {
            props.changeFunc(0, -state.translateY, 0, state.translateY);
        }
    }

    resizeBottom = () => {
        const { props } = this;
        const { state } = this;
        if (props.degrees >= 135 && props.degrees <= 225) {
            props.changeFunc(0, -state.translateY, 0, state.translateY);
        } else if (props.degrees >= 225 && props.degrees <= 315) {
            props.changeFunc(0, state.translateX, 0, 0);
        } else if (props.degrees >= 45 && props.degrees <= 135) {
            props.changeFunc(0, -state.translateX, 0, 0);
        } else {
            props.changeFunc(0, state.translateY, 0, 0);
        }
    }

    handleMouseMove = (e) => {
        const { props } = this;
        const { state } = this;
        this.setState((prevState) => ({
            translateX: e.clientX - prevState.originalX + prevState.lastTranslateX,
            translateY: e.clientY - prevState.originalY + prevState.lastTranslateY,

        }));
        switch (state.currentResizeSide) {
            case 'right':
                return this.resizeRight(e);
            case 'top':
                return this.resizeTop(e);
            case 'left':
                return this.resizeLeft(e);
            case 'bottom':
                return this.resizeBottom(e);
            default:
                break;
        }
       return props.changeFunc(state.translateX, state.translateY);
    }

    handleMouseUp = () => {
        const { props } = this;
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        props.stopResize();
        this.setState(
            {
                originalX: 0,
                originalY: 0,
                lastTranslateX: 0,
                lastTranslateY: 0,
            },
        );
    }

    render() {
        const { props } = this;
        const active = props.focused;
        return (
          <>
            <ResizeBtnTop active={active} onMouseDown={(e) => this.onResizeStart(e, 'top')} className="resize-btn" />
            <ResizeBtnLeft active={active} onMouseDown={(e) => this.onResizeStart(e, 'left')} className="resize-btn" />
            <ResizeBtnBottom active={active} onMouseDown={(e) => this.onResizeStart(e, 'bottom')} className="resize-btn" />
            <ResizeBtnRight active={active} onMouseDown={(e) => this.onResizeStart(e, 'right')} className="resize-btn" />
          </>
        );
    }
}

const ResizeBtnTop = styled.div`
display:${(props) => (props.active ? 'block' : 'none')}
position: absolute;
width: 100%;
height: 5px;
top: 0;
background: green;
zIndex: 15;
cursor: nwse-resize;
`;

const ResizeBtnLeft = styled.div`
display:${(props) => (props.active ? 'block' : 'none')}
position: absolute;
width: 5px;
height: 100%;
left: 0;
background: red;
zIndex: 15;
cursor: nwse-resize;
`;

const ResizeBtnBottom = styled.div`
display:${(props) => (props.active ? 'block' : 'none')}
position: absolute;
width: 100%;
height: 5px;
bottom: 0;
background: blue;
zIndex: 15;
cursor: nwse-resize;
`;

const ResizeBtnRight = styled.div`
display:${(props) => (props.active ? 'block' : 'none')}
position: absolute;
width: 5px;
height: 100%;
right: 0;
background: black;
zIndex: 15;
cursor: nwse-resize;
`;

Resizeable.propTypes = {
    degrees: PropTypes.number.isRequired,
    changeFunc: PropTypes.func.isRequired,
    focused: PropTypes.bool.isRequired,
    stopResize: PropTypes.func.isRequired
};
