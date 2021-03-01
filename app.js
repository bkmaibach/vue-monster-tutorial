const getRandomValue = (min, max) => (Math.floor(Math.random() * (max - min)) + min)

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      battleLog: []
    }
  },
  methods: {
    attackMonster() {
      this.currentRound++
      const damage = getRandomValue(5, 12)
      this.monsterHealth -= damage
      this.battleLog.push(`You attack the monster for ${damage} damage`)
      this.attackPlayer()
    },
    attackPlayer() {
      const damage = getRandomValue(8, 15)
      this.playerHealth -= getRandomValue(8, 15)
      this.battleLog.push(`The monster attacks you for ${damage} damage`)
    },
    specialAttackMonster() {
      this.currentRound++
      const damage = getRandomValue(10, 25)
      this.monsterHealth -= damage
      this.battleLog.push(`You special attack the monster for ${damage} damage`)
      this.attackPlayer()
    },
    healPlayer() {
      this.currentRound++
      const health = getRandomValue(5, 20)
      this.playerHealth = Math.min(this.playerHealth + health, 100)
      this.battleLog.push(`You heal for ${health} health`)
      this.attackPlayer()
    },
    startNew() {
      this.playerHealth = 100
      this.monsterHealth = 100
      this.currentRound = 0
      this.winner = null
      this.battleLog = []
      this.battleLog.push(`Game start`)
    },
    surrender() {
      this.winner = 'monster'
      this.battleLog.push(`You surrender`)
    }
  },
  computed: {
    monsterBarStyles() {
      return this.monsterHealth <= 0 ? { width: '0%' } : { width: this.monsterHealth + '%' }
    },
    playerBarStyles() {
      return this.playerHealth <= 0 ? { width: '0%' } : { width: this.playerHealth + '%' }
    },
    mayUseSpecialAttack() {
      return this.currentRound %3 != 0
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // Draw condition
        this.winner = 'draw'
        this.battleLog.push('Game ends in a draw')
      } else if (value <= 0) {
        // Lose condition
        this.winner = 'monster'
        this.battleLog.push('Game ends in monster win')

      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // Draw condition
        this.winner = 'draw'
        this.battleLog.push('Game ends in a draw')
      } else if (value <= 0) {
        // Win condition
        this.winner = 'player'
        this.battleLog.push('Game ends in player win')
      }
    }
  }
})
app.mount("#game")