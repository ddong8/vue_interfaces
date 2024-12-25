<template>
  <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"/>
</template>

<script>
import Icons from '_c/icons'
export default {
  name: 'CommonIcon',
  components: { Icons },
  props: {
    type: {
      type: String,
      default: '',  // 添加默认值，移除 required
      validator: function(value) {
        return typeof value === 'string'  // 简化验证器
      }
    },
    color: String,
    size: Number
  },
  computed: {
    iconType () {
      if (!this.type) return 'Icon'; // 添加默认返回值
      return this.type.indexOf('_') === 0 ? 'Icons' : 'Icon'
    },
    iconName () {
      if (!this.type) return ''; // 添加默认返回值
      return this.iconType === 'Icons' ? this.getCustomIconName(this.type) : this.type
    },
    iconSize () {
      return this.size || (this.iconType === 'Icons' ? 12 : undefined)
    },
    iconColor () {
      return this.color || ''
    }
  },
  methods: {
    getCustomIconName (iconName) {
      return iconName.slice(1)
    }
  }
}
</script>

<style>

</style>
