import {useCallback, useState} from 'react';
import Taro from "@tarojs/taro";

export interface UserInfo {
  avatarUrl: string;
  nickName: string;
  gender: number | undefined;
  phoneNumber?: string;
  token?: string;
}

const USER_INFO_STORAGE_KEY = 'userInfo';
const TOKEN_STORAGE_KEY = 'token';
const API_BASE_URL = 'http://localhost:8123';

// 将缓存操作抽离成独立的函数
const getUserFromStorage = (): UserInfo | null => {
  try {
    const cached = Taro.getStorageSync(USER_INFO_STORAGE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Failed to get user from storage:', error);
    return null;
  }
};

const saveUserToStorage = (user: UserInfo) => {
  try {
    const userToStore = {
      avatarUrl: user.avatarUrl,
      nickName: user.nickName,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      token: user.token
    };
    Taro.setStorageSync(USER_INFO_STORAGE_KEY, JSON.stringify(userToStore));
    if (user.token) {
      Taro.setStorageSync(TOKEN_STORAGE_KEY, user.token);
    }
  } catch (error) {
    console.error('Failed to save user to storage:', error);
  }
};

export function useUser() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(getUserFromStorage);

  // 微信登录
  const login = useCallback(async () => {
    try {
      const {code} = await Taro.login();
      const res = await Taro.request({
        url: `${API_BASE_URL}/auth/wx/login`,
        method: 'POST',
        data: {code}
      });

      if (res.data.code === 0) {
        const {token, userInfo} = res.data.data;
        const formattedUserInfo: UserInfo = {
          ...userInfo,
          token
        };
        setUserInfo(formattedUserInfo);
        saveUserToStorage(formattedUserInfo);
        return formattedUserInfo;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  // 获取用户信息
  const getUserProfile = useCallback(async () => {
    try {
      const {userInfo: wxUserInfo} = await Taro.getUserProfile({
        desc: '用于完善用户资料'
      });

      // 先进行微信登录获取 code
      const {code} = await Taro.login();

      // 发送登录请求
      const res = await Taro.request({
        url: `${API_BASE_URL}/auth/wx/login`,
        method: 'POST',
        data: {
          code,
          userInfo: {
            nickName: wxUserInfo.nickName,
            avatarUrl: wxUserInfo.avatarUrl,
            gender: wxUserInfo.gender
          }
        }
      });

      if (res.data.code === 0) {
        const {token, userInfo} = res.data.data;
        const formattedUserInfo: UserInfo = {
          ...userInfo,
          token
        };
        setUserInfo(formattedUserInfo);
        saveUserToStorage(formattedUserInfo);
        return formattedUserInfo;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error('Get user profile failed:', error);
      throw error;
    }
  }, []);

  // 获取手机号
  const getPhoneNumber = useCallback(async (e) => {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      try {
        const res = await Taro.request({
          url: `${API_BASE_URL}/auth/phone`,
          method: 'POST',
          data: {
            code: e.detail.code
          },
          header: {
            Authorization: `Bearer ${userInfo?.token}`
          }
        });

        if (res.data.code === 0) {
          const updatedUserInfo = {
            ...userInfo!,
            phoneNumber: res.data.data.phoneNumber
          };
          setUserInfo(updatedUserInfo);
          saveUserToStorage(updatedUserInfo);
          return updatedUserInfo;
        }
      } catch (error) {
        console.error('Get phone number failed:', error);
        throw error;
      }
    }
  }, [userInfo]);

  // 验证码登录
  const loginWithCode = useCallback(async (phone: string, code: string) => {
    try {
      const res = await Taro.request({
        url: `${API_BASE_URL}/auth/login/code`,
        method: 'POST',
        data: {
          username: phone,
          password: code
        }
      });

      if (res.data.code === 0) {
        const {token, userInfo} = res.data.data;
        const formattedUserInfo: UserInfo = {
          ...userInfo,
          token
        };
        setUserInfo(formattedUserInfo);
        saveUserToStorage(formattedUserInfo);
        return formattedUserInfo;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error('Login with code failed:', error);
      throw error;
    }
  }, []);

  // 发送验证码
  const sendCode = useCallback(async (phone: string) => {
    try {
      const res = await Taro.request({
        url: `${API_BASE_URL}/auth/code`,
        method: 'POST',
        data: {
          username: phone
        }
      });

      return res.data.code === 0;
    } catch (error) {
      console.error('Send code failed:', error);
      throw error;
    }
  }, []);

  // 退出登录
  const logout = useCallback(() => {
    setUserInfo(null);
    try {
      Taro.removeStorageSync(USER_INFO_STORAGE_KEY);
      Taro.removeStorageSync(TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove user from storage:', error);
    }
  }, []);

  return {
    userInfo,
    login,
    getUserProfile,
    getPhoneNumber,
    loginWithCode,
    sendCode,
    logout
  };
}
