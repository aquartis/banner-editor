import React from 'react';
import Draggable from './draggable';
import Resizeable from './resizeable';
import Modal from './modal';
import FormComponent from './form-component';
import PropTypes from 'prop-types';


class Banner extends React.Component{
    constructor(props){
        super(props)
        this.state={
            width:300,
            height: 150,
            defaultX: 300,
            defaultY: 150,
            color: '#ffff00',

            originalX: 0,
            originalY: 0,
        
            translateX: 0,
            translateY: 0,
        
            lastTranslateX: Math.floor(window.innerWidth*0.9/2 - 150),
            lastTranslateY: Math.floor(window.innerHeight*0.6/2 - 75),

            top:Math.floor(window.innerHeight*0.6/2 - 75),
            left:Math.floor(window.innerWidth*0.9/2 - 150),
        }
    }
    // Changing banner position
    onMove = (x, y)=>{
        const maxMoveLeft = Math.floor(window.innerWidth*0.9 - this.state.width);
        const maxMoveTop = Math.floor(window.innerHeight*0.6 - this.state.height);
        this.setState({
            left: x>=0?(x>=maxMoveLeft?maxMoveLeft:x):0,
            top: y>=0?(y>=maxMoveTop?maxMoveTop:y):0
        })
    }
    // Changing banner size
    onResizeChangeParams = (x, y) =>{
        const maxToWidth = window.innerWidth*0.9;
        const maxToHeight = window.innerHeight*0.6;
        const newWidth = (this.state.defaultX + x + this.state.left)>=maxToWidth?Math.floor(maxToWidth-this.state.left):this.state.defaultX + x;
        const newHeight = (this.state.defaultY + y + this.state.top)>=maxToHeight?Math.floor(maxToHeight-this.state.top):this.state.defaultY + y;
        this.setState({
            width: newWidth,
            height: newHeight
        })
    }
    onResizeStop = () =>{
        this.setState({
            defaultX: this.state.width,
            defaultY: this.state.height
        })
    }
    // Changing banner width
    onChangeWidth = (num)=>{
        const maxToWidth = window.innerWidth*0.9;
        this.setState({
            width:(+num+this.state.left)>=maxToWidth?Math.floor(maxToWidth-this.state.left):+num,
            defaultX:(+num+this.state.left)>=maxToWidth?Math.floor(maxToWidth-this.state.left):+num,
        })
    }
    // Changing banner height
    onChangeHeight = (num)=>{
        const maxToHeight = window.innerHeight*0.6;
        this.setState({
            height:(+num+this.state.top)>=maxToHeight?Math.floor(maxToHeight-this.state.top):+num,
            defaultY:(+num+this.state.top)>=maxToHeight?Math.floor(maxToHeight-this.state.top):+num,
        })
    }
    // Changing banner position top
    onChangeTop = (num)=>{
        if(num === '') num=0;
        const maxMoveTop = Math.floor(window.innerHeight*0.6 - this.state.height);
        this.setState({
            top: +num>=0?(+num>=maxMoveTop?maxMoveTop:+num):0,
            lastTranslateY: +num>=0?(+num>=maxMoveTop?maxMoveTop:+num):0,

        })
    }
    // Changing banner position left
    onChangeLeft = (num)=>{
        if(num === '') num=0;
        const maxMoveLeft = Math.floor(window.innerWidth*0.9 - this.state.width);
        this.setState({
            left: +num>=0?(+num>=maxMoveLeft?maxMoveLeft:+num):0,
            lastTranslateX: +num>=0?(+num>=maxMoveLeft?maxMoveLeft:+num):0,
        })
    }
    // Changing banner color
    onChangeColor = (color)=>{
        this.setState({
            color,
        })
    }
    //On mouse changing position
    handleMouseDown=(e)=>{
        this.setState({
            originalX: e.clientX,
            originalY: e.clientY,
          });
    }
    handleMouseMove=(e)=>{
        this.setState(prevState => ({
            translateX: e.clientX - prevState.originalX + prevState.lastTranslateX,
            translateY: e.clientY - prevState.originalY + prevState.lastTranslateY
          }));
          this.onMove(this.state.translateX, this.state.translateY)  
    }
    handleMouseUp=()=>{
        this.setState(
            {
              originalX: 0,
              originalY: 0,
              lastTranslateX: this.state.translateX,
              lastTranslateY: this.state.translateY,
            },)
        }

    render(){
        const styles = {
            width:`${this.state.width}px`, height: `${this.state.height}px`, background: `${this.state.color}`, position: 'absolute'
        }
        if(this.props.focused){
            styles.border = '2px solid red';
        }
        const {top, left} = this.state;
        const methods = {handleMouseDown:this.handleMouseDown, handleMouseMove:this.handleMouseMove, handleMouseUp:this.handleMouseUp}
        return(
            <>
            <Draggable key={this.props.id} focused={this.props.focused} onMove={this.onMove} data={{top, left}} methods={methods}>
                <div className='banner'
                   onMouseDown={()=>this.props.setCurrentBunner(this.props.id)}
                   style={styles}>
                  <Resizeable changeFunc={this.onResizeChangeParams} stopResize={this.onResizeStop} focused={this.props.focused} />
                </div> 
             </Draggable>
                 {this.props.focused?(<Modal>
                 <FormComponent 
                    data={this.state}  
                    onChangeWidth={this.onChangeWidth} 
                    onChangeHeight={this.onChangeHeight}
                    onChangeTop={this.onChangeTop}
                    onChangeLeft={this.onChangeLeft}
                    onChangeColor={this.onChangeColor}
                    />
                 </Modal>):null}
             </>
        )
       
    }
}

Banner.propTypes = {
    focused:PropTypes.bool.isRequired,
    id:PropTypes.number.isRequired,
    setCurrentBunner:PropTypes.func.isRequired
}

export {Banner};