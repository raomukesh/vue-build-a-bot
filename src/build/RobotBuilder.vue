<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to cart</button>

    <div class="top-row">
      <div class="top part" :style="headBorderStyle">
        <div class="robot-name">
          {{selectedRobot.head.title}}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div>
        <img :src="selectedRobot.head.src" title="head"/>
        <button @click="selectPrevHead()" class="prev-selector">&#9668;</button>
        <button @click="selectNextHead()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftArm.src" title="left arm"/>
        <button @click="selectPrevLeftArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm()" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" title="Torsos"/>
        <button @click="selectPrevTorsos()" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorsos()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.src" title="right arm"/>
        <button @click="selectPrevRightArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightArm()" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" title="base"/>
        <button @click="selectPrevBaseHead()" class="prev-selector">&#9668;</button>
        <button @click="selectNextBaseHead()" class="next-selector">&#9658;</button>
      </div>
    </div>

    <div>
      <table>
        <tr>
          <th>Robot</th>
          <th>Cost</th>
        </tr>
        <tr v-for="(robot, index) in cart" :key="index">
          <td>{{robot.head.title}}</td>
          <td class="cost">{{robot.cost}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
    import availableParts from  "../data/parts.js"

    function getPreviousValueIndex(index, length){
      const depricatedIndex = index - 1;
      return depricatedIndex < 0 ? length - 1 : depricatedIndex;
    }

    function getNextValueIndex(index, length){
      const incrementedIndex = index - 1;
      return incrementedIndex < 0 ? length - 1 : incrementedIndex;
    }

    export default {
        name: 'RobotBuilder',
        data() {
          return {
            cart: [],
            availableParts,
            selectedHeadIndex: 0,
            selectedLeftArmIndex: 0,
            selectedTorsosIndex: 0,
            selectedRightArmIndex: 0,
            selectedBaseIndex: 0,
          }
        },
        computed: {
          headBorderStyle(){
            return {border: this.selectedRobot.head.onSale?
            '3px solid red' : '3px solid #aaa',
            };
          },
          selectedRobot() {
            return {
              head: availableParts.heads[this.selectedHeadIndex],
              leftArm: availableParts.arms[this.selectedLeftArmIndex],
              torso: availableParts.torsos[this.selectedTorsosIndex],
              rightArm: availableParts.arms[this.selectedRightArmIndex],
              base: availableParts.bases[this.selectedBaseIndex],
            }; 
          }
        },
        methods: {
          addToCart(){
            const robot = this.selectedRobot;
            const cost = robot.head.cost +
              robot.leftArm.cost +
              robot.torso.cost +
              robot.rightArm.cost +
              robot.base.cost;
            this.cart.push(Object.assign({}, robot, {cost}));
          },
          selectNextHead() {
            this.selectedHeadIndex = getNextValueIndex(this.selectedHeadIndex, availableParts.heads.length)
          },
          selectPrevHead() {
            this.selectedHeadIndex = getPreviousValueIndex(this.selectedHeadIndex, availableParts.heads.length)
          },
          selectNextLeftArm() {
            this.selectedLeftArmIndex = getNextValueIndex(this.selectedLeftArmIndex, availableParts.arms.length)
          },
          selectPrevLeftArm() {
            this.selectedLeftArmIndex = getPreviousValueIndex(this.selectedLeftArmIndex, availableParts.arms.length)
          },
          selectNextTorsos() {
            this.selectedTorsosIndex = getNextValueIndex(this.selectedTorsosIndex, availableParts.torsos.length)
          },
          selectPrevTorsos() {
            this.selectedTorsosIndex = getPreviousValueIndex(this.selectedTorsosIndex, availableParts.torsos.length)
          },
          selectNextRightArm() {
            this.selectedRightArmIndex = getNextValueIndex(this.selectedRightArmIndex, availableParts.arms.length)
          },
          selectPrevRightArm() {
            this.selectedRightArmIndex = getPreviousValueIndex(this.selectedRightArmIndex, availableParts.arms.length)
          },
          selectNextBaseHead() {
            this.selectedBaseIndex = getNextValueIndex(this.selectedBaseIndex, availableParts.bases.length)
          },
          selectPrevBaseHead() {
            this.selectedBaseIndex = getPreviousValueIndex(this.selectedBaseIndex, availableParts.bases.length)
          },
        },
    }
</script>


<style scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
} 
.part img {
  width:165px;
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;    
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;  
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;    
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name{
  position: absolute;
  text-align: center;
  top: -25px;
  width: 100%;
}
.sale{
  color: red;
}
.content{
  position: relative;
}
.add-to-cart{
  position: absolute;
  right: 30px;
  width: 220px;
  padding: 3px;
  font-size: 16px;
}
td, th{
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost{
  text-align: right
}
</style>