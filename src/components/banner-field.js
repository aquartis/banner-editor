import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Banner from './banner';


const BannersField = (props) => {
    const { data } = props;
    const banners = data.allBanners.map((elem) => {
        const focused = data.currentBannerNum === elem.num;
        return (
          <Banner
            key={elem.num}
            funcs={props.funcs}
            setCurrentBunner={props.setCurrentBunner}
            data={elem}
            focused={focused}
            rotatingFunctions={props.rotatingFunctions}
            isRotating={props.isRotating}
          />
        );
    });
    return (
      <StyledBannersField className="banners-field">
        {banners}
      </StyledBannersField>
    );
};

const StyledBannersField = styled.div`
    margin: 0 auto;
    position: relative;
    width: 90vw;
    height: 60vh;
    border: 1px solid #000;
    overflow: hidden;
    display: flex;
    justifyContent: center;
    alignItems: center;
`;

BannersField.propTypes = {
    data: PropTypes.shape({
        allBanners: PropTypes.array.isRequired,
        currentBannerNum: PropTypes.number.isRequired,
    }).isRequired,
    funcs: PropTypes.shape({
        onHandleStop: PropTypes.func.isRequired,
        onMouseMove: PropTypes.func.isRequired,
        onMouseResize: PropTypes.func.isRequired,
        onResizeStop: PropTypes.func.isRequired
    }).isRequired,
    setCurrentBunner: PropTypes.func.isRequired,
    rotatingFunctions: PropTypes.shape({
        rotateControlMouseDown: PropTypes.func.isRequired,
        rotateControlMouseUp: PropTypes.func.isRequired,
        rotateControlMouseMove: PropTypes.func.isRequired
    }).isRequired,
    isRotating: PropTypes.bool.isRequired
};

export default BannersField;
