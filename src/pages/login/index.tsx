import { View, Text, Button, Input } from "@tarojs/components";
import { useState, useCallback } from "react";
import { useUser } from "@/hooks/useUser";
import Taro from "@tarojs/taro";
import { FontAwesome } from "taro-icons";

export default function Login() {
  const { getUserProfile, loginWithCode, sendCode } = useUser();
  const [loginType, setLoginType] = useState<"wechat" | "phone">("wechat");
  const [phone, setPhone] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [countdown, setCountdown] = useState(0);

  // 处理微信登录
  const handleWechatLogin = async () => {
    try {
      await getUserProfile();
      Taro.showToast({ title: "登录成功", icon: "success" });
      Taro.navigateBack();
    } catch (error) {
      console.error("微信登录失败:", error);
      Taro.showToast({ title: "登录失败", icon: "error" });
    }
  };

  // 处理发送验证码
  const handleSendCode = useCallback(async () => {
    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      Taro.showToast({ title: "请输入正确的手机号", icon: "none" });
      return;
    }

    try {
      await sendCode(phone);
      Taro.showToast({ title: "验证码已发送", icon: "success" });

      // 开始倒计时
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("发送验证码失败:", error);
      Taro.showToast({ title: "发送失败", icon: "error" });
    }
  }, [phone, sendCode]);

  // 处理验证码登录
  const handleCodeLogin = async () => {
    if (!phone || !verifyCode) {
      Taro.showToast({ title: "请填写完整信息", icon: "none" });
      return;
    }

    try {
      await loginWithCode(phone, verifyCode);
      Taro.showToast({ title: "登录成功", icon: "success" });
      Taro.navigateBack();
    } catch (error) {
      console.error("验证码登录失败:", error);
      Taro.showToast({ title: "登录失败", icon: "error" });
    }
  };

  return (
    <View className="min-h-screen bg-gray-50 p-4">
      {/* 登录方式切换 */}
      <View className="bg-white rounded-lg mb-4 p-2 flex">
        <View
          className={`flex-1 py-2 text-center rounded-md ${
            loginType === "wechat" ? "bg-blue-500 text-white" : "text-gray-500"
          }`}
          onClick={() => setLoginType("wechat")}
        >
          <Text>微信登录</Text>
        </View>
        <View
          className={`flex-1 py-2 text-center rounded-md ${
            loginType === "phone" ? "bg-blue-500 text-white" : "text-gray-500"
          }`}
          onClick={() => setLoginType("phone")}
        >
          <Text>手机号登录</Text>
        </View>
      </View>

      {/* 微信登录 */}
      {loginType === "wechat" && (
        <View className="bg-white rounded-lg p-6">
          <View className="flex justify-center mb-6">
            <FontAwesome family="brands" name="weixin" size={64} color="#07C160" />
          </View>
          <Button
            className="bg-[#07C160] text-white rounded-full"
            onClick={handleWechatLogin}
          >
            微信一键登录
          </Button>
        </View>
      )}

      {/* 手机号登录 */}
      {loginType === "phone" && (
        <View className="bg-white rounded-lg p-6">
          {/* 手机号输入 */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">手机号</Text>
            <View className="flex border border-gray-200 rounded-lg p-2">
              <Text className="text-gray-400 mr-2">+86</Text>
              <Input
                type="number"
                className="flex-1"
                placeholder="请输入手机号"
                value={phone}
                onInput={(e) => setPhone(e.detail.value)}
              />
            </View>
          </View>

          {/* 验证码输入 */}
          <View className="mb-6">
            <Text className="text-gray-600 mb-2">验证码</Text>
            <View className="flex items-center">
              <Input
                type="number"
                className="flex-1 border border-gray-200 rounded-lg p-2 mr-2"
                placeholder="请输入验证码"
                value={verifyCode}
                onInput={(e) => setVerifyCode(e.detail.value)}
              />
              <Button
                className={`min-w-[120px] ${
                  countdown > 0
                    ? "bg-gray-300 text-gray-600"
                    : "bg-blue-500 text-white"
                }`}
                onClick={handleSendCode}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `${countdown}s后重发` : "获取验证码"}
              </Button>
            </View>
          </View>

          {/* 登录按钮 */}
          <Button
            className="bg-blue-500 text-white rounded-full"
            onClick={handleCodeLogin}
          >
            登录
          </Button>
        </View>
      )}

      {/* 用户协议 */}
      <View className="mt-4 text-center text-gray-500 text-sm">
        <Text>登录即代表您同意</Text>
        <Text className="text-blue-500" onClick={() => Taro.navigateTo({ url: '/pages/agreement/index' })}>
          《用户服务协议》
        </Text>
        <Text>和</Text>
        <Text className="text-blue-500" onClick={() => Taro.navigateTo({ url: '/pages/privacy/index' })}>
          《隐私政策》
        </Text>
      </View>
    </View>
  );
}
