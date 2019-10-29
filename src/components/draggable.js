
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default class Draggable extends React.Component {
  state = {
    isDragging: false,
  };

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = (e) => {
    if(e.target.classList.contains('resize-btn') || e.target.classList.contains('resize')) return;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }
    this.props.methods.handleMouseDown(e);
    this.setState({
      isDragging: true
    });
  };

  handleMouseMove = (e) => {
    const { isDragging } = this.state;
    if (!isDragging) {
      return;
    }
    this.props.methods.handleMouseMove(e);
  };

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    this.props.methods.handleMouseUp();
    this.setState(
      {
        isDragging: false
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }
      }
    );
  };
  
  render() {
    const { children } = this.props;
    const { isDragging } = this.state;

    return (
      <Container 
        onMouseDown={this.handleMouseDown}
        x={this.props.data.left+`px`}
        y={this.props.data.top+`px`}
        isDragging={isDragging}
        focused={this.props.focused}
      >
        {children}
      </Container>
    );
  }
}

const Container = styled.div.attrs({
  style: ({ x, y }) => ({
    top:`${y}`,
    left:`${x}`,
  }),
})`
  position:absolute;
  cursor: grab;
  ${({focused})=>focused && `z-index:10`}
  ${({ isDragging }) =>
  isDragging && css`
    opacity: 0.8;
    cursor: grabbing;
  `};
`;

Draggable.propTypes = {
  children:PropTypes.node.isRequired,
  data:PropTypes.shape({
    left:PropTypes.number.isRequired,
    top:PropTypes.number.isRequired
  }).isRequired,
  methods:PropTypes.shape({
    handleMouseDown:PropTypes.func.isRequired,
    handleMouseMove:PropTypes.func.isRequired,
    handleMouseUp:PropTypes.func.isRequired
  }).isRequired,
  onMove:PropTypes.func.isRequired
}
