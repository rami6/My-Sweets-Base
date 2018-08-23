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
    $('#currentWish_image_view').css('transform', 'rotate(0deg)');
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
            this.newWish_image = null;
            document.getElementById('newWish_image').value = null;
            $('#newWish_image_view').css('transform', 'rotate(0deg)');
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
    axios.patch(`/api/wish/${this.currentWish.id}/`, formData, {
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
    if (action == "add") {
        if (!filelist.length) {
            this.newWish_image = null;
            $('#newWish_image_view').css('transform', 'rotate(0deg)');
            return;
        }

        if (filelist[0].size > 5242880) {
            document.getElementById('wish-add-image-error').innerHTML = "Please upload smaller file. Max: 5MB";
            return;
        } else {
            document.getElementById('wish-add-image-error').innerHTML = "";
        }
        this.newWish.image = filelist[0];

        this.rotateWishImage(this.newWish.image, '#newWish_image_view');

        const data = URL.createObjectURL(this.newWish.image);
        this.newWish_image = data;
    } else if (action == "edit") {
        if (!filelist.length) {
            return;
        }
        if (filelist[0].size > 5242880) {
            document.getElementById('wish-edit-image-error').innerHTML = "Please upload smaller file. Max: 5MB";
            return;
        } else {
            document.getElementById('wish-edit-image-error').innerHTML = "";
        }
        this.currentWish.image = filelist[0];

        this.rotateWishImage(this.currentWish.image, '#currentWish_image_view');

        const data = URL.createObjectURL(this.currentWish.image);
        this.currentWish_image = data;
    }
},
rotateWishImage: function(image, view_id) {
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