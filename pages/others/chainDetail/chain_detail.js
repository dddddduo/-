const $ = getApp().globalData
Page({
  data: {
    detail: {
      deposit: [],
      order: [],
      warehouse: [],
      transport: [],
      acceptance: [],
      settlement: [],
      invoice: [],
      payment: []
    },
    contract: {},
    confirmId: '',
    types: [
      // {key: 'contract', url: ''},
      {name: '订金', key: 'deposit', url: '/pages/bills/cooperation/deposit/deposit', height: '0'},
      {name: '订单', key: 'order', url: '/pages/bills/cooperation/order/order', height: '0'},
      {name: '出货单', key: 'warehouse', url: '/pages/bills/cooperation/delivery/delivery', height: '0'},
      {name: '运单', key: 'transport', url: '/pages/bills/cooperation/waybill/waybill', height: '0'},
      {name: '验收单', key: 'acceptance', url: '/pages/bills/cooperation/acceptance/acceptance', height: '0'},
      {name: '结算单', key: 'settlement', url: '/pages/bills/cooperation/settlement/settlement', height: '0'},
      {name: '发票', key: 'invoice', url: '/pages/bills/cooperation/invoice/invoice', height: '0'},
      {name: '支付', key: 'payment', url: '/pages/bills/cooperation/payment/payment', height: '0'}
    ]
  },
  onLoad: function (e) {
    const that = this
    let {contract, detail} = that.data
    contract.name = e.title
    that.setData({contract})
    let str = e.title.length > 11 ? e.title.substring(0, 9) + '...' : e.title
    wx.setNavigationBarTitle({title: str})
    wx.request({
      url: $.prod + '/operator/coconfirm/link',
      method: 'GET',
      header: {'Auth-Token': wx.getStorageSync('token')},
      data: {confirmId: e.id},
      success: function (res) {
        if (res.data.code === 200) {
          res.data.data.detail.order.forEach((val) => {
            let list = val.value
            console.log(list)
            detail.order.push({name: list.name, id: list.orderId})
            if (list.orderPays.length !== 0) detail.deposit = detail.deposit.concat(list.orderPays)
            if (list.warehouses.length !== 0) detail.warehouse = detail.warehouse.concat(list.warehouses)
            if (list.transports.length !== 0) detail.transport = detail.transport.concat(list.transports)
            if (list.acceptances.length !== 0) detail.acceptance = detail.acceptance.concat(list.acceptances)
            if (list.settlements.length !== 0) detail.settlement = detail.settlement.concat(list.settlements)
            if (list.invoices.length !== 0) detail.invoice = detail.invoice.concat(list.invoices)
            if (list.settlementPayments.length !== 0) detail.payment = detail.payment.concat(list.settlementPayments)
          })
          that.setData({detail, contract: {name: res.data.data.detail.name, id: res.data.data.detail.id}, confirmId: e.id})
          // console.log(e)
        }
      }
    })
  },
  handleSlide (e) {
    const {len, item, index} = e.currentTarget.dataset
    const {types, detail} = this.data
    if (item.height === '0') {
      types.map((val, index) => {
        types[index].height = '0'
      })
      types[index].height = detail[types[index].key].length !== 0 ? len * 40 + 'px' : '120px'
    } else {
      types[index].height = '0'
    }
    this.setData({types})
  },
  handleDetail (e) {
    console.log(e)
    const {url, id} = e.currentTarget.dataset
    wx.navigateTo({url: url + '?id=' + id + '&confirmId=' + this.data.confirmId})
  }
})
