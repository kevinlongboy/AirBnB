'use strict';

const demoReviews = [
  { // Niles reviews Daphne’s
    spotId: 3,
    userId: 2,
    review: 'Placeholder text: Niles reviews Daphne',
    stars: 5,
  },
  { // Frasier reviews Roz's
    spotId: 4,
    userId: 1,
    review: 'Quite a delightful home -- and the host\'s decorating motif was certainly ... "courageous"',
    stars: 5,
  },
  { // Niles reviews Roz's
    spotId: 4,
    userId: 2,
    review: 'Well, there are just so many things that could be said about this place - and even more that could be said about its host. Her overall style could only be described as "offbeat", and it would seem that she furnished her place with the most curiously odd nicknacks she must have acquired throughout her years. If I hadn\'t known any better, there were times where I would have thought I was in a flea market!',
    stars: 2,
  },
  { // Daphne reviews Roz’s
    spotId: 4,
    userId: 3,
    review: 'I had the loveliest time at Ballard. The host was so welcoming and made me feel right at home. She put such care and thought into my stay and didn\'t worry about putting on any airs. She even stocked the fridge with me favourite biscuits from back home. The whole experience brought me right back to Manchester and me memories from childhood. As my Grammy Moon used say, "Fish, chips and peas with pea wet"!',
    stars: 5,
  },
  { // Roz reviews Martin’s
    spotId: 5,
    userId: 4,
    review: 'This was one the cutest places I\'ve been to in a while. The host was fun to be around and his place was in a perfect a location. There were so many great restaurants and bars to go to, and I even found a nice little park for my daughter to play in. Definitely recommend to everyone, and definitely coming back.',
    stars: 5, // Prev: 4.5
  },
  { // Niles reviews Frasier’s
    spotId: 1,
    userId: 2,
    review: 'Placeholder text: Niles Reviews Frasier',
    stars: 4, // Prev: 3.5
  },
  { // Frasier reviews Niles'
    spotId: 2,
    userId: 1,
    review: 'Placeholder text: Frasier reviews Niles',
    stars: 3,
  },
  { // Lilith reviews Frasier's
    spotId: 1,
    userId: 6,
    review: 'The host did a wonderful job. He has some beautiful things.',
    stars: 3, // Prev: 3.5
  },
  { // Roz reviews Frasier's
    spotId: 1,
    userId: 4,
    review: "A lot of beige",
    stars: 4,
  },
  { // Gil reviews Frasier's
    spotId: 1,
    userId: 7,
    review: "What a stunning apartment! The palate is pure subtle elegance. The detailing -- well, it's inspired. And the furnishings: simply delectable.",
    stars: 4,
  },
  { // Noel reviews Roz's
    spotId: 4,
    userId: 8,
    review: 'Placeholder text: Noel reviews Roz',
    stars: 5,
  },
  { // Bulldog reviews Roz's
    spotId: 4,
    userId: 9,
    review: 'not bad . wouldve given this place another star if the host was willing to make my stay a little more "comfortable" if you get my meaning !',
    stars: 4,
  },
  { // Gertrude reviews Niles'
    spotId: 2,
    userId: 10,
    review: "don't bother wasting yer money 'ere. The hosts are couple of stuck up phony art lovers who keep all their good liquor locked away from their payin' guests. Yer be'er off staying somewhere halfway decent like me flat in Eastlake",
    stars: 1,
  },
  { // Frasier reviews Lilith's
    spotId: 6,
    userId: 1,
    review: 'Simply superb! You\'d be hard-pressed to find a better place to stay in Seattle.',
    stars: 5,
  },
  { // Niles reviews Lilith's
    spotId: 6,
    userId: 2,
    review: 'A stunning place in an idyllic location - the host certainly has the most exquisite taste!',
    stars: 5,
  },
  { // Frasier reviews Gil's
    spotId: 7,
    userId: 1,
    review: 'This place is quite a find! Vibrant location and the host certainly has a taste for the finer things!',
    stars: 5,
  },
  { // Frasier reviews Noel's
    spotId: 8,
    userId: 1,
    review: 'The host has bit of a quirky personality, but I could tell he tried his best to make us feel comfortable. And for that, I thank his hospitality.',
    stars: 3,
  },
  { // Frasier reviews Bulldog's
    spotId: 9,
    userId: 1,
    review: 'Charming.',
    stars: 2,
  },
  { // Daphne reviews Gertrude's
    spotId: 10,
    userId: 3,
    review: 'It was such a treat for us to stay in this home. We can\'t thank the host enough for her generosity!',
    stars: 5,
  },
  { // Niles reviews Gertrude's
    spotId: 10,
    userId: 2,
    review: 'What a lovely home this was! And the host was like no other. In fact, the whole experience brought to mind visions of my own home the moment we arrived!',
    stars: 5,
  },
  { // Gertrude reviews Martin's
    spotId: 5,
    userId: 10,
    review: 'the host was a bit of a charmer, that one. I just wish he wasn\'t playin\' so hard to get ;)',
    stars: 5,
  },
  { // Roz reviews Daphne's
    spotId: 3,
    userId: 4,
    review: 'My girlfriends and I just had the best time at this place! The host took such good care of us, and there were so many things to do in the area! Great place for a girl\'s night out - definitely coming here again',
    stars: 5,
  },
  { // Roz reviews Gil's
    spotId: 7,
    userId: 4,
    review: 'This place was definitely fabulous - almost too fabulous, if you ask me. I would\'ve felt unwelcome and out-of-place had not been for the wine basket he left for our stay',
    stars: 4,
  },
  { // Roz reviews Noel's
    spotId: 8,
    userId: 4,
    review: 'The host was kind of a freak, but I guess the stay wasn\'t that bad',
    stars: 2,
  },
  { // Roz reviews Bulldog's
    spotId: 9,
    userId: 4,
    review: "Ugh. This place is DISGUSTING. I don't know why I even bothered staying here. The room was a total mess and the host kept hitting on me the entire time I was there. Save yourself the headache and STAY SOMEWHERE ELSE.",
    stars: 1,
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
