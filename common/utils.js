export default {

  /**
   * Find an item by index
   * @param {Array} items The array of items to search through
   * @param {number|string} index The numeric index to find by
   */
  findByIndex(items, index) {
    index = parseInt(index)
    return items[index]
  },

  /**
   * Find an item by key
   * @param {Array<Object>} items Array of objects that may or may not contain `key` properties to search by
   * @param {string|number} key The key to search by
   */
  findByKey(items, key) {
    return items.find(item => item && item.key && item.key === key)
  },

  /**
   * Find an item by value
   * @param {*} items Array of objects that contain `value` property
   * @param {*} value The value to search by
   */
  findByValue(items, value) {
    return items.find(item => {
      if(!item || !item.value) return false

      if(typeof value === 'object' && typeof item.value === 'object') {
        // Compare as json
        return JSON.stringify(value) === JSON.stringify(item.value)
      } else if (typeof value === 'symbol' && typeof item.value === 'symbol') {
        // Compare as stringified symbol
        return value.toString() === item.value.toString()
      } else {
        // Compare directly
        return value === item.value
      }
    })
  }
}