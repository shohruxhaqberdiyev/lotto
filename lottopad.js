Vue.component('lottopad', {
    props: ['tiles', 'totalCombinations', 'totalPrice', 'index', 'lottomin'],
    data: () => {
        return {
            selfTiles: [],
            lotto: 36,
            lottoMax: 10,
        };
    },
    created(){
        this.selfTiles = this.tiles;
    },
    methods: {
        isChecked: function (c, d) {
            return !0 === d ? this.selfTiles.indexOf(c) : -1 !== this.selfTiles.indexOf(c)
        },
        clickSelected: function (c) {
            this.selfTiles.splice(c, 1)
        },
        selectRandom: function (c, d) {
            c < this.lottomin ? c = this.lottomin : c > this.lottoMax && (c = this.lottoMax), 'even' === d || 'odd' === d || 'top' === d || 'down' === d || (d = 'random');
            for (var f, e = []; e.length < c;)
                f = Math.floor(Math.random() * this.lotto) + 1, -1 < e.indexOf(f) || 'even' === d && 1 == f % 2 || 'odd' === d && 0 == f % 2 || 'top' === d && f >= this.lotto / 2 || 'down' === d && f <= this.lotto / 2 || (e[e.length] = f);
            this.selfTiles = e
        },
    },
    computed: {
        selectedCount: function () {
            return this.selfTiles.length
        },
        canSend: function () {
            return this.selectedCount >= this.lottomin && this.selectedCount <= this.lottoMax
        },
        generateRange: function () {
            return Array(this.lottoMax + 1 - this.lottomin).fill(this.lottomin).map(function (c, d) {
                return c + d
            })
        },
        ticketPrice: function () {
            if(this.lottomin === 5) {
                switch (this.selfTiles.length) {
                    case 5:return 3e3;
                    case 6:return 18e3;
                    case 7:return 63e3;
                    case 8:return 168e3;
                    case 9:return 378e3;
                    case 10:return 756e3;
                    default:return 0;
                }
            } else {
                switch (this.selfTiles.length) {
                    case 6:return 2e3;
                    case 7:return 18e3;
                    case 8:return 63e3;
                    case 9:return 168e3;
                    case 10:return 378e3;
                    default:return 0;
                }
            }
        },
        ticketCombination: function () {
            if(this.lottomin === 5) {
                switch (this.selfTiles.length) {
                    case 5:return 3/3;
                    case 6:return 18/3;
                    case 7:return 63/3;
                    case 8:return 168/3;
                    case 9:return 378/3;
                    case 10:return 756/3;
                    default:return 0;
                }
            } else {
                switch (this.selfTiles.length) {
                    case 5:return 3/3;
                    case 6:return 18/3;
                    case 7:return 63/3;
                    case 8:return 168/3;
                    case 9:return 378/3;
                    case 10:return 756/3;
                    default:return 0;
                }
            }
        }
    },
    watch: {
        lotto: function (c) {
            this.selfTiles = this.selfTiles.filter(function (d) {
                return d <= c
            })
        },
        selfTiles: function (tiles) {
            let data = {
                index: this.index,
                tiles: tiles,
                ticketPrice: this.ticketPrice,
                ticketCombination: this.ticketCombination,
            };
            this.$store.commit('setTiles', data)
        }
    },
    filters: {
        formatNumber: function (c) {
            return new Intl.NumberFormat().format(c)
        }
    },
    template: `
        <div class="columns">
            <div class="game-pad">
                <br>
                <br>
                <div class="container-pad">
                     Вы выбрали <b>{{selectedCount}}</b> цифр. Цена: <b class="ticket-price">{{ticketPrice | formatNumber}}</b> сум<br>
                </div>
                <br>
                <br>
                <div class="columns is-multiline is-gapless">
                    <div class="column is-2" v-for="(v,i) in lotto">
                        <label>
                            <p class="box notification has-text-centered"
                               :class="isChecked(v) ? 'is-success' : (selectedCount >= lottoMax ? 'is-disabled' : 'is-white')">
                                {{v}}
                                <input type="checkbox"
                                    :disabled="isChecked(v) !==true && selectedCount >= lottoMax"
                                    v-show="0"
                                    v-model="selfTiles"
                                    :value="v"
                                    :data-index="isChecked(v)===true ? isChecked(v,true) : false"/>
                            </p>
                        </label>
                    </div>
                </div>
                <div class="columns">
                    <div class="buttons">
                        <span
                            v-for="v in ['random', 'even', 'odd', 'top', 'down']"
                            @click.prevent="selectRandom(lottomin,v)"  class="button is-rounded ">
                            {{v}}
                        </span>
                    </div>
                </div>
            </div>
        </div>`
});