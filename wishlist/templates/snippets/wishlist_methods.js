getWishes: function() {
    this.loading = true;
    axios.get(this.wishAPIUrls[this.sortType])
        .then((response) => {
            this.wishes = response.data;
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
getWish: function(id) {
    this.loading = true;
    axios.get(`/api/wish/${id}/`)
        .then((response) => {
            this.currentWish = response.data;
            this.currentWish_image = response.data.image;
            this.getRecipe(id);
            $("#wish-detail-modal").modal('show');
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
getRecipe: function(wish_id) {
    this.loading = true;
    axios.get('/api/wish-list/recipe-by-wish/' + wish_id)
        .then((response) => {
            this.currentWish_recipes = response.data;
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
addWish: function() {
    let formData = new FormData();
    formData.append("title", this.newWish.title);
    if (this.newWish.image) {
        formData.append("image", this.newWish.image);
    }
    formData.append("note", this.newWish.note);

    this.loading = true;
    axios.post('/api/wish/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            this.loading = false;
            if (this.newWish_recipe.url) {
                this.newWish_recipe.wish_id = response.data.id;
                this.addWishRecipe();
            } else {
                this.getWishes();
            }
            $("#add-wish-modal").modal('toggle');
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
addWishRecipe: function() {
    this.loading = true;
    axios.post('/api/wish-recipe/', this.newWish_recipe)
        .then((response) => {
            this.loading = false;
            this.getWishes();
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
updateWish: function() {
    let formData = new FormData();
    formData.append("title", this.currentWish.title);
    if (this.currentWish.image instanceof File) {
        formData.append("image", this.currentWish.image);
    }
    formData.append("note", this.currentWish.note);

    this.loading = true;
    axios.put(`/api/wish/${this.currentWish.id}/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            this.loading = false;
            this.currentWish = response.data;
            this.updateRecipe();
            $("#edit-wish-modal").modal('toggle');
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
updateRecipe: function() {
    this.loading = true;
    this.currentWish_recipes.forEach(function(recipe) {
        console.log(recipe);
        console.log(recipe.wish_id);
        axios.put(`/api/wish-recipe/${recipe.id}/`, recipe)
        .then((response) => {
            this.loading = false;
            this.getWishes();
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
    });
    this.getWishes();
},
deleteWish: function() {
    this.loading = true;
    axios.delete(`/api/wish/${this.currentWish.id}/`)
        .then((response) => {
            this.loading = false;
            this.getWishes();
            $("#delete-wish-modal").modal('toggle');
            $("#wish-detail-modal").modal('toggle');
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
processWishFile: function(filelist, action) {
    if (!filelist.length) return;

    if (action == "add") {
        this.newWish.image = filelist[0];
    } else if (action == "edit") {
        this.currentWish.image = filelist[0];
        const data = URL.createObjectURL(filelist[0]);
        this.currentWish_image = data;
    }
},
openEditModal: function() {
    $("#wish-detail-modal").modal('toggle');
    $("#edit-wish-modal").modal('show');
},