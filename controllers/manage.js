'use strict'

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function(router){
router.get('/', function(req,res){
  res.render('manage/index');
});

router.get('/books', function(req ,res){
  Book.find({}, function(err, books){
   if(err){
     console.log(err);
   }
   var model = {
     books: books
   }
   res.render('manage/books/index', model);
  });
});


router.get('/books/add',function(req,res){
  Category.find({},function(err,categories){
    if(err){
    console.log(err);
  }
    var model={
      categories:categories
    }
    res.render('manage/books/add',model);
  });
});

router.post('/books',function(req,res){
  var title = req.body.title && req.body.title.trim();
  var category = req.body.category && req.body.category.trim();
  var author = req.body.author && req.body.author.trim();
  var publisher = req.body.publisher && req.body.publisher.trim();
  var price = req.body.price && req.body.price.trim();
  var description = req.body.description && req.body.description.trim();
  var cover = req.body.cover && req.body.cover.trim();

  if(title=='' || price==''){
    req.flash('error',"please fill all the required fields");

    res.location('/manage/books/add');
    res.redirect('/manage/books/add');
  }
   if(isNaN(price)){
     req.flash('Price must be a number');
     res.location('/manage/books/add');
     res.redirect('/manage/books/add');
   }

   var newBook = new Book({
     title:title,
     category:category,
     description:description,
     author:author,
     publisher:publisher,
     cover:cover,
     price:price
   });

newBook.save(function(err){
  if(err){
    console.log('save error',err);
  }
  //req.flash('success',"Book Added");
  res.location('/manage/books');
  res.redirect('/manage/books');

});
});

// updating a book ---load form
router.get('/books/edit/:id', function(req ,res){
  Category.find({},function(err,categories){
    Book.findOne({_id:req.params.id}, function(err,book){
      if(err){
        console.log(err);
      }
      var model= {
        book:book,
        categories:categories
      };
        res.render('manage/books/edit',model);
    });
  });
});

//post update

router.post('/books/edit/:id',function(req,res){
  var title = req.body.title && req.body.title.trim();
  var category = req.body.category && req.body.category.trim();
  var author = req.body.author && req.body.author.trim();
  var publisher = req.body.publisher && req.body.publisher.trim();
  var price = req.body.price && req.body.price.trim();
  var description = req.body.description && req.body.description.trim();
  var cover = req.body.cover && req.body.cover.trim();

   Book.update({_id: req.params.id},{
     title:title,
     category:category,
     description:description,
     author:author,
     publisher:publisher,
     cover:cover,
     price:price
   },function(err){
     if(err){
       console.log('update error',err);
     }
  req.flash('success',"Book updated");
  res.location('/manage/books');
  res.redirect('/manage/books');
   });
});


// delete books..post request is made
router.post('/books/delete/:id',function(req,res){
  Book.remove({_id:req.params.id},function(err){
    if(err){
      console.log(err);
    }
    req.flash('success',"Book Deleted");
    res.location('/manage/books');
    res.redirect('/manage/books');
  });
});

//fetching all categories from database display in index
router.get('/categories', function(req ,res){
Category.find({},function(err,categories){
  if(err){
    console.log(err);
  }
  var model ={
    categories:categories
  };
  res.render('manage/categories/index',model);
});
});

//direct to add category page
router.get('/categories/add',function(req,res){
    res.render('manage/categories/add');
  });

// add a new category
router.post('/categories',function(req,res){
  var name= req.body.name && req.body.name.trim();
   var newCategory = new Category({
     name:name
   });
newCategory.save(function(err){
  if(err){
    console.log('save error',err);
   }
  //req.flash('success',"Book Added");
  res.location('/manage/categories');
  res.redirect('/manage/categories');
    });
});

// edit category form
router.get('/categories/edit/:id',function(req ,res){
  Category.findOne({_id:req.params.id},function(err,category){
     if(err){
      console.log(err);
     }
     var model={
       category:category
     };
     res.render('manage/categories/edit',model);
  });
});

// edit category
router.post('/categories/edit/:id',function(req,res){
  var name = req.body.name && req.body.name.trim();
   Category.update({_id: req.params.id},{
     name:name
   },function(err){
     if(err){
       console.log('update error',err);
     }
  //req.flash('success',"Category updated");
  res.location('/manage/categories');
  res.redirect('/manage/categories');
   });
});

//delete category
router.post('/categories/delete/:id',function(req,res){
  Category.remove({_id:req.params.id},function(err){
    if(err){
      console.log(err);
    }
    res.location('/manage/categories');
    res.redirect('/manage/categories');
  });
});



}
