'use strict';

const demoReviews = [
  /*********************** 1. Frasier’s Queen Anne Condo ***********************/
  { // Niles reviews Frasier’s
    spotId: 1,
    userId: 3,
    review: 'What a quaint little home this is! The host did an excellent job of filling the space with eccentric pieces! I applaud his attempt at providing a refined living space for his guests. Bravo!',
    stars: 4,
  },
  { // Roz reviews Frasier's
    spotId: 1,
    userId: 5,
    review: "Lots of beige",
    stars: 4,
  },
  { // Lilith reviews Frasier's
    spotId: 1,
    userId: 7,
    review: 'The host did a wonderful job. He has some beautiful things.',
    stars: 3, // Prev: 3.5
  },
  { // Gil reviews Frasier's
    spotId: 1,
    userId: 8,
    review: "What a stunning apartment! The palate is pure subtle elegance. The detailing -- well, it's inspired. And the furnishings: simply delectable.",
    stars: 4,
  },


  /*********************** 2. Niles' Medina Mansion ***********************/
  { // Frasier reviews Niles'
    spotId: 2,
    userId: 2,
    review: 'A perfectly acceptable lodging, should you ever find yourself in need of one.',
    stars: 3,
  },
  { // Gertrude reviews Niles'
    spotId: 2,
    userId: 11,
    review: "don't bother wasting yer money 'ere. The hosts are couple of stuck up phony art lovers who keep all their good liquor locked away from their payin' guests. Yer be'er off staying somewhere halfway decent like me flat in Eastlake",
    stars: 1,
  },


  /*********************** 3. Daphne's Belltown Loft ***********************/
  { // Niles reviews Daphne’s
    spotId: 3,
    userId: 3,
    review: "This is without a doubt the most magnificent home you will ever lay your eyes on, and it's hosted by an absolute goddess that the gods have deigned to bestow on us mere men. Book a stay at this place, only if you feel you are worthy of her presence.",
    stars: 5,
  },
  { // Roz reviews Daphne's
    spotId: 3,
    userId: 5,
    review: "My girlfriends and I just had the best time here! The host took such good care of us, and there were so many things to do in the area! Great place for a girl's night out - definitely comin' here again",
    stars: 5,
  },

  /*********************** 4. Roz's Ballard Apartment ***********************/
  { // Noel reviews Roz's
    spotId: 4,
    userId: 9,
    review: '“Sharing an orbit with God is no small experience.” — Deanna Troi',
    stars: 5,
  },
  { // Frasier reviews Roz's
    spotId: 4,
    userId: 2,
    review: 'A delightful home, and the decorating motif was certainly ... courageous',
    stars: 5,
  },
  { // Daphne reviews Roz’s
    spotId: 4,
    userId: 4,
    review: 'I had the loveliest time at Ballard. The host even stocked the fridge with my favourite biscuits from back home. The whole experience brought me right back to me childhood in Manchester. As my Grammy Moon used to say, "Fish, chips and peas with pea wet"!',
    stars: 5,
  },
  { // Bulldog reviews Roz's
    spotId: 4,
    userId: 10,
    review: 'not bad . wouldve given this place another star if the host was willing to make my stay a little more "comfortable" if you get my meaning !',
    stars: 4,
  },
  { // Niles reviews Roz's
    spotId: 4,
    userId: 3,
    review: "Well, there are just so many things that could be said about this place - and even more about its host. Certainly offbeat and filled with the most curious nicknacks. If I hadn't known any better, I would've thought I was in a flea market!",
    stars: 2,
  },


  /*********************** 5. Martin's Ballard Apartment ***********************/
  { // Roz reviews Martin’s
    spotId: 5,
    userId: 5,
    review: "This was one the cutest places I've stayed at in a while, and it's in the perfect location. Lots of great restaurants and bars, and I even found a cute little park for my daughter to play in. Definitely recommend to everyone, and definitely coming back.",
    stars: 5, // Prev: 4.5
  },
  { // Gertrude reviews Martin's
    spotId: 5,
    userId: 11,
    review: "host was a bit of a charmer, that one. I just wish he didn't play so hard to get 😘",
    stars: 5,
  },

  /*********************** 6. Lilith's South Lake Union Suite ***********************/
  { // Frasier reviews Lilith's
    spotId: 6,
    userId: 2,
    review: "Simply superb! You'd be hard-pressed to find a better place to stay in Seattle.",
    stars: 5,
  },
  { // Niles reviews Lilith's
    spotId: 6,
    userId: 3,
    review: 'A stunning place in an idyllic location - the host certainly has exquisite taste!',
    stars: 5,
  },


  /*********************** 7. Gil's Capitol Hill Abode ***********************/
  { // Frasier reviews Gil's
    spotId: 7,
    userId: 2,
    review: "This place is quite a find! It's in a vibrant neighborhood and the host certainly has a taste for the finer things!",
    stars: 5,
  },
  { // Roz reviews Gil's
    spotId: 7,
    userId: 4,
    review: "This place was fabulous alright - a little too fabulous, if you ask me. I would've felt unwelcome and out-of-place had it not been for the wine basket the host left for our stay",
    stars: 4,
  },


  /*********************** 8. Noel's Chinatown-International Room ***********************/
  { // Frasier reviews Noel's
    spotId: 8,
    userId: 2,
    review: "The host has bit of a quirky personality, but I could tell he tried his best to make us feel welcome. And for that, I thank his hospitality.",
    stars: 3,
  },
  { // Roz reviews Noel's
    spotId: 8,
    userId: 5,
    review: "The host was kind of a creep, but I guess the stay wasn't that bad",
    stars: 2,
  },


  /*********************** 9. Bulldog's SoDo Shared Space ***********************/
  { // Frasier reviews Bulldog's
    spotId: 9,
    userId: 2,
    review: 'Charming.',
    stars: 2,
  },
  { // Roz reviews Bulldog's
    spotId: 9,
    userId: 5,
    review: "Ugh. This place is DISGUSTING. I don't know why I even bothered staying here. The room was a total mess and the host kept hitting on me the entire time I was there. Save yourself the headache and STAY SOMEWHERE ELSE.",
    stars: 1,
  },


  /*********************** 10. Gertrude's Eastlake Flat ***********************/
  { // Daphne reviews Gertrude's
    spotId: 10,
    userId: 4,
    review: "It was such a treat for us to stay in this home. We can't thank the host enough for her generosity!",
    stars: 5,
  },
  { // Niles reviews Gertrude's
    spotId: 10,
    userId: 3,
    review: 'What a lovely home this was! And the host was like no other. In fact, the whole experience brought to mind visions of my own home the moment we arrived!',
    stars: 5,
  },
]

let spotIds = [];
demoReviews.forEach(review => spotIds.push(review.spotId))

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Reviews',
      demoReviews,
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      'Reviews',
      { spotId: { [Op.in]: spotIds } },
      {},
    )
  }
};
