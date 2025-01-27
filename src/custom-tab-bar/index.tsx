import {Component} from "react";
import Taro from "@tarojs/taro";
import {CoverView} from "@tarojs/components";

import "./index.scss";

export default class Index extends Component {
  state = {
    selected: 0,
    color: "#000000",
    selectedColor: "#DC143C",
    list: [
      {
        pagePath: "/pages/index/index",
        icon: "🏠",
        text: "首页",
      },
      {
        pagePath: "/pages/booking/index",
        icon: "📅",
        text: "预约",
      },
      {
        pagePath: "/pages/package/index",
        icon: "📦",
        text: "套餐",
      },
      {
        pagePath: "/pages/profile/index",
        icon: "🧑",
        text: "个人中心",
      },
    ],
  };

  switchTab(index, url) {
    this.setSelected(index);
    Taro.switchTab({url});
  }

  setSelected(idx: number) {
    this.setState({
      selected: idx,
    });
  }

  render() {
    const {list, selected, color, selectedColor} = this.state;

    return (
      <CoverView className="tab-bar">
        <CoverView className="tab-bar-border"></CoverView>
        {list.map((item, index) => {
          return (
            <CoverView
              key={index}
              className="tab-bar-item"
              onClick={this.switchTab.bind(this, index, item.pagePath)}
            >
              <CoverView
                className="tab-bar-icon"
                style={{
                  fontSize: "24px",
                  color: selected === index ? selectedColor : color
                }}
              >
                {item.icon}
              </CoverView>
              <CoverView
                style={{color: selected === index ? selectedColor : color}}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    );
  }
}
