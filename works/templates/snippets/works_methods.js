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
            if (this.newWork_Recipe.url) {
                this.newWork_Recipe.work_id = response.data.id;
                this.addWorkRecipe();
            } else {
                this.getWorks();
            }
            $("#add-work-modal").modal('toggle');
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
addWorkRecipe: function() {
    this.loading = true;
    axios.post('/api/recipe/', this.newWork_recipe)
        .then((response) => {
            this.loading = false;
            this.getWorks();
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
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
            this.updateRecipe();
            $("#edit-work-modal").modal('toggle');
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
},
updateRecipe: function() {
    this.loading = true;
    this.currentWork_recipes.forEach(function(recipe) {
        console.log(recipe);
        console.log(recipe.work_id);
        axios.put(`/api/recipe/${recipe.id}/`, recipe)
        .then((response) => {
            this.loading = false;
            this.getWorks();
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        })
    });
    this.getWorks();
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