/**
 * Created by admin on 2017/3/6.
 */
var vm = new Vue({
  el: '#app',
  data: {
    limitNum: 3,
    productList: [],
    addressList: [],
    totalMoney: 0,
    checkAllFlag: false,
    curIndex: 0,
  },
  filters: {
    formatMoney: function (value) {//局部过滤器
      return "￥ " + value.toFixed(2);
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.creatView();
    });
  },
  computed: {
    filterAddress: function () {
      return this.addressList.slice(0, this.limitNum);
    }
  },
  methods: {
    creatView: function () {
      var _this = this;
      this.$http.get('data/data.json').then(function (res) {
        _this.productList = res.body.result.list;
      });
      this.$http.get('data/address.json').then(function (res) {
        _this.addressList = res.body.result.list;
      });
    },
    changeQuentity: function (item, type) {
      if (type > 0) {
        item.productQuentity++;
      } else {
        item.productQuentity--;
        if (item.productQuentity < 1) {
          item.productQuentity = 1;
        }
      }
      this.calcTotalMoney();
    },
    selectProduct: function (item) {
      if (typeof item.checked === 'undefined') {
        Vue.set(item, "checked", true);//全局注册不存在的属性
        // this.$set(item, "checked", true);//局部注册不存在的属性
      } else {
        item.checked = !item.checked;
      }
      this.calcTotalMoney();
    },
    checkAll: function (flag) {
      this.checkAllFlag = flag;
      var _this = this;
      this.productList.forEach(function (item, i) {
        if (typeof item.checked === 'undefined') {
          Vue.set(item, "checked", _this.checkAllFlag);
        } else {
          item.checked = _this.checkAllFlag;
        }
      });
      this.calcTotalMoney();
    },
    calcTotalMoney: function () {
      var _this = this;
      this.totalMoney = 0;
      this.productList.forEach(function (item, i) {
        if (item.checked) {
          _this.totalMoney += item.productPrice * item.productQuentity;
        }
      })
    },
    deleteItem: function (item) {
      // this.curProduct = item;
      // var index = this.productList.indexOf(item);
      // this.productList.splice(index, 1)
      this.productList.splice(item, 1)
    },
    setDefault: function (id) {
      this.addressList.forEach(function (address, index) {
        if (address.addressId === id) {
          address.isDefault = true;
        } else {
          address.isDefault = false;
        }
      })
    }
  },
});
Vue.filter("money", function (value, type) {//全局过滤器
  return value.toFixed(2) + type;
});