import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'

new Main()

wx.showShareMenu({
  withShareTicket:false,
  success:function(msg){
    console.log(msg)
  },
  fail:function(msg) {
    console.log(msg)
  },
  complete:function(msg) {
    console.log(msg)
  }
})
