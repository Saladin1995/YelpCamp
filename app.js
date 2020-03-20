var express =           require("express"),
    app =               express(),
    bodyParser =        require("body-parser"),
    mongoose =          require("mongoose"),
    flash =             require("connect-flash"),
    passport =          require("passport"),
    LocalStrategy =     require("passport-local"),
    methodOverride =    require("method-override"),
    Campground =        require("./models/campground"),
    Comment =           require("./models/comment"),
    User =              require("./models/user"),
    seedDB =            require("./seeds");

var commentRoutes =     require("./routes/comment"),
    campgroundRoutes =  require("./routes/campgrounds"),
    indexRoutes =       require("./routes/index");


mongoose.connect(process.env.DATABASEURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* mongoose.connect("mongodb+srv://TrusT1995:Hajat1412@cluster0-ywhp8.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}), function(err){
    if(err){
        console.log(err.message);
    };
};
 */

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Quki is smelling worst",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//Requring routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);





//.........................................................................................................................................
//.........................................................................................................................................
//.........................................................................................................................................
//.........................................................................................................................................
//.........................................................................................................................................
//.........................................................................................................................................
//.........................................................................................................................................

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});