import React from 'react';
import PropTypes from 'prop-types';

export default class FormComponent extends React.Component {
    onChangeWidth = (e) => {
        if (isNaN(e.target.value)) return;
        this.props.onChangeWidth(e.target.value);
    }
    onChangeHeight = (e) => {
        if (isNaN(e.target.value)) return;
        this.props.onChangeHeight(e.target.value);
    }
    onChangeTop = (e) => {
        if (isNaN(e.target.value)) return;
        this.props.onChangeTop(e.target.value);
    }
    onChangeLeft = (e) => {
        if (isNaN(e.target.value)) return;
        this.props.onChangeLeft(e.target.value);
    }
    onChangeColor = (e)=>{
        this.props.onChangeColor(e.target.value)
    }
    render() {
        return (
            <form style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '50%' }}>
                    <div className='input-box'>
                        <label>w:
                             <input name='width' type='text' className='params-input' value={this.props.data.width} onChange={(e) => this.onChangeWidth(e)} />
                        </label>

                        <label>h:
                          <input name='height' type='text' className='params-input' value={this.props.data.height} onChange={(e) => this.onChangeHeight(e)} />
                        </label>

                    </div>
                    <div className='input-box'>
                        <label>x:
                          <input name='left' type='text' className='params-input' value={this.props.data.left} onChange={(e) => this.onChangeLeft(e)} />
                        </label>

                        <label>y:
                             <input name='top' type='text' className='params-input' value={this.props.data.top} onChange={(e) => this.onChangeTop(e)} />
                        </label>

                    </div>
                </div>
                <div  style={{ width: '30%' }}>
                    <label className='input-box'style={{  display:'flex', alignItems:'center' }} >Background: 
                        <input name='color' type='color' className='color-input' onChange={(e)=>this.onChangeColor(e)} value={this.props.data.color}/>
                    </label>

                </div>
            </form>
        )
    }
}

FormComponent.propTypes = {
    data:PropTypes.shape({
        color:PropTypes.string.isRequired,
        width:PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        defaultX: PropTypes.number.isRequired,
        defaultY: PropTypes.number.isRequired,

        originalX: PropTypes.number.isRequired,
        originalY: PropTypes.number.isRequired,
    
        translateX: PropTypes.number.isRequired,
        translateY: PropTypes.number.isRequired,
    
        lastTranslateX: PropTypes.number.isRequired,
        lastTranslateY: PropTypes.number.isRequired,

        top:PropTypes.number.isRequired,
        left:PropTypes.number.isRequired,
    }).isRequired,
    onChangeColor:PropTypes.func.isRequired,
    onChangeHeight:PropTypes.func.isRequired,
    onChangeLeft:PropTypes.func.isRequired,
    onChangeTop:PropTypes.func.isRequired,
    onChangeWidth:PropTypes.func.isRequired,
}