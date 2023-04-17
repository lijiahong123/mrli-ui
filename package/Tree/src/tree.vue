<template>
  <div class="l-tree">
    <template v-if="treeList">
      <div v-for="node in treeList" :key="node[nodeKey]" :style="{ paddingLeft: getIndent(node) }">
        <!-- 小三角 -->
        <LIcon class="tree-left-icon" :name="getLeftIconName(node)" @click.stop="nodeExpanOrContract(node)" />
        <!-- 带复选框 -->
        <LCheckbox :disabled="node._disabled" v-model="node._checked" :indeterminate="node._indeterminate"
          @change="changeNodeChecked($event, node)" v-if="showCheckbox">
          {{ node[props.label] }}
        </LCheckbox>

        <!-- 不带复选框样式 -->
        <span v-else>{{ node[props.label] }}</span>
      </div>
    </template>
    <!-- 无数据 -->
    <div v-else class="empty-text">{{ emptyText }}</div>
  </div>
</template>

<script>
import LIcon from '../../Icon/src/icon.vue'
import LCheckbox from '../../Checkbox/src/checkbox.vue'
export default {
  name: 'LTree',
  components: { LIcon, LCheckbox },
  props: {
    data: { // 数据源
      type: Array,
      required: true
    },
    props: { // 节点选项
      type: Object,
      default: () => ({
        label: 'name',
        children: 'children',
        disabled: false
      })
    },
    nodeKey: { // 每个树节点唯一标识
      type: String,
      required: true,
      dafault: 'id'
    },
    defaultExpandAll: { // 是否默认展开所有节点
      type: Boolean,
      default: false
    },
    showCheckbox: { // 节点是否可选
      type: Boolean,
      default: false
    },
    checkStrictly: { // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
      type: Boolean,
      default: false
    },
    defaultCheckedKeys: { // 默认勾选的节点的 key 的数组
      type: Array,
      dafault: () => []
    },
    defaultExpandedKeys: { // 默认展开的节点
      type: Array,
      default: () => []
    },
    accordion: { // 是否每次只打开一个同级树节点展开
      type: Boolean,
      default: false
    },
    indent: { // 相邻级节点间的水平缩进，单位为像素
      type: Number,
      default: 16
    },
    emptyText: {
      type: String,
      default: '无数据'
    }

  },
  data() {
    return {
      treeMap: {},
      treeList: null,
      checkedIds: []
    }
  },
  created() {
    this.treeMap = this.treeToMap(Object.freeze(this.data))
  },
  computed: {
    rootKeys() {
      return this.data.map(i => i[this.nodeKey])
    },
    getIndent() {
      return function (node) {
        const { _level = 1 } = node;
        return `${16 * _level}px`
      }
    },
    getLeftIconName() {
      return function (node) {
        const { _expand } = node;
        return _expand ? 'caret-bottom' : 'caret-right'
      }
    }
  },
  watch: {
    treeMap: {
      deep: true,
      handler(val) {
        this.mapToList(val)
      }
    },
  },
  methods: {
    // 将tree转为Map, 病添加必要的内部属性
    treeToMap(tree) {
      const { label, children, disabled } = this.props
      const nodeKey = this.nodeKey;
      const defaultExpandAll = this.defaultExpandAll;
      const defaultExpandedKeys = this.defaultExpandedKeys || [];
      const defaultCheckedKeys = this.defaultCheckedKeys || [];
      const treeMap = {};

      const arrayToMap = (tree, parentId = null, level = 0) => {
        for (let index = 0; index < tree.length; index++) {
          const node = tree[index];
          const key = node[nodeKey];
          let nodeObj = {
            [nodeKey]: key,
            parentId,
            [label]: node[label],
            _data: node,
            _expand: false,
            _level: level
          }

          // 默认展开逻辑
          if (defaultExpandAll || defaultExpandedKeys.includes(key)) {
            nodeObj._expand = true
          }

          // 禁用逻辑
          if (typeof disabled === "boolean") {
            nodeObj._disabled = disabled
          } else if (typeof disabled === "function") {
            let _disabled = disabled(node, treeMap[key])
            nodeObj._disabled = _disabled
          } else {
            throw new TypeError("disabled应该为Boolean或Function")
          }

          treeMap[key] = nodeObj;


          // 递归逻辑
          if (Array.isArray(node[children])) {
            treeMap[key].childIds = node[children].map(i => i[nodeKey])
            arrayToMap(node[children], key, level + 1)
          }
        }
      }
      arrayToMap(tree)
      // 1. 处理默认选中节点
      if (this.showCheckbox) {
        defaultCheckedKeys.forEach(id => {
          this.checkedNodeHandler(id, true, treeMap)
        })
      }
      // 2. 处理默认展开与折叠
      return treeMap
    },

    // 将map转为list(展示顺序)
    mapToList(val) {
      const list = [];
      const map2List = keys => {
        keys.forEach(k => {
          const node = val[k];
          list.push(node)
          if (node.childIds) map2List(node.childIds)
        })
      }
      map2List(this.rootKeys)
      this.treeList = list
    },

    // 折叠与收缩
    nodeExpanOrContract(node) {
      const nodeExpan = node._expand;

    },

    // 处理节点被选中或取消选中
    checkedNodeHandler(id, stat, treeMap = this.treeMap,) {
      // 若是父子节点相互关联则向上向下递归勾选
      if (this.checkStrictly === false) {
        // 勾选
        if (stat) {
          treeMap[id]._checked = stat
          treeMap[id]._indeterminate = false
          // 勾选子节点
          this.checkedAllChild(id, treeMap, true)
          // 勾选父节点
          this.checkedParentNode(id, treeMap, true)
        } else {
          treeMap[id]._checked = false
          treeMap[id]._indeterminate = false
          // 取消勾选子节点
          this.checkedAllChild(id, treeMap, false)
          // 取消勾选父节点
          this.checkedParentNode(id, treeMap, false)
        }

      } else {
        treeMap[id]._checked = stat
        treeMap[id]._indeterminate = false
      }

      this.$emit('')
    },

    // 向下递归处理子节点
    checkedAllChild(id, treeMap = this.treeMap, stat) {
      if (Array.isArray(treeMap[id].childIds)) {
        treeMap[id].childIds.forEach(childId => {
          treeMap[childId]._checked = stat;
          treeMap[childId]._indeterminate = false;
          this.checkedAllChild(childId, treeMap, stat)
        })
      }
    },

    // 向上递归处理父节点勾选
    checkedParentNode(id, treeMap = this.treeMap, stat) {
      if (treeMap[id].parentId === null) return
      // const pNode = treeMap[treeMap[id].parentId];
      if (stat) {
        // 是否所有兄弟节点都都勾选了
        if (treeMap[treeMap[id].parentId].childIds.every(subId => treeMap[subId]._checked)) {
          treeMap[treeMap[id].parentId]._checked = true
          treeMap[treeMap[id].parentId]._indeterminate = false
        } else {
          treeMap[treeMap[id].parentId]._checked = false
          treeMap[treeMap[id].parentId]._indeterminate = true
        }
      } else {
        if (
          // 有一个兄弟节点勾选或半选
          treeMap[treeMap[id].parentId].childIds.some(subId => treeMap[subId]._checked) ||
          treeMap[treeMap[id].parentId].childIds.some(subId => treeMap[subId]._indeterminate)
        ) {
          treeMap[treeMap[id].parentId]._checked = false
          treeMap[treeMap[id].parentId]._indeterminate = true
        } else {
          treeMap[treeMap[id].parentId]._checked = false
          treeMap[treeMap[id].parentId]._indeterminate = false
        }
      }
      this.checkedParentNode(treeMap[treeMap[id].parentId][this.nodeKey], treeMap, stat)
    },

    // 选中会者取消选中节点
    changeNodeChecked(stat, node) {
      const id = node[this.nodeKey]
      this.checkedNodeHandler(id, stat, this.treeMap)
      this.$emit('check-change', node, stat, id)
    },


  }
}
</script>

<style scoped lang="scss">
@import "../../access/base.scss";

.l-tree {
  user-select: none;

  .tree-left-icon {
    cursor: pointer;
    opacity: .7;
  }

  .empty-text {
    width: 100%;
    text-align: center;
    color: $--base-color;
    font-size: 16px;
  }
}
</style>