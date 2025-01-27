import {View, Text, Image} from "@tarojs/components";
import {useState} from "react";
import { FontAwesome } from "taro-icons";

interface BookingRecord {
  id: string;
  boatName: string;
  boatImage: string;
  status: 'completed' | 'ongoing' | 'cancelled';
  date: string;
  time: string;
  duration: string;
  location: string;
  passengers: number;
  price: number;
}

export default function BookingHistory() {
  const [activeTab, setActiveTab] = useState<'all' | 'ongoing' | 'completed'>('all');

  const [bookings] = useState<BookingRecord[]>([
    {
      id: '1',
      boatName: '游船001号',
      boatImage: '/assets/images/boat1.jpg',
      status: 'completed',
      date: '2024-03-15',
      time: '14:30',
      duration: '2小时',
      location: '码头A区',
      passengers: 4,
      price: 299
    },
    {
      id: '2',
      boatName: '游船003号',
      boatImage: '/assets/images/boat2.jpg',
      status: 'ongoing',
      date: '2024-03-18',
      time: '15:00',
      duration: '3小时',
      location: '码头B区',
      passengers: 6,
      price: 399
    }
  ]);

  const tabs = [
    {key: 'all', text: '全部'},
    {key: 'ongoing', text: '进行中'},
    {key: 'completed', text: '已完成'}
  ] as const;

  const getStatusColor = (status: BookingRecord['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'ongoing':
        return 'text-blue-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status: BookingRecord['status']) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'ongoing':
        return '进行中';
      case 'cancelled':
        return '已取消';
      default:
        return '';
    }
  };

  const filteredBookings = bookings.filter(booking =>
    activeTab === 'all' || booking.status === activeTab
  );

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

      {/* 订单列表 */}
      <View className="px-4">
        {filteredBookings.map(booking => (
          <View
            key={booking.id}
            className="bg-white rounded-lg mb-4 overflow-hidden"
          >
            {/* 订单头部 */}
            <View className="p-4 border-b border-gray-100">
              <View className="flex justify-between items-center mb-2">
                <Text className="font-bold">{booking.boatName}</Text>
                <Text className={getStatusColor(booking.status)}>
                  {getStatusText(booking.status)}
                </Text>
              </View>
              <View className="flex items-center">
                <Image
                  src={booking.boatImage}
                  className="w-20 h-20 rounded-lg object-cover"
                  mode="aspectFill"
                />
                <View className="ml-4 flex-1">
                  <View className="flex items-center text-gray-500 text-sm mb-2">
                    <FontAwesome family="solid" name="calendar" size={16} color="#9CA3AF" />
                    <Text className="ml-1">{booking.date} {booking.time}</Text>
                  </View>
                  <View className="flex items-center text-gray-500 text-sm mb-2">
                    <FontAwesome family="solid" name="clock" size={16} color="#9CA3AF" />
                    <Text className="ml-1">时长：{booking.duration}</Text>
                  </View>
                  <View className="flex items-center text-gray-500 text-sm mb-2">
                    <FontAwesome family="solid" name="location-dot" size={16} color="#9CA3AF" />
                    <Text className="ml-1">{booking.location}</Text>
                  </View>
                  <View className="flex items-center text-gray-500 text-sm">
                    <FontAwesome family="solid" name="user" size={16} color="#9CA3AF" />
                    <Text className="ml-1">{booking.passengers}人</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 订单底部 */}
            <View className="p-4 flex justify-between items-center">
              <View>
                <Text className="text-sm text-gray-500">订单金额</Text>
                <Text className="text-lg font-bold text-red-500">
                  ¥{booking.price}
                </Text>
              </View>
              <View className="flex space-x-2">
                {booking.status === 'completed' && (
                  <View
                    className="px-4 py-2 border border-blue-500 rounded-full"
                    onClick={() => {
                      // 跳转到评价页面
                    }}
                  >
                    <Text className="text-blue-500">评价</Text>
                  </View>
                )}
                <View
                  className="px-4 py-2 bg-blue-500 rounded-full"
                  onClick={() => {
                    // 跳转到订单详情页面
                  }}
                >
                  <Text className="text-white">查看详情</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* 空状态 */}
        {filteredBookings.length === 0 && (
          <View className="flex flex-col items-center justify-center py-12">
            <View className="w-32 h-32 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
              <FontAwesome family="solid" name="calendar" size={48} color="#9CA3AF" />
            </View>
            <Text className="text-gray-500">暂无租船记录</Text>
          </View>
        )}
      </View>
    </View>
  );
}
