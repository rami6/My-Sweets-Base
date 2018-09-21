// This script is shared among dashboard and storage_top view.

axios.defaults.headers.common['X-CSRFToken'] = "{{ csrf_token }}";
axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
    el: '#vue-el-s',
    delimiters: ['${','}'],
    data: {
        ingredients: [],
        loading: false,
        currentIngredient: {},
        word: null,
        sortType: "expirationA",
        storageAPIUrl: null,
        storageAPIUrls:{ 'expirationA': '/api/storage/e-a', 'expirationD': '/api/storage/e-d', 'nameA': '/api/storage/n-a', 'nameD': '/api/storage/n-d' },
        newIngredient: { 'name': null, 'expiration_date': null },
    },
    mounted: function() {
        this.getIngredients();
        this.setDefaultValue();
        this.addFocusEvent();
    },
    methods: {
        getIngredients: function() {
            this.loading = true;
            axios.get(this.storageAPIUrls[this.sortType])
                .then((response) => {
                    this.ingredients = response.data;
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err);
                })
        },
        getIngredient: function(id, action) {
            this.loading = true;
            axios.get(`/api/ingredient/${id}/`)
                .then((response) => {
                    this.currentIngredient = response.data;
                    if (action == "edit") {
                        $("#edit-ingredient-modal").modal('show');
                    } else if (action == "delete") {
                        $("#delete-ingredient-modal").modal('show');
                    }
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err);
                })
        },
        searchIngredients: function() {
            if (this.word != null && this.word != "") {
                this.loading = true;
                axios.get(this.storageAPIUrls[this.sortType] + '/?search=' + this.word)
                    .then((response) => {
                        this.ingredients = response.data;
                        this.loading = false;
                    })
                    .catch((err) => {
                        this.loading = false;
                        console.log(err);
                    })
            } else {
                this.getIngredients();
            }
        },
        switchSort: function(th) {
            this.loading = true;
            if (th == "name") {
                if (this.sortType == "nameA") {
                    this.sortType = "nameD"
                } else {
                    this.sortType = "nameA"
                }
            } else if (th == "expiration") {
                if (this.sortType == "expirationA") {
                    this.sortType = "expirationD"
                } else {
                    this.sortType = "expirationA"
                }
            }
            this.getIngredients();
        },
        addIngredient: function(page) {
            if (this.newIngredient.expiration_date == "") {
                this.newIngredient.expiration_date = null;
            }
            this.loading = true;
            axios.post('/api/ingredient/', this.newIngredient)
                .then((response) => {
                    this.loading = false;
                    this.getIngredients();
                    this.newIngredient = {'name': null, 'expiration_date': this.getToday()};
                    if (page == "home") {
                        $("#add-ingredient-modal").modal('toggle');
                    }
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err);
                })
        },
        updateIngredient: function() {
            if (this.currentIngredient.expiration_date == "") {
                this.currentIngredient.expiration_date = null;
            }
            this.loading = true;
            axios.put(`/api/ingredient/${this.currentIngredient.id}/`, this.currentIngredient)
                .then((response) => {
                    this.loading = false;
                    this.currentIngredient = response.data;
                    this.getIngredients();
                    $("#edit-ingredient-modal").modal('toggle');
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err);
                })
        },
        deleteIngredient: function() {
            this.loading = true;
            axios.delete(`/api/ingredient/${this.currentIngredient.id}/`)
                .then((response) => {
                    this.loading = false;
                    this.getIngredients();
                    $("#delete-ingredient-modal").modal('toggle');
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err);
                })
        },
        getToday: function() {
            const toTwoDigits = num => num < 10 ? '0' + num : num;
            let today = new Date();
            let year = today.getFullYear();
            let month = toTwoDigits(today.getMonth() + 1);
            let day = toTwoDigits(today.getDate());
            return `${year}-${month}-${day}`;
        },
        setDefaultValue: function () {
            this.newIngredient.expiration_date = this.getToday();
        },
        addFocusEvent: function () {
            window.addEventListener("focus", this.getIngredients, false);
        },
        clearSearch: function () {
            if (this.word == null || this.word == "") {
                this.getIngredients();
            }
        }
    }
});