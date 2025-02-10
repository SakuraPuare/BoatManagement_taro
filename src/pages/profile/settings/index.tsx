import {Switch, Text, View} from "@tarojs/components";
import {useState} from "react";
import {FontAwesome} from "taro-icons";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    privacy: true,
    sound: true
  });

  const settingsItems = [
    {
      icon: "bell",
      text: "消息通知",
      key: "notifications"
    },
    {
      icon: "moon",
      text: "深色模式",
      key: "darkMode"
    },
    {
      icon: "shield",
      text: "隐私设置",
      key: "privacy"
    },
    {
      icon: "mobile",
      text: "声音开关",
      key: "sound"
    }
  ];

  return (
    <View className="min-h-screen bg-gray-50">
      <View className="bg-white mt-2">
        {settingsItems.map((item) => (
          <View
            key={item.key}
            className="flex items-center justify-between p-4 border-b border-gray-100"
          >
            <View className="flex items-center">
              <FontAwesome family="solid" name={item.icon} size={20} color="#4B5563"/>
              <Text className="ml-3">{item.text}</Text>
            </View>
            <Switch
              checked={settings[item.key]}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  [item.key]: e.detail.value
                }))
              }
              color="#3B82F6"
            />
          </View>
        ))}
      </View>
    </View>
  );
}
