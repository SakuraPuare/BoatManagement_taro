import {Image, Text, View} from "@tarojs/components";
import {useState} from "react";
import {FontAwesome} from "taro-icons";
import Taro from "@tarojs/taro";

interface FavoriteItem {
  id: string;
  type: 'boat' | 'package';
  title: string;
  image: string;
  price: number;
  location?: string;
  capacity?: number;
  duration?: string;
  description: string;
}

export default function Favorites() {
  const [activeTab, setActiveTab] = useState<'boats' | 'packages'>('boats');
  const [favorites] = useState<FavoriteItem[]>([
    {
      id: '1',
      type: 'boat',
      title: '豪华游艇001号',
      image: '/assets/images/boat1.jpg',
      price: 299,
      location: '码头A区',
      capacity: 6,
      description: '豪华游艇，配备专业船长，提供舒适的游览体验'
    },
    {
      id: '2',
      type: 'package',
      title: '浪漫日落之旅',
      image: '/assets/images/package1.jpg',
      price: 399,
      duration: '3小时',
      description: '傍晚出发，欣赏美丽的日落景色，享受浪漫时光'
    },
    {
      id: '3',
      type: 'boat',
      title: '游艇002号',
      image: '/assets/images/boat2.jpg',
      price: 199,
      location: '码头B区',
      capacity: 4,
      description: '经济实惠的选择，适合小型家庭出游'
    },
    {
      id: '4',
      type: 'package',
      title: '环湖观光套餐',
      image: '/assets/images/package2.jpg',
      price: 299,
      duration: '2小时',
      description: '专业导游讲解，了解湖区人文历史'
    }
  ]);

  const tabs = [
    {key: 'boats', text: '游船'},
    {key: 'packages', text: '套餐'}
  ] as const;

  const filteredFavorites = favorites.filter(
    item => activeTab === 'boats' ? item.type === 'boat' : item.type === 'package'
  );

  const handleItemClick = (item: FavoriteItem) => {
    if (item.type === 'boat') {
      Taro.navigateTo({url: `/pages/booking/boat?id=${item.id}`});
    } else {
      Taro.navigateTo({url: `/pages/package/detail?id=${item.id}`});
    }
  };

  const handleUnfavorite = (itemId: string, e: any) => {
    e.stopPropagation();
    Taro.showModal({
      title: '提示',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          // 实现取消收藏的逻辑
          console.log('取消收藏:', itemId);
        }
      }
    });
  };

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 标签切换 */}
      <View className="flex bg-white mb-2">
        {tabs.map(tab => (
          <View
            key={tab.key}
            className={`flex-1 py-3 text-center ${
              activeTab === tab.key
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <Text>{tab.text}</Text>
          </View>
        ))}
      </View>

      {/* 收藏列表 */}
      <View className="p-4">
        {filteredFavorites.map(item => (
          <View
            key={item.id}
            className="bg-white rounded-lg mb-4 overflow-hidden"
            onClick={() => handleItemClick(item)}
          >
            <Image
              src={item.image}
              className="w-full h-48 object-cover"
              mode="aspectFill"
            />
            <View className="p-4">
              <View className="flex justify-between items-start">
                <Text className="text-lg font-bold">{item.title}</Text>
                <FontAwesome
                  family="solid"
                  name="heart"
                  size={24}
                  color="#EF4444"
                  onClick={(e) => handleUnfavorite(item.id, e)}
                />
              </View>

              <View className="mt-2 text-gray-500 text-sm">
                {item.type === 'boat' ? (
                  <View className="space-y-1">
                    <View className="flex items-center">
                      <FontAwesome family="solid" name="location-dot" size={16} color="#6B7280" className="mr-1"/>
                      <Text>{item.location}</Text>
                    </View>
                    <View className="flex items-center">
                      <FontAwesome family="solid" name="users" size={16} color="#6B7280" className="mr-1"/>
                      <Text>可乘坐 {item.capacity} 人</Text>
                    </View>
                  </View>
                ) : (
                  <View className="flex items-center">
                    <FontAwesome family="solid" name="clock" size={16} color="#6B7280" className="mr-1"/>
                    <Text>时长：{item.duration}</Text>
                  </View>
                )}
              </View>

              <Text className="mt-2 text-sm text-gray-600">
                {item.description}
              </Text>

              <View className="mt-3 flex justify-between items-center">
                <Text className="text-red-500 text-lg font-bold">
                  ¥{item.price}
                </Text>
                <View
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    Taro.navigateTo({
                      url: `/pages/booking/index?id=${item.id}&type=${item.type}`
                    });
                  }}
                >
                  <Text className="text-white">立即预订</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* 空状态 */}
        {filteredFavorites.length === 0 && (
          <View className="flex flex-col items-center justify-center py-12">
            <View className="w-32 h-32 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
              <FontAwesome family="solid" name="heart" size={48} color="#9CA3AF"/>
            </View>
            <Text className="text-gray-500">
              暂无收藏的{activeTab === 'boats' ? '游船' : '套餐'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
