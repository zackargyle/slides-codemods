import preloader from "spectacle/lib/utils/preloader";

const images = {
  ast: {
    explorer: require('../assets/images/ast-explorer.png'),
    parsed: require('../assets/images/ast-parsed.png'),
    preparsed: require('../assets/images/ast-preparsed.png'),
    tokenized: require('../assets/images/ast-tokenized.png'),
    types: require('../assets/images/ast-types.png'),
    vizualization: require('../assets/images/tree-viz.png'),
  },
  bio: require("../assets/images/bio.png"),
  burningBook: require("../assets/images/burning-book.jpg"),
  icon: {
    github: require('../assets/images/icon-github.png'),
    medium: require('../assets/images/icon-medium.png'),
    twitter: require('../assets/images/icon-twitter.png')
  },
  gif: {
    impossible: require("../assets/images/impossible.gif"),
    sick: require("../assets/images/feeling-sick.gif"),
    notReady: require("../assets/images/not-ready.gif"),
    tooMuch: require("../assets/images/too-much.gif"),
    wtf: require("../assets/images/wtf.gif"),
  },
  halloween: require("../assets/images/halloween.jpg"),
  suit: require("../assets/images/suit.jpg"),
};

preloader(images);
preloader(images.ast);
preloader(images.gif);
export default images;
