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
            this.newWork_image = null;
            document.getElementById('newWork_image').value = null;
            $("#add-work-modal").modal('toggle');
            $('#newWork_image_view').css('transform', 'rotate(0deg)');
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
    if (action == "add") {
        if (!filelist.length) {
            this.newWork_image = null;
            $('#newWork_image_view').css('transform', 'rotate(0deg)');
            return;
        }

        if (filelist[0].size > 5242880) {
            document.getElementById('work-add-image-error').innerHTML = "Please upload smaller file. Max: 5MB";
            return;
        } else {
            document.getElementById('work-add-image-error').innerHTML = "";
        }
        this.newWork.image = filelist[0];

        this.rotateWorkImage(this.newWork.image, '#newWork_image_view');

        const data = URL.createObjectURL(this.newWork.image);
        this.newWork_image = data;
    } else if (action == "edit") {
        if (!filelist.length) {
            return;
        }
        if (filelist[0].size > 5242880) {
            document.getElementById('work-edit-image-error').innerHTML = "Please upload smaller file. Max: 5MB";
            return;
        } else {
            document.getElementById('work-edit-image-error').innerHTML = "";
        }
        this.currentWork.image = filelist[0];

        this.rotateWorkImage(this.currentWork.image, '#currentWork_image_view');

        const data = URL.createObjectURL(this.currentWork.image);
        this.currentWork_image = data;
    }
},
rotateWorkImage: function(image, view_id) {
    let rotation = {
      1: 'rotate(0deg)',
      3: 'rotate(180deg)',
      6: 'rotate(90deg)',
      8: 'rotate(270deg)'
    };

    function _arrayBufferToBase64( buffer ) {
      let binary = '';
      let bytes = new Uint8Array( buffer );
      let len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] )
      }
      return window.btoa( binary );
    }

    let orientation = function(file, callback) {
      let fileReader = new FileReader();
      fileReader.onloadend = function() {
        let base64img = "data:"+file.type+";base64," + _arrayBufferToBase64(fileReader.result);
        let scanner = new DataView(fileReader.result);
        let idx = 0;
        let value = 1; // Non-rotated is the default
        if(fileReader.result.length < 2 || scanner.getUint16(idx) != 0xFFD8) {
          if(callback) {
            callback(base64img, value);
          }
          return;
        }
        idx += 2;
        let maxBytes = scanner.byteLength;
        while(idx < maxBytes - 2) {
          let uint16 = scanner.getUint16(idx);
          idx += 2;
          switch(uint16) {
            case 0xFFE1:
              let exifLength = scanner.getUint16(idx);
              maxBytes = exifLength - idx;
              idx += 2;
              break;
            case 0x0112:
              value = scanner.getUint16(idx + 6, false);
              maxBytes = 0;
              break;
          }
        }
        if(callback) {
          callback(base64img, value);
        }
      };
      fileReader.readAsArrayBuffer(file);
    };

    if(image) {
      orientation(image, function(base64img, value) {
        let rotated = $(view_id).attr('src', base64img);
        if(value) {
          rotated.css('transform', rotation[value]);
        }
      });
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
searchWorks: function() {
    if (this.word != null && this.word != "") {
        this.loading = true;
        axios.get(this.workAPIUrls[this.sortType] + '/?search=' + this.word)
            .then((response) => {
                this.works = response.data;
                this.loading = false;
            })
            .catch((err) => {
                this.loading = false;
                console.log(err);
            })
    } else {
        this.getWorks();
    }
},
