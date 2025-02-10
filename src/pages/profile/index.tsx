import {Button, Image, Text, View} from "@tarojs/components";
import {useUser} from "@/hooks/useUser";
import {FontAwesome} from "taro-icons";

import Taro from "@tarojs/taro";

export default function Profile() {
  const {userInfo, getUserProfile, getPhoneNumber, logout} = useUser();

  const menuItems = [
    {
      icon: "history",
      text: "租船记录",
      path: "/pages/booking/history/index",
    },
    {
      icon: "heart",
      text: "我的收藏",
      path: "/pages/profile/favorites/index",
    },
    {
      icon: "phone-alt",
      text: "联系客服",
      action: "contact",
    },
    {
      icon: "question",
      text: "使用帮助",
      path: "/pages/help/index",
    },
    {
      icon: "cog",
      text: "设置",
      path: "/pages/profile/settings/index",
    },
  ];

  return (
    <View className="min-h-screen bg-gray-50 pb-[120px]">
      {/* 用户信息卡片 */}
      <View className="bg-blue-500 px-6 pt-6 pb-4">
        {userInfo ? (
          <View className="flex items-center">
            <Image
              className="w-16 h-16 rounded-full border-2 border-white"
              src={userInfo.avatarUrl}
            />
            <View className="ml-4">
              <Text className="text-white text-lg font-bold pr-2">
                {userInfo.nickName}
              </Text>
              <Text className="text-white text-sm opacity-80 pr-2">普通会员</Text>
            </View>
          </View>
        ) : (
          <View className="flex items-center justify-between">
            <View className="flex items-center">
              <View className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <FontAwesome
                  family="solid"
                  name="user"
                  size={32}
                  color="#9CA3AF"
                />
              </View>
              <Text className="ml-4 text-white text-lg">未登录</Text>
            </View>
            <Button
              className="bg-white text-blue-500 rounded-full px-6 py-1"
              style={{height: "32px", textAlign: "center"}}
              onClick={() => getUserProfile()}
            >
              立即登录
            </Button>
          </View>
        )}
      </View>

      {/* 会员卡片 */}
      {userInfo && (
        <View>
          <View className="bg-blue-500 py-4"> </View>
          <View className="mx-4 -mt-8 bg-white rounded-lg shadow-md p-4">
            <View className="flex justify-between items-center">
              <View>
                <Text className="text-lg font-bold pr-2">我的会员卡</Text>
                <Text className="text-sm text-gray-500 pr-2">享受会员专属优惠</Text>
              </View>
              <Button
                className="bg-yellow-500 text-white rounded-full text-sm px-4"
                size="mini"
                onClick={() => {
                  // Taro.navigateTo({ url: "/pages/profile/settings" });
                }}
              >
                查看特权
              </Button>
            </View>
          </View>
        </View>
      )}

      {/* 功能菜单 */}
      <View className="mt-4 bg-white">
        {menuItems.map((item, index) => {
          return (
            <View
              key={item.text}
              className="flex items-center justify-between p-4 border-b border-gray-100"
              onClick={() => {
                if (item.path) {
                  Taro.navigateTo({url: item.path});
                } else if (item.action === "contact") {
                  // 处理联系客服
                }
              }}
            >
              <View className="flex items-center">
                <FontAwesome
                  family="solid"
                  name={item.icon}
                  size={20}
                  color="#4B5563"
                />
                <Text className="ml-3">{item.text}</Text>
              </View>
              <Text className="text-gray-400">›</Text>
            </View>
          );
        })}
      </View>

      {/* 退出登录 */}
      {userInfo && (
        <View className="mt-4 mx-4">
          <Button
            className="bg-white text-red-500 rounded-full py-1"
            style={{height: "32px", textAlign: "center"}}
            onClick={() => {
              Taro.showModal({
                title: "提示",
                content: "确定要退出登录吗？",
                success: (res) => {
                  if (res.confirm) {
                    logout();
                  }
                },
              });
            }}
          >
            退出登录
          </Button>
        </View>
      )}
    </View>
  );
}
