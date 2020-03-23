import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class FormComponent extends React.Component {
  onChangeWidth = (e) => {
    const { props } = this;
    if (Number.isNaN(e.target.value)) return;
    props.onChangeWidth(e.target.value);
  }

  onChangeHeight = (e) => {
    const { props } = this;
    if (Number.isNaN(e.target.value)) return;
    props.onChangeHeight(e.target.value);
  }

  onChangeTop = (e) => {
    const { props } = this;
    if (Number.isNaN(e.target.value)) return;
    props.onChangeTop(e.target.value);
  }

  onChangeLeft = (e) => {
    const { props } = this;
    if (Number.isNaN(e.target.value)) return;
    props.onChangeLeft(e.target.value);
  }

  onChangeColor = (e) => {
    const { props } = this;
    props.onChangeColor(e.target.value);
  }

  onChangeDegrees = (e) => {
    const { props } = this;
    if (Number.isNaN(e.target.value)) return;
    props.onChangeDegrees(e.target.value);
  }

  render() {
    const { props } = this;
    const params = Object.assign({}, ...props.data);
    return (
      <Form>
        <div style={{ width: '50%' }}>
          <div className="input-box">
            <label htmlFor="width">
              w:
              <input
                name="width"
                type="text"
                className="params-input"
                value={params.width} 
                onChange={(e) => this.onChangeWidth(e)}
              />
            </label>
            <label htmlFor="height">
              h:
              <input
                name="height"
                type="text"
                className="params-input"
                value={params.height} 
                onChange={(e) => this.onChangeHeight(e)}
              />
            </label>

          </div>
          <div className="input-box">
            <label htmlFor="left">
              x:
              <input 
                name="left" 
                type="text" 
                className="params-input" 
                value={params.left} 
                onChange={(e) => this.onChangeLeft(e)} 
              />
            </label>

            <label htmlFor="top">
              y:
              <input 
                name="top" 
                type="text" 
                className="params-input" 
                value={params.top} 
                onChange={(e) => this.onChangeTop(e)} 
              />
            </label>

          </div>
          <div className="input-box">
            <label htmlFor="degrees">
              deg:
              <input 
                name="degrees" 
                type="number" 
                className="params-input" 
                value={params.degrees} 
                onChange={(e) => this.onChangeDegrees(e)} 
              />
            </label>
          </div>
        </div>
        <div style={{ width: '30%' }}>
          <label htmlFor="color" className="input-box">
            Background:
            <input 
              name="color" 
              type="color" 
              className="color-input" 
              onChange={(e) => this.onChangeColor(e)} 
              value={params.color} 
            />
          </label>

        </div>
      </Form>
    );
  }
}

const Form = styled.form`
display: flex;
 width: 70%;
 height:100%;
 align-items:center;
`;

FormComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    degrees: PropTypes.number.isRequired,
  })).isRequired,
  onChangeColor: PropTypes.func.isRequired,
  onChangeHeight: PropTypes.func.isRequired,
  onChangeLeft: PropTypes.func.isRequired,
  onChangeTop: PropTypes.func.isRequired,
  onChangeWidth: PropTypes.func.isRequired,
  onChangeDegrees: PropTypes.func.isRequired
};
