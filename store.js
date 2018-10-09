const store = new Vuex.Store({
    state: {
        tiles: [],
        totalCombinations : [],
        totalPrice : [],
    },
    mutations: {
        setTiles(state, data) {
            state.tiles[data.index] = data.tiles;
            state.totalPrice[data.index] = data.ticketPrice;
            state.totalCombinations[data.index] = data.ticketCombination;
        },
        addTile(state) {
            state.tiles.push([]);
            state.totalPrice.push([]);
            state.totalCombinations.push([]);
        },
        removeTile(state, index) {
            state.tiles.pop();
            state.totalPrice.pop();
            state.totalCombinations.pop();
        }
    }
});