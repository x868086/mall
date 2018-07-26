
import Foot from 'components/Foot.vue';
let mixin = {
  filters: {
    fixnumber: function (value) {
      return value + '.00'
    }
  },
  components: {
    Foot: Foot,
  }
}

export  default mixin
