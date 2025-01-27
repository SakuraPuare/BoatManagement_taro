import {View, Image, Text} from "@tarojs/components";
import {navigateTo} from "@tarojs/taro";

import "./index.css";

export default function Index() {
  const quickActions = [
    {icon: '🚤', text: '快速租船', path: '/pages/booking/quick'},
    {icon: '📅', text: '历史租船', path: '/pages/booking/history'},
    {icon: '📋', text: '租船指南', path: '/pages/guide/index'},
    {icon: '💡', text: '更多服务', path: '/pages/services/index'}
  ];

  const packages = [
    {
      id: 1,
      title: '环湖观光之旅',
      duration: '2小时精品游览',
      price: 299,
      image: '/assets/images/tour1.jpg'
    },
    {
      id: 2,
      title: '浪漫日落之旅',
      duration: '3小时特色体验',
      price: 399,
      image: '/assets/images/tour2.jpg'
    }
  ];

  const boats = [
    {
      id: '001',
      name: '游船001号',
      location: '码头A区',
      capacity: 6,
      status: '可租用'
    },
    {
      id: '002',
      name: '游船002号',
      location: '环湖航线',
      status: '使用中',
      returnTime: '16:30'
    }
  ];

  const features = [
    {
      title: '派对游船套餐',
      desc: '专属定制，欢乐体验',
      image: '/assets/images/feature1.jpg'
    },
    {
      title: '垂钓休闲套餐',
      desc: '专业装备，体验钓鱼乐趣',
      image: '/assets/images/feature2.jpg'
    }
  ];

  return (
    <View className="min-h-screen bg-gray-50 pb-[120px]">
      {/* 快捷操作区 */}
      <View className="grid grid-cols-4 gap-2 bg-white p-4">
        {quickActions.map(item => (
          <View
            key={item.text}
            className="flex flex-col items-center"
            onClick={() => navigateTo({url: item.path})}
          >
            <View className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-1">
              <Text className="text-2xl">{item.icon}</Text>
            </View>
            <Text className="text-sm text-gray-600">{item.text}</Text>
          </View>
        ))}
      </View>

      {/* 热门旅游套餐 */}
      <View className="mt-4 bg-white p-4">
        <View className="flex justify-between items-center mb-4">
          <Text className="text-lg font-bold">热门旅游套餐</Text>
          <Text className="text-sm text-blue-500">查看更多</Text>
        </View>
        <View className="grid grid-cols-2 gap-4">
          {packages.map(pkg => (
            <View key={pkg.id} className="rounded-lg overflow-hidden shadow">
              <Image
                src={pkg.image}
                className="w-full h-32 object-cover"
                mode="aspectFill"
              />
              <View className="p-2">
                <Text className="font-bold">{pkg.title}</Text>
                <Text className="text-xs text-gray-500">{pkg.duration}</Text>
                <View className="flex justify-between items-center mt-2">
                  <Text className="text-red-500">¥{pkg.price}</Text>
                  <View className="bg-blue-500 text-white text-sm px-3 py-1 rounded">
                    立即预订
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 实时船只状态 */}
      <View className="mt-4 bg-white p-4">
        <Text className="text-lg font-bold mb-4">实时船只状态</Text>
        {boats.map(boat => (
          <View key={boat.id} className="flex justify-between items-center py-3 border-b border-gray-100">
            <View>
              <Text className="font-medium">{boat.name}</Text>
              <Text className="text-sm text-gray-500">当前位置: {boat.location}</Text>
            </View>
            <View className="text-right">
              <Text className={`text-sm ${boat.status === '可租用' ? 'text-green-500' : 'text-red-500'}`}>
                {boat.status}
              </Text>
              {boat.capacity && <Text className="text-sm text-gray-500">当前空位: {boat.capacity}人</Text>}
              {boat.returnTime && <Text className="text-sm text-gray-500">预计返回: {boat.returnTime}</Text>}
            </View>
          </View>
        ))}
      </View>

      {/* 特色推荐 */}
      <View className="mt-4 bg-white p-4">
        <Text className="text-lg font-bold mb-4">特色推荐</Text>
        <View className="grid grid-cols-2 gap-4">
          {features.map(feature => (
            <View key={feature.title} className="relative rounded-lg overflow-hidden">
              <Image
                src={feature.image}
                className="w-full h-24 object-cover"
                mode="aspectFill"
              />
              <View className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                <Text className="text-white font-bold">{feature.title}</Text>
                <Text className="text-white text-xs">{feature.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
