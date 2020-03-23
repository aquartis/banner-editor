
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      degrees: props.data.degrees,
    };
  }
 

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = (e) => {
    const { props } = this;
    if (e.target.classList.contains('resize-btn') || e.target.classList.contains('resize')) return;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (e.target.classList.contains('rotating-btn') || e.target.tagName === 'path') {
      props.rotatingFunctions.rotateControlMouseDown();
    } else {
      props.methods.handleMouseDown(e);
      this.setState({
        isDragging: true
      });
    }
  };

  handleMouseMove = (e) => {
    const { props } = this;
    if (props.isRotating) {
      const degrees = this.calculateDegrees(this.getRelativeCoordinates(e));
      props.rotatingFunctions.rotateControlMouseMove(degrees);
    } else {
      const { isDragging } = this.state;
      if (!isDragging) {
        return;
      }
      props.methods.handleMouseMove(e);
    }
  };

  handleMouseUp = () => {
    const { props } = this;
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    if (props.isRotating) {
      props.rotatingFunctions.rotateControlMouseUp();
      this.setState({
        degrees: props.data.degrees
      });
    } else {
      props.methods.handleMouseUp();
      this.setState(
        {
          isDragging: false
        },
      );
    }
  };

  getRelativeCoordinates = (e) => {
    const { props } = this;
    const result = {
      mouseX: e.pageX - props.data.left - (props.data.width / 2),
      mouseY: e.pageY - props.data.top - (props.data.height / 2)
    };
   return result;
  }

  calculateDegrees = (coordinates) => {
    const { state } = this;
    const radians = Math.atan2(coordinates.mouseX, coordinates.mouseY);
    const degrees = (radians * (180 / Math.PI) * -1) + 45;
    let newDegrees = state.degrees + degrees;
    if (newDegrees < 0) {
      newDegrees += 360;
    }
    if (newDegrees > 360) {
      newDegrees -= 360;
    }
    return newDegrees;
  }

  render() {
    const { props } = this;
    const { children } = this.props;
    const { isDragging } = this.state;
    const transformOrigin = `${props.data.width / 2}px ${props.data.height / 2}px `;
    const rotateBtnLeft = `${props.data.width / 2 - 10}px`;
    const rotateBtnTop = `${props.data.height / 2 - 10}px`;
    return (
      <Container
        ref={props.data.ref}
        onMouseDown={this.handleMouseDown}
        x={`${props.data.left}px`}
        y={`${props.data.top}px`}
        degrees={props.data.degrees}
        transformOrigin={transformOrigin}
        isDragging={isDragging}
        focused={props.focused}
      >
        <RotatingElem 
          left={rotateBtnLeft} 
          top={rotateBtnTop}
          focused={props.focused}
        >
          <FontAwesomeIcon className="rotating-btn" icon={faSyncAlt} />
        </RotatingElem>
        {children}
      </Container>
    );
  }
}

const RotatingElem = styled.div`
display:${(props) => (props.focused ? 'block' : 'none')}
position:absolute;
width:20px;
height:20px;
background:transparent;
color:grey;
font-size:1rem;
cursor:pointer;
z-index:20;
left:${(props) => props.left};
top:${(props) => props.top};
`;

const Container = styled.div.attrs({
  style: ({
 x, y, transformOrigin, degrees 
}) => ({
    top: `${y}`,
    left: `${x}`,
    transformOrigin: `${transformOrigin}`,
    transform: `rotateZ(${degrees}deg)`,
  }),
})`
  position:absolute;
  cursor: grab;
  ${({ focused }) => focused && 'z-index:10'}
  ${({ isDragging }) =>
    isDragging && css`
    opacity: 0.8;
    cursor: grabbing;
  `};
`;

Draggable.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    degrees: PropTypes.number.isRequired,
    ref: PropTypes.isRequired,
  }).isRequired,
  methods: PropTypes.shape({
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseMove: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired
  }).isRequired,
  rotatingFunctions: PropTypes.shape({
    rotateControlMouseDown: PropTypes.func.isRequired,
    rotateControlMouseUp: PropTypes.func.isRequired,
    rotateControlMouseMove: PropTypes.func.isRequired
}).isRequired,
isRotating: PropTypes.bool.isRequired,
focused: PropTypes.bool.isRequired
};

export default Draggable;
