const URL_COMMON = 'http://123.57.217.199:9587/api/v1/sml/'
// 乐夺宝接口地址
export let hpApi = {
  // banner地址
  banner: URL_COMMON + 'slider?type=1yg',
  // 获取首页商品
  home: URL_COMMON + 'oneBuyProject',
  // 参与记录
  partake_record: URL_COMMON + 'ptpay',
  // 中奖信息
  winner_info: URL_COMMON + 'oneBuyCycle',
  // 个人参与记录
  my_partake: URL_COMMON + 'oneBuyUserPay',
  // 所有参与记录
  all_partake: URL_COMMON + 'oneBuyUser',
  // 登录
  login: URL_COMMON + 'login',
  // 我的本金
  coinmeter: URL_COMMON + 'coinmeter',
  // 我的盈利
  userate: URL_COMMON + 'userate',
  // 所有参与记录
  userOneBuyOrder: URL_COMMON + 'userOneBuyOrder',
  // 中奖记录
  oneBuyNewPublic: URL_COMMON + 'oneBuyNewPublic',
  // 添加到购物车-post,查询购物车-get.(redis)
  redisCart: URL_COMMON + 'shoppingCart',
  // 购物车支付
  cartPay: URL_COMMON + 'shoppingCartPay'
}
