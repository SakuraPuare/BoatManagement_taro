const getAppConfig = () => {
  let config: Taro.AppConfig = {
    pages: [
      "pages/index/index",
      "pages/booking/index",
      "pages/booking/history/index",
      "pages/package/index",
      "pages/profile/index",
      "pages/profile/settings/index",
      "pages/profile/favorites/index",
      "pages/help/index",
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "智能游船管理",
      navigationBarTextStyle: "black",
    },
  };

  // if is weapp
  if (process.env.TARO_ENV == "weapp") {
    config.tabBar = {
      custom: true,
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
        },
        {
          pagePath: "pages/booking/index",
          text: "预约",
        },
        {
          pagePath: "pages/package/index",
          text: "套餐",
        },
        {
          pagePath: "pages/profile/index",
          text: "个人中心",
        },
      ],
    };
  }

  return config;
}

const config = defineAppConfig(getAppConfig());

export default config;
