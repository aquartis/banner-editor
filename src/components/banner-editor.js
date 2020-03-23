import React from 'react';
import styled from 'styled-components';
import BannersField from './banner-field';
import AddOrDeleteBtns from './add-or-delete-btns';
import FormComponent from './form-component';

export default class BannerEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allBanners: [],
            currentBannerNum: 0,
            isRotating: false,
        };
    }

    setCurrentBunner = (id) => {
        this.setState({
            currentBannerNum: id
        });
    }

    addNewBanner = () => {
        const { state } = this;
        const id = state.allBanners.length === 0
            ? 1 : state.allBanners[state.allBanners.length - 1].num + 1;
        const banner = {
            num: id,
            width: 300,
            height: 150,
            defaultX: 300,
            defaultY: 150,
            color: '#ffff00',
            top: Math.floor(window.innerHeight * 0.3 - 75),
            left: Math.floor(window.innerWidth * 0.45 - 150),
            lastTranslateX: Math.floor(window.innerWidth * 0.45 - 150),
            lastTranslateY: Math.floor(window.innerHeight * 0.3 - 75),
            originalX: 0,
            originalY: 0,
            translateX: Math.floor(window.innerWidth * 0.45 - 150),
            translateY: Math.floor(window.innerHeight * 0.3 - 75),
            degrees: 0,
            ref: React.createRef()
        };
        const newState = state.allBanners.concat(banner);
        this.setState({
            allBanners: newState,
            currentBannerNum: id
        });
    }

    deleteBanner = () => {
        const { state } = this;
        const newState = state.allBanners
            .filter((banner) => +banner.num !== +state.currentBannerNum);
        this.setState({
            allBanners: newState,
            currentBannerNum: 0
        });
    }


    onMouseMove = (id, y, x) => {
        const { state } = this;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (banner.num === +id) {
                banner.top = y;
                banner.left = x;
            }
            return banner;
        });
        this.setState({
            allBanners: newState,
        });
    }

    // resizing
    onMouseResize = (id, width, height, left, top) => {
        const { state } = this;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (banner.num === +id) {
                banner.width = width;
                banner.height = height;
                banner.left = banner.translateX + left;
                banner.lastTranslateX = banner.defaultX + left;
                banner.top = banner.translateY + top;
                banner.lastTranslateY = banner.defaultY + top;
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }

    onResizeStop = () => {
        const { state } = this;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (state.currentBannerNum === banner.num) {
                banner.defaultX = banner.width;
                banner.defaultY = banner.height;
                banner.translateX = banner.left;
                banner.lastTranslateX = banner.left;
                banner.translateY = banner.top;
                banner.lastTranslateY = banner.top;
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }

    onChangeWidth = (number) => {
        let num = number;
        if (num < 0) {
            num = 0;
        }
        const { state } = this;
        const maxToWidth = window.innerWidth * 0.9;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (state.currentBannerNum === banner.num) {
                banner.width = (+num + banner.left) >= maxToWidth
                    ? Math.floor(maxToWidth - banner.left) : +num;
                banner.defaultX = (+num + banner.left) >= maxToWidth
                    ? Math.floor(maxToWidth - banner.left) : +num;
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }

    // Changing banner height
    onChangeHeight = (number) => {
        let num = number;
        if (num < 0) {
            num = 0;
        }
        const { state } = this;
        const maxToHeight = window.innerHeight * 0.6;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (state.currentBannerNum === banner.num) {
                banner.height = (+num + banner.top) >= maxToHeight
                    ? Math.floor(maxToHeight - banner.top) : +num;
                banner.defaultY = (+num + banner.top) >= maxToHeight
                    ? Math.floor(maxToHeight - banner.top) : +num;
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }

    // Changing banner position top
    onChangeTop = (number) => {
        const { state } = this;
        let num = number;
        if (num === '') num = 0;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (state.currentBannerNum === banner.num) {
                const maxMoveTop = Math.floor(window.innerHeight * 0.6 - banner.height);
                const checkMaxMove = () => (+num >= maxMoveTop ? maxMoveTop : +num);
                banner.top = +num >= 0 ? checkMaxMove() : 0;
                banner.lastTranslateY = +num >= 0 ? checkMaxMove() : 0;
                banner.translateY = +num >= 0 ? checkMaxMove() : 0;
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }

    // Changing banner position left
    onChangeLeft = (number) => {
        const { state } = this;
        let num = number;
        if (num === '') num = 0;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (state.currentBannerNum === banner.num) {
                const maxMoveLeft = Math.floor(window.innerWidth * 0.9 - banner.width);
                const checkMaxMoveLeft = () => (+num >= maxMoveLeft ? maxMoveLeft : +num);
                banner.left = +num >= 0 ? checkMaxMoveLeft() : 0;
                banner.lastTranslateX = +num >= 0 ? checkMaxMoveLeft() : 0;
                banner.translateX = +num >= 0 ? checkMaxMoveLeft() : 0;
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }

    // Change banner degrees
    onChangeDegrees = (number) => {
        let num = number;
        if (num === '') {
            num = 0;
        } else if (num < 0) {
            num = 0;
        } else if (num > 360) {
            num = 360;
        }
        const { state } = this;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (state.currentBannerNum === banner.num) {
                banner.degrees = Math.floor(num);
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }

    // Changing banner color
    onChangeColor = (color) => {
        const { state } = this;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (state.currentBannerNum === banner.num) {
                banner.color = color;
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }

    onResizeStop = () => {
        const { state } = this;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (state.currentBannerNum === banner.num) {
                banner.defaultX = banner.width;
                banner.defaultY = banner.height;
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }


    onHandleStop = (x, y) => {
        const { state } = this;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (state.currentBannerNum === banner.num) {
                banner.translateX = x;
                banner.translateY = y;
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }

    // Rotating banner
    rotateControlMouseDown = () => {
        this.setState({
            isRotating: true
        });
    }

    rotateControlMouseMove = (degrees) => {
        const { state } = this;
        const newState = state.allBanners.map((elem) => {
            const banner = elem;
            if (state.currentBannerNum === banner.num) {
                banner.degrees = Math.floor(degrees);
            }
            return banner;
        });
        this.setState({
            allBanners: newState
        });
    }


    rotateControlMouseUp = () => {
        this.setState({
            isRotating: false
        });
    }

    render() {
        const { state } = this;
        const addBtn = state.allBanners.length >= 10;
        const deleteBtn = state.currentBannerNum !== 0;
        const formData = state.allBanners.map((banner) => {
            if (state.currentBannerNum === banner.num) {
                const result = {
                    width: banner.width,
                    height: banner.height,
                    top: banner.top,
                    left: banner.left,
                    color: banner.color,
                    degrees: banner.degrees
                };
                return result;
            } return null;
        });
        const formComponent = state.currentBannerNum !== 0 ? (
          <FormComponent
            data={formData}
            onChangeWidth={this.onChangeWidth}
            onChangeHeight={this.onChangeHeight}
            onChangeTop={this.onChangeTop}
            onChangeLeft={this.onChangeLeft}
            onChangeColor={this.onChangeColor}
            onChangeDegrees={this.onChangeDegrees}
          />
        ) : null;


        const funcs = {
            onMouseMove: this.onMouseMove,
            onMouseResize: this.onMouseResize,
            onResizeStop: this.onResizeStop,
            onHandleStop: this.onHandleStop
        };

        const rotatingFunctions = {
            rotateControlMouseDown: this.rotateControlMouseDown,
            rotateControlMouseUp: this.rotateControlMouseUp,
            rotateControlMouseMove: this.rotateControlMouseMove
        };
        return (
          <MainBannerContainer>
            <h2>Banner Editor v1.0</h2>
            <BannersField
              funcs={funcs}
              data={this.state}
              setCurrentBunner={this.setCurrentBunner}
              onMouseClick={this.onClickNoBanner}
              rotatingFunctions={rotatingFunctions}
              isRotating={state.isRotating}
            />
            <FormAndBtnsContainer>
              {formComponent}
              <AddOrDeleteBtns
                func={{ addNewBanner: this.addNewBanner, deleteBanner: this.deleteBanner }}
                active={{ add: addBtn, delet: deleteBtn }}
              />
            </FormAndBtnsContainer>
          </MainBannerContainer>
        );
    }
}

const FormAndBtnsContainer = styled.div`
display:flex;
width:90%;
height:30vh;
margin:0 auto;
`;

const MainBannerContainer = styled.div`
    position: relative;
`;
