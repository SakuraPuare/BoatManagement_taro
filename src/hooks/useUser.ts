import {useState, useCallback} from 'react';
import Taro from "@tarojs/taro";

export interface UserInfo {
  avatarUrl: string;
  nickName: string;
  gender: number;
  phoneNumber?: string;
}

export function useUser() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const cached = Taro.getStorageSync('userInfo');
    return cached ? JSON.parse(cached) : null;
  });

  const login = useCallback(async () => {
    try {
      const {code} = await Taro.login();
      // 这里需要配合后端接口，将 code 发送到服务器换取 openId 等信息
      console.log('Login code:', code);
      return code;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const getUserProfile = useCallback(async () => {
    try {
      const {userInfo} = await Taro.getUserProfile({
        desc: '用于完善用户资料'
      });
      setUserInfo(userInfo);
      Taro.setStorageSync('userInfo', JSON.stringify(userInfo));
      return userInfo;
    } catch (error) {
      console.error('Get user profile failed:', error);
      throw error;
    }
  }, []);

  const getPhoneNumber = useCallback(async (e) => {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 需要将 code 发送到后端解密获取手机号
      console.log('Phone number code:', e.detail.code);
    }
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    Taro.removeStorageSync('userInfo');
  }, []);

  return {
    userInfo,
    login,
    getUserProfile,
    getPhoneNumber,
    logout
  };
}
