const Home = require("../models/home");

// GET : Add Home Page
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to Airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

// GET : Edit Home Page
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  if (!editing) {
    return res.redirect("/host/host-home-list");
  }

  Home.findById(homeId)
    .then(home => {
      if (!home) {
        console.log("Home not found");
        return res.redirect("/host/host-home-list");
      }

      res.render("host/edit-home", {
        home: home,
        pageTitle: "Edit Your Home",
        currentPage: "host-homes",
        editing: true,
      });
    })
    .catch(err => {
      console.log("Error fetching home:", err);
      res.redirect("/host/host-home-list");
    });
};

// GET : Host Homes List
exports.getHostHomes = (req, res, next) => {
  Home.find()
    .then(registeredHomes => {
      res.render("host/host-home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Host Homes List",
        currentPage: "host-homes",
      });
    })
    .catch(err => console.log(err));
};

// POST : Add Home
exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, imageUrl, description } = req.body;

  const home = new Home({
    houseName: houseName,
    price: price,
    location: location,
    rating: rating,
    imageUrl: imageUrl,
    description: description
  });

  home
    .save()
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch(err => console.log(err));
};

// POST : Edit Home
exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, imageUrl, description } =
    req.body;
  Home.findById(id).then((home) => {
    home.houseName = houseName;
    home.location = location;
    home.price = price;
    home.rating = rating;
    home.imageUrl = imageUrl;
    home.description = description;

    home
      .save()
      .then(() => {
        res.redirect("/host/host-home-list");
      })
      .catch(err => console.log(err));
  })

};


// POST : Delete Home
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch(err => {
      console.log("Error deleting home:", err);
      res.redirect("/host/host-home-list");
    });
};
