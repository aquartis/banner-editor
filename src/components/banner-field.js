import React from 'react';
import { Banner } from './banner';
import PropTypes from 'prop-types';


const BannersField = (props) => {
    const banners = props.data.allBanners.map((elem) => {
        const focused = props.data.currentBannerId === elem.num ? true : false;
             return <Banner key={elem.num} setCurrentBunner={props.setCurrentBunner} id={elem.num}  focused={focused} />
         }
    )
    return (
        <div onClick={(e)=>props.onMouseClick(e)} className='banners-field' style={{
            margin: '0 auto',
            position: 'relative',
            width: '90vw',
            height: '60vh',
            border: '1px solid #000',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
            {banners}
        </div>
    )
}

BannersField.propTypes = {
    data:PropTypes.shape({
        allBanners:PropTypes.array.isRequired,
        currentBannerId:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired}),
     onMouseClick:PropTypes.func.isRequired,
    setCurrentBunner:PropTypes.func.isRequired
}

export { BannersField }

