getWorks: function() {
    this.loading = true;
    axios.get(this.workAPIUrls[this.sortType])
        .then((response) => {
            this.works = response.data;
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
getWork: function(id) {
    this.loading = true;
    axios.get(`/api/work/${id}/`)
        .then((response) => {
            this.currentWork = response.data;
            this.currentWork_image = response.data.image;
            this.getWorkRecipe(id);
            $("#work-detail-modal").modal('show');
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
getWorkRecipe: function(work_id) {
    this.loading = true;
    axios.get('/api/works/recipe-by-work/' + work_id)
        .then((response) => {
            this.currentWork_recipes = response.data;
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
appendWorkRecipeList: function() {
    if (this.newWork_recipes.slice(-1)[0].url) {
        this.newWork_recipes.push({'work_id': null, 'link_title': "Recipe", 'url': null});
    }
},
addWork: function() {
    let formData = new FormData();
    formData.append("title", this.newWork.title);
    if (this.newWork.image) {
        formData.append("image", this.newWork.image);
    }
    formData.append("made_date", this.newWork.made_date);
    formData.append("note", this.newWork.note);

    this.loading = true;
    axios.post('/api/work/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            this.loading = false;
            if (this.newWork_recipes[0].url) {
                this.addWorkRecipes(response.data.id);
            } else {
                this.getWorks();
            }
            this.newWork = { 'title': null, 'made_date': this.getToday(), 'note': "", 'image': null };
            document.getElementById('newWork_image').value = null;
            $("#add-work-modal").modal('toggle');
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
addWorkRecipes: function(work_id) {
    this.loading = true;
    for (i in this.newWork_recipes) {
        this.newWork_recipes[i].work_id = work_id;
         axios.post('/api/recipe/', this.newWork_recipes[i])
        .then((response) => {
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
    }
    this.getWorks();
    this.newWork_recipes = [{ 'work_id': null, 'link_title': "Recipe", 'url': null }];
},
appendCurrentWorkRecipeList: function() {
    this.currentWork_new_recipes.push({'work_id': null, 'link_title': "Recipe", 'url': null});
},
updateWork: function() {
    let formData = new FormData();
    formData.append("title", this.currentWork.title);
    if (this.currentWork.image instanceof File) {
        formData.append("image", this.currentWork.image);
    }
    formData.append("made_date", this.currentWork.made_date);
    formData.append("note", this.currentWork.note);

    this.loading = true;
    axios.put(`/api/work/${this.currentWork.id}/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            this.loading = false;
            this.currentWork = response.data;
            this.updateWorkRecipe();
            this.addCurrentWorkRecipes();
             $("#edit-work-modal").modal('toggle');
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
    document.getElementById('currentWork_image').value = null;
},
updateWorkRecipe: function() {
    this.loading = true;
    this.currentWork_recipes.forEach(function(recipe) {
        axios.put(`/api/recipe/${recipe.id}/`, recipe)
        .then((response) => {
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
    });
},
addCurrentWorkRecipes: function() {
    for (i in this.currentWork_new_recipes) {
        this.currentWork_new_recipes[i].work_id = this.currentWork.id;
         axios.post('/api/recipe/', this.currentWork_new_recipes[i])
        .then((response) => {
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
    }
    this.getWorks();
    this.currentWork_new_recipes = [];
},
deleteWork: function() {
    this.loading = true;
    axios.delete(`/api/work/${this.currentWork.id}/`)
        .then((response) => {
            this.loading = false;
            this.getWorks();
            $("#delete-work-modal").modal('toggle');
            $("#work-detail-modal").modal('toggle');
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
processWorkFile: function(filelist, action) {
    if (!filelist.length) return;

    if (action == "add") {
        this.newWork.image = filelist[0];
    } else if (action == "edit") {
        this.currentWork.image = filelist[0];
        const data = URL.createObjectURL(filelist[0]);
        this.currentWork_image = data;
    }
},
openEditWorkModal: function() {
    $("#work-detail-modal").modal('toggle');
    $("#edit-work-modal").modal('show');
},
setDeletedWorkRecipe: function(recipe) {
    this.deleted_work_recipe = recipe;
},
deleteWorkRecipe: function() {
    axios.delete(`/api/recipe/${this.deleted_work_recipe.id}/`)
        .then((response) => {
            this.loading = false;
            this.getWorkRecipe
            $("#delete-work-recipe-modal").modal('toggle');
            $(`#recipe-${this.deleted_work_recipe.id}`).toggle();
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
