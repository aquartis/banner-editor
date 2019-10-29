import React from 'react';
import {BannersField} from './banner-field';
import { AddOrDeleteBtns } from './add-or-delete-btns';

export default class BannerEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allBanners: [],
            currentBannerId:null,
        }
    }

  setCurrentBunner = (id)=>{
    this.setState({
        currentBannerId: id
    })
  }
  addNewBanner = ()=>{
      const id =this.state.allBanners.length===0?1:this.state.allBanners[this.state.allBanners.length - 1].num + 1
      const banner = {num:id}
      const newState = this.state.allBanners.concat(banner);
      this.setState({
        allBanners:newState,
        currentBannerId: id
      })
  }
  deleteBanner = ()=>{
      const newState = this.state.allBanners.filter((banner)=>+banner.num!==+this.state.currentBannerId);
      this.setState({
          allBanners:newState,
          currentBannerId:null
      })
  }
  onClickNoBanner = (e)=>{
      console.log(e.target)
    if(e.target.classList.contains('banners-field')===true){
        this.setState({
            currentBannerId: null,
        })
    }
  }
    render(){
        const addBtn = this.state.allBanners.length>=10?true:false;
        const deleteBtn = this.state.currentBannerId===null?true:false;
        return (
            <div className='main-banner-container' style={{position:'relative'}}>
                 <h2>Banner Editor v1.0</h2>
                 <BannersField data={this.state} setCurrentBunner={this.setCurrentBunner} onMouseClick={this.onClickNoBanner}/>
                 <AddOrDeleteBtns func={{addNewBanner:this.addNewBanner, deleteBanner:this.deleteBanner}} active={{add:addBtn, delet:deleteBtn}}/>
            </div>
        )   
    }
}