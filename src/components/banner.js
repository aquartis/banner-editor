import React from 'react';
import PropTypes from 'prop-types';
import Draggable from './draggable';
import Resizeable from './resizeable';


class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            translateX: props.data.translateX,
            translateY: props.data.translateY
        };
    }

    // Changing banner position
    onMove = (x, y) => {
        const { props } = this;
        const maxMoveLeft = Math.floor(window.innerWidth * 0.9 - props.data.width);
        const maxMoveTop = Math.floor(window.innerHeight * 0.6 - props.data.height);
        const checkmaxMoveLeft = () => (x >= maxMoveLeft ? maxMoveLeft : x);
        const checkmaxMoveTop = () => (y >= maxMoveTop ? maxMoveTop : y);
        const newLeft = x >= 0 ? checkmaxMoveLeft() : 0;
        const newTop = y >= 0 ? checkmaxMoveTop() : 0;
        props.funcs.onMouseMove(props.data.num, newTop, newLeft);
    }

    // Changing banner size
    onResizeChangeParams = (x, y, top, left) => {
        const { props } = this;
        const maxToWidth = window.innerWidth * 0.9;
        const maxToHeight = window.innerHeight * 0.6;
        let newWidth = (props.data.defaultX + x + props.data.left) >= maxToWidth 
        ? Math.floor(maxToWidth - props.data.left) : props.data.defaultX + x;
        let newHeight = (props.data.defaultY + y + props.data.top) >= maxToHeight 
        ? Math.floor(maxToHeight - props.data.top) : props.data.defaultY + y;
        if (newWidth < 0) {
            newWidth = 0;
        }
        if (newHeight < 0) {
            newHeight = 0;
        }
        props.funcs.onMouseResize(props.data.num, newWidth, newHeight, top, left);
    }

    // On mouse changing position
    handleMouseDown = (e) => {
        const { props } = this;
        this.setState({
            originalX: e.clientX,
            originalY: e.clientY,
            lastTranslateX: props.data.translateX,
            lastTranslateY: props.data.translateY,
        });
    }

    handleMouseMove = (e) => {
        const { state } = this;
        this.setState((prevState) => ({
            translateX: e.clientX - prevState.originalX + prevState.lastTranslateX,
            translateY: e.clientY - prevState.originalY + prevState.lastTranslateY
        }));
        this.onMove(state.translateX, state.translateY);
    }

    handleMouseUp = () => {
        const { state } = this;
        const { props } = this;
        this.setState(() => ({
                originalX: 0,
                originalY: 0,
                lastTranslateX: state.translateX,
                lastTranslateY: state.translateY,
            }));
        props.funcs.onHandleStop(state.translateX, state.translateY);
    }

    render() {
        const { props } = this;
        const styles = {
            width: `${props.data.width}px`, height: `${props.data.height}px`, background: `${props.data.color}`, position: 'absolute'
        };
        if (props.focused) {
            styles.border = '2px solid red';
        }
        const {
 top, left, width, height, degrees, ref 
} = props.data;
        const methods = { 
            handleMouseDown: this.handleMouseDown, 
            handleMouseMove: this.handleMouseMove, 
            handleMouseUp: this.handleMouseUp 
        };
        return (
          <>
            <Draggable
              key={props.data.num}
              focused={props.focused}
              data={{
 top, left, width, height, degrees, ref 
}}
              methods={methods}
              rotatingFunctions={props.rotatingFunctions}
              isRotating={props.isRotating}
            >
              <div
                role="presentation"
                className="banner"
                style={styles}
                onMouseDown={() => props.setCurrentBunner(props.data.num)}
                
              >
                <Resizeable 
                  degrees={degrees} 
                  changeFunc={this.onResizeChangeParams} 
                  stopResize={props.funcs.onResizeStop} 
                  focused={props.focused}
                />
              </div>
            </Draggable>
          </>
        );
    }
}


Banner.propTypes = {
    data: PropTypes.shape({
        num: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        defaultX: PropTypes.number.isRequired,
        defaultY: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        lastTranslateX: PropTypes.number.isRequired,
        lastTranslateY: PropTypes.number.isRequired,
        originalX: PropTypes.number.isRequired,
        originalY: PropTypes.number.isRequired,
        translateX: PropTypes.number.isRequired,
        translateY: PropTypes.number.isRequired,
        degrees: PropTypes.number.isRequired,
        ref: PropTypes.isRequired
    }).isRequired,
    funcs: PropTypes.shape({
        onHandleStop: PropTypes.func.isRequired,
        onMouseMove: PropTypes.func.isRequired,
        onMouseResize: PropTypes.func.isRequired,
        onResizeStop: PropTypes.func.isRequired
    }).isRequired,
    rotatingFunctions: PropTypes.shape({
        rotateControlMouseDown: PropTypes.func.isRequired,
        rotateControlMouseUp: PropTypes.func.isRequired,
        rotateControlMouseMove: PropTypes.func.isRequired
    }).isRequired,
    focused: PropTypes.bool.isRequired,
    setCurrentBunner: PropTypes.func.isRequired,
    isRotating: PropTypes.bool.isRequired
};

export default Banner;
