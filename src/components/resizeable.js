import React from 'react';
import PropTypes from 'prop-types';

export default class Resizeable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            resizeElems:[{
                    position: 'absolute',
                    width:'15px',
                    height:'15px',
                    bottom:'0',
                    right: '0',
                    background: 'transparent',
                    zIndex:'15',
                    cursor:'nwse-resize'
                }],
            originalX:0,
            originalY: 0,
        }
    }

    onMouseClick = (e) =>{
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        this.setState({
            originalX: e.clientX,
            originalY: e.clientY,

            translateX: 0,
            translateY: 0,
        
            lastTranslateX: 0,
            lastTranslateY: 0
        })
    }

    handleMouseMove = (e) =>{
       this.setState(prevState => ({
        translateX: e.clientX - prevState.originalX + prevState.lastTranslateX,
        translateY: e.clientY - prevState.originalY + prevState.lastTranslateY,
        
      }));
        this.props.changeFunc(this.state.translateX, this.state.translateY)
    }
    handleMouseUp = (e) =>{
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        this.props.stopResize();
        this.setState(
            {
              originalX: 0,
              originalY: 0,
              lastTranslateX: this.state.translateX,
              lastTranslateY: this.state.translateY,
            },
          );
      }
    render(){
        const active = this.props.focused?{display:'block'}:{display:'none'}
        const elems = this.state.resizeElems.map(((elem, index)=>(
            <div key={index} className='resize'  onMouseDown={this.onMouseClick} style={elem}>
                <div className='resize-btn' style={active}></div>
            </div>
        )))
        return(
            <>
            {elems}
            </>
        )
    }
}

Resizeable.propTypes = {
    changeFunc:PropTypes.func.isRequired,
    focused:PropTypes.bool.isRequired,
    stopResize:PropTypes.func.isRequired
}