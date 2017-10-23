import Vue from 'vue'
import { ComponentOptions } from 'vue'
import { pick } from '../utils'

export default {
  created () {
    const hook = this.$options.propsUpdated
    if (typeof hook !== 'function') return

    const propKeys = Object.keys(this.$props)
    let prevProps = pick(this, propKeys)
    let vm = this
    this.$watch(() => {
      // check the update of any props
      const isUpdated = propKeys.reduce((acc, key) => {
        return acc || prevProps[key] !== (vm as any)[key]
      }, false)

      // return previous props to prevent calling propsUpdated hook
      if (!isUpdated) return prevProps

      // create new object for updated props
      // and trigger propsUpdated hook
      prevProps = pick(this, propKeys)
      return prevProps
    }, hook)
  }
} as ComponentOptions<Vue>

