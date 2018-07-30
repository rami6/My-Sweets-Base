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
appendWishRecipeList: function() {
    if (this.newWish_recipes.slice(-1)[0].url) {
        this.newWish_recipes.push({ 'wish_id': null, 'link_title': "Recipe", 'url': null });
    }
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
            if (this.newWish_recipes[0].url) {
                this.addWishRecipes(response.data.id);
            } else {
                this.getWishes();
            }
            this.newWish = { 'title': null, 'note': "", 'image': null };
            document.getElementById('newWish_image').value = null;
            $("#add-wish-modal").modal('toggle');
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
addWishRecipes: function(wish_id) {
    this.loading = true;
    for (i in this.newWish_recipes) {
        this.newWish_recipes[i].wish_id = wish_id;
         axios.post('/api/wish-recipe/', this.newWish_recipes[i])
        .then((response) => {
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
    }
    this.getWishes();
    this.newWish_recipes = [{ 'wish_id': null, 'link_title': "Recipe", 'url': null }];
},
appendCurrentWishRecipeList: function() {
    this.currentWish_new_recipes.push({ 'wish_id': null, 'link_title': "Recipe", 'url': null });
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
            this.updateWishRecipe();
            this.addCurrentWishRecipes();
            $("#edit-wish-modal").modal('toggle');
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
     document.getElementById('currentWish_image').value = null;
},
updateWishRecipe: function() {
    this.loading = true;
    this.currentWish_recipes.forEach(function(recipe) {
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
addCurrentWishRecipes: function() {
    this.loading = true;
    for (i in this.currentWish_new_recipes) {
        this.currentWish_new_recipes[i].wish_id = this.currentWish.id;
         axios.post('/api/wish-recipe/', this.currentWish_new_recipes[i])
        .then((response) => {
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
    }
    this.getWishes();
    this.currentWish_new_recipes = [];
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
        if (filelist[0].size > 5242880) {
            document.getElementById('wish-add-image-error').innerHTML = "Please upload smaller file. Max: 5MB";
            return;
        } else {
            document.getElementById('wish-add-image-error').innerHTML = "";
        }
        this.newWish.image = filelist[0];
    } else if (action == "edit") {
        if (filelist[0].size > 5242880) {
            document.getElementById('wish-edit-image-error').innerHTML = "Please upload smaller file. Max: 5MB";
            return;
        } else {
            document.getElementById('wish-edit-image-error').innerHTML = "";
        }
        this.currentWish.image = filelist[0];
        const data = URL.createObjectURL(filelist[0]);
        this.currentWish_image = data;
    }
},
openEditModal: function() {
    $("#wish-detail-modal").modal('toggle');
    $("#edit-wish-modal").modal('show');
},
setDeletedWishRecipe: function(recipe) {
    this.deleted_wish_recipe = recipe;
},
deleteWishRecipe: function() {
    axios.delete(`/api/wish-recipe/${this.deleted_wish_recipe.id}/`)
        .then((response) => {
            this.loading = false;
            this.getWishRecipe
            $("#delete-wish-recipe-modal").modal('toggle');
            $(`#wishRecipe-${this.deleted_wish_recipe.id}`).toggle();
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
searchWishes: function() {
    if (this.word != null && this.word != "") {
        this.loading = true;
        axios.get(this.wishAPIUrls[this.sortType] + '/?search=' + this.word)
            .then((response) => {
                this.wishes = response.data;
                this.loading = false;
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
    } else {
        this.getWishes();
    }
},