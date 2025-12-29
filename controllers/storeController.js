const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find()
    .then(registeredHomes => {
      res.render("store/index", {
        registeredHomes,
        pageTitle: "airbnb Home",
        currentPage: "index",
      });
    })
    .catch(err => console.log(err));
};


exports.getHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  })
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const favourites = await Favourite.getFavourites();
    const favouriteIds = favourites.map(fav => fav.homeId.toString());

    const allHomes = await Home.find();

    const favouriteHomes = allHomes.filter(home =>
      favouriteIds.includes(home._id.toString())
    );

    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    });
  } catch (err) {
    console.log("Error fetching favourites:", err);
    res.status(500).render("store/favourite-list", {
      favouriteHomes: [],
      pageTitle: "My Favourites",
      currentPage: "favourites",
      errorMessage: "Could not load favourites",
    });
  }
};


exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.homeId;

  const fav = new Favourite(homeId);

  fav.save()
    .then(result => {
      console.log("Favourite added:", result);
      res.redirect("/favourites");
    })
    .catch(err => {
      console.log("Error adding favourite:", err);
      res.redirect("/favourites");
    })
    .finally(() => {
      console.log("Add to favourite process complete");
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;

  Favourite.deleteById(homeId)
    .then(() => {
      res.redirect("/favourites");
    })
    .catch(error => {
      console.log("Error while removing from Favourite", error);
      res.redirect("/favourites");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId)
    .then(home => {
      if (!home) {
        console.log("Home not found");
        return res.redirect("/homes");
      }

      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    })
    .catch(err => {
      console.log("Error fetching home details:", err);
      res.redirect("/homes");
    });
};

