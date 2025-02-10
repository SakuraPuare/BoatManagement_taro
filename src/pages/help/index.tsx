import {Button, Text, View} from "@tarojs/components";
import {useState} from "react";
import {FontAwesome} from "taro-icons";

interface FAQItem {
  id: string;
  category: string;
  icon: string;
  questions: {
    q: string;
    a: string;
  }[];
}

export default function Help() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const faqData: FAQItem[] = [
    {
      id: '1',
      category: '租船指南',
      icon: 'ship',
      questions: [
        {
          q: '如何预订游船？',
          a: '您可以通过以下步骤预订游船：\n1. 在首页或预约页面选择心仪的游船\n2. 选择游览时间和人数\n3. 填写联系信息\n4. 支付订单\n预订成功后，您将收到预订确认通知。'
        },
        {
          q: '可以提前多久预订？',
          a: '您可以提前30天预订游船。建议提前预订以确保您理想的时间段。特殊节假日建议提前更早预订。'
        }
      ]
    },
    {
      id: '2',
      category: '时间安排',
      icon: 'clock',
      questions: [
        {
          q: '游船时间怎么计算？',
          a: '游船时间从您登船开始计算，包括安全说明时间。请提前15分钟到达码头办理登船手续。'
        },
        {
          q: '可以延长游船时间吗？',
          a: '如果当天后续时段未被预订，可以在游玩过程中申请延长。延长时间按小时计费，请提前与工作人员沟通。'
        }
      ]
    },
    {
      id: '3',
      category: '支付问题',
      icon: 'credit-card',
      questions: [
        {
          q: '支持哪些支付方式？',
          a: '目前支持微信支付、支付宝、银行卡等多种支付方式。部分特惠活动可能限制支付方式，请以实际下单时可用的支付方式为准。'
        },
        {
          q: '如何申请退款？',
          a: '您可以在订单详情页申请退款。退款规则如下：\n- 出行前24小时取消：全额退款\n- 出行前12小时取消：退款80%\n- 出行前6小时取消：退款50%\n- 出行前6小时内取消：不予退款'
        }
      ]
    },
    {
      id: '4',
      category: '安全须知',
      icon: 'exclamation-circle',
      questions: [
        {
          q: '儿童可以乘坐吗？',
          a: '儿童必须在成年人陪同下乘坐。身高1.2米以下儿童必须穿戴救生衣，我们会免费提供儿童专用救生衣。'
        },
        {
          q: '天气不好可以改期吗？',
          a: '如遇恶劣天气（暴雨、雷电、大风等），我们会主动联系您改期或退款。您也可以在出行前主动联系客服改期。'
        }
      ]
    },
    {
      id: '5',
      category: '隐私保护',
      icon: 'user-shield',
      questions: [
        {
          q: '个人信息如何保护？',
          a: '我们严格遵守隐私保护法规，对您的个人信息进行加密保护。未经您的允许，我们不会向第三方泄露您的信息。'
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedQuestion(null);
  };

  const toggleQuestion = (questionText: string) => {
    setExpandedQuestion(expandedQuestion === questionText ? null : questionText);
  };

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 顶部搜索框 */}
      <View className="bg-white p-4">
        <View className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <FontAwesome family="solid" name="life-ring" size={20} color="#9CA3AF"/>
          <Text className="text-gray-400 ml-2">搜索常见问题</Text>
        </View>
      </View>

      {/* FAQ列表 */}
      <View className="mt-2">
        {faqData.map(category => (
          <View key={category.id} className="mb-2 bg-white">
            {/* 分类标题 */}
            <View
              className="flex items-center justify-between p-4 border-b border-gray-100"
              onClick={() => toggleCategory(category.id)}
            >
              <View className="flex items-center">
                <FontAwesome family="solid" name={category.icon} size={20} color="#3B82F6"/>
                <Text className="font-medium ml-2">{category.category}</Text>
              </View>
              <FontAwesome
                family="solid"
                name={expandedCategory === category.id ? "chevron-up" : "chevron-down"}
                size={20}
                color="#9CA3AF"
              />
            </View>

            {/* 问题列表 */}
            {expandedCategory === category.id && (
              <View className="bg-gray-50">
                {category.questions.map((item, index) => (
                  <View
                    key={index}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <View
                      className="p-4 flex justify-between items-center"
                      onClick={() => toggleQuestion(item.q)}
                    >
                      <Text className="flex-1 text-gray-700">{item.q}</Text>
                      <FontAwesome
                        family="solid"
                        name={expandedQuestion === item.q ? "chevron-up" : "chevron-down"}
                        size={16}
                        color="#9CA3AF"
                      />
                    </View>
                    {expandedQuestion === item.q && (
                      <View className="px-4 pb-4">
                        <Text className="text-gray-500 text-sm whitespace-pre-line">
                          {item.a}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* 底部联系方式 */}
      <View className="mt-4 p-4 bg-white">
        <Text className="text-center text-gray-500 text-sm">
          如果还有其他问题，请联系客服
        </Text>
        <Button
          className="mt-2 py-3 bg-blue-500 rounded-full"
          onClick={() => {
            // 调用客服功能
          }}
          style={{height: '48px', textAlign: 'center'}}
        >
          联系客服
        </Button>
      </View>
    </View>
  );
}
