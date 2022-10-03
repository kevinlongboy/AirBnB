'use strict';

const demoSpotImages = [

  /*********************** Frasier’s Queen Anne Condo ***********************/
  {
    // id: 1,
    spotId: 1,
    url: 'https://thewaverlyslu.com/assets/images/cache/Waverly-website-Gallery-4-1920x1080-4780774461e6019cbbd3120c89e8ba3b.jpg',
    // url: '../../../assets/images/spot-images/queen-anne-condo/queen-anne-spot-1.jpg',
    preview: true,
  },
  {
    // id: 2,
    spotId: 1,
    url: 'https://thewaverlyslu.com/assets/images/cache/galler-3-new-136d791da8ee99ed7f37f36a0973584a.jpg',
    // url: '../../../assets/images/spot-images/queen-anne-condo/queen-anne-spot-2.jpg',
    preview: false,
  },
  {
    // id: 3,
    spotId: 1,
    url: 'https://thewaverlyslu.com/assets/images/cache/sky-lounge-cc12d5561915538bd3d87d11bf7ce2a4.jpg',
    // url: '../../../assets/images/spot-images/queen-anne-condo/queen-anne-spot-3.jpg',
    preview: false,
  },
  {
    // id: 4,
    spotId: 1,
    url: 'https://thewaverlyslu.com/assets/images/cache/Layer-11-f9131cf28993e4b4debb0ded92472e4e.jpg',
    preview: false,
  },
  {
    // id: 5,
    spotId: 1,
    url: 'https://thewaverlyslu.com/assets/images/cache/couple-a3bb6f61cf7eb2daa2c5520a623ad471.jpg',
    preview: false,
  },


  /*********************** Niles' Medina Mansion ***********************/
  {
    // id: 6,
    spotId: 2,
    url: 'https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_2.jpg',
    // url: '../../../assets/images/spot-images/medina-mansion/medina-spot-1.jpg',
    preview: true,
  },
  {
    // id: 7,
    spotId: 2,
    url: 'https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_5_2.jpg',
    // url: '../../../assets/images/spot-images/medina-mansion/medina-spot-2.jpg',
    preview: false,
  },
  {
    // id: 8,
    spotId: 2,
    url: 'https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_11_2.jpg',
    // url: '../../../assets/images/spot-images/medina-mansion/medina-spot-3.jpg',
    preview: false,
  },
  {
    // id: 9,
    spotId: 2,
    url: 'https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_14_2.jpg',
    // url: '../../../assets/images/spot-images/medina-mansion/medina-spot-4.jpg',
    preview: false,
  },
  {
    // id: 10,
    spotId: 2,
    url: 'https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_17_2.jpg',
    // url: '../../../assets/images/spot-images/medina-mansion/medina-spot-5.jpg',
    preview: false,
  },


  /*********************** Daphne's Belltown Loft ***********************/
  {
    // id: 11,
    spotId: 3,
    url: 'https://thejoeseattle.com/img/new/PH2.jpg',
    // url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-1.jpg',
    preview: true,
  },
  {
    // id: 12,
    spotId: 3,
    url: 'https://thejoeseattle.com/img/new/PH3.jpg',
    // url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-2.jpg',
    preview: false,
  },
  {
    // id: 13,
    spotId: 3,
    url: 'https://thejoeseattle.com/img/new/PH4.jpg',
    // url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-3.jpg',
    preview: false,
  },
  {
    // id: 14,
    spotId: 3,
    url: 'https://thejoeseattle.com/img/new/PH6.jpg',
    // url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-4.jpg',
    preview: false,
  },
  {
    // id: 15,
    spotId: 3,
    url: 'https://thejoeseattle.com/img/loft-living/MLS-2.jpg',
    // url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-5.jpg',
    preview: false,
  },
  {
    // id: 16,
    spotId: 3,
    url: 'https://thejoeseattle.com/img/find-your-home/gallery/s_JAL19.jpg',
    // url: '../../../assets/images/spot-images/belltown-loft/belltown-spot-6.jpg',
    preview: false,
  },


  /*********************** Roz's Ballard Apartment ***********************/
  {
    // id: 17,
    spotId: 4,
    url: 'https://photos.zillowstatic.com/fp/de38f8bf8466ca7b4c839d53d236db13-cc_ft_768.webp',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-1.jpg',
    preview: true,
  },
  {
    // id: 18,
    spotId: 4,
    url: 'https://photos.zillowstatic.com/fp/b2e19cdb985f50a54c1f6aa84f99be6a-cc_ft_768.webp',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-2.jpg',
    preview: false,
  },
  {
    // id: 19,
    spotId: 4,
    url: 'https://photos.zillowstatic.com/fp/ef620e1be66341f755ea58f8b17fb3f4-cc_ft_768.webp',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-3.jpg',
    preview: false,
  },
  {
    // id: 20,
    spotId: 4,
    url: 'https://photos.zillowstatic.com/fp/6d0aad547972474ce7b043914b6d650a-cc_ft_768.webp',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-4.jpg',
    preview: false,
  },
  {
    // id: 21,
    spotId: 4,
    url: 'https://photos.zillowstatic.com/fp/8b84c4470b6ec0e5b6d8e5b78c4bd1af-cc_ft_768.webp',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-5.jpg',
    preview: false,
  },
  {
    // id: 22,
    spotId: 4,
    url: 'https://photos.zillowstatic.com/fp/b0f05db5359aae99891abfb6b57231a7-cc_ft_768.webp',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-6.jpg',
    preview: false,
  },


  /*********************** Martin's Ballard Apartment ***********************/
  {
    // id: 23,
    spotId: 5,
    url: 'https://photos.zillowstatic.com/fp/04a7ee90ea509d3068527c23bb8d9f1c-uncropped_scaled_within_1536_1152.webp',
    // url: '../../../assets/images/spot-images/madrona-house/madrona-spot-1.jpg',
    preview: true,
  },
  {
    // id: 24,
    spotId: 5,
    url: 'https://photos.zillowstatic.com/fp/7689847e9f283ec015fac292b84f1e17-uncropped_scaled_within_1536_1152.webp',
    // url: '../../../assets/images/spot-images/madrona-house/madrona-spot-2.jpg',
    preview: false,
  },
  {
    // id: 25,
    spotId: 5,
    url: 'https://photos.zillowstatic.com/fp/d13b37bc29c7a3b487bc4fb79b956bbc-uncropped_scaled_within_1536_1152.webp',
    // url: '../../../assets/images/spot-images/madrona-house/madrona-spot-3.jpg',
    preview: false,
  },
  {
    // id: 26,
    spotId: 5,
    url: 'https://photos.zillowstatic.com/fp/3c4e349fe202a8c65bf7f2a02282af70-uncropped_scaled_within_1536_1152.webp',
    // url: '../../../assets/images/spot-images/madrona-house/madrona-spot-4.jpg',
    preview: false,
  },
  {
    // id: 27,
    spotId: 5,
    url: 'https://photos.zillowstatic.com/fp/ea2763a20345dd81ae5cc524eda153ed-uncropped_scaled_within_1536_1152.webp',
    // url: '../../../assets/images/spot-images/madrona-house/madrona-spot-5.jpg',
    preview: false,
  },
  {
    // id: 28,
    spotId: 5,
    url: 'https://photos.zillowstatic.com/fp/25688c30eabdb6e5baf7bafafcaec886-uncropped_scaled_within_1536_1152.webp',
    // url: '../../../assets/images/spot-images/madrona-house/madrona-spot-6.jpg',
    preview: false,
  },
  {
    // id: 29,
    spotId: 5,
    url: 'https://photos.zillowstatic.com/fp/9acfa89002cebeac73c7e20bd6ea6156-uncropped_scaled_within_1536_1152.webp',
    // url: '../../../assets/images/spot-images/madrona-house/madrona-spot-7.jpg',
    preview: false,
  },

  /*********************** Lilith's South Lake Union Suite ***********************/
  {
    // id: 30,
    spotId: 6,
    url: 'https://cache.marriott.com/content/dam/marriott-renditions/SEACD/seacd-king-guestroom-6719-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*',
    preview: true,
  },
  {
    // id: 31,
    spotId: 6,
    url: 'https://cache.marriott.com/content/dam/marriott-renditions/SEACD/seacd-king-5889-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*',
    preview: false,
  },
  {
    // id: 32,
    spotId: 6,
    url: 'https://cache.marriott.com/content/dam/marriott-renditions/SEACD/seacd-bathroom-6726-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*',
    preview: false,
  },
  {
    // id: 33,
    spotId: 6,
    url: 'https://cache.marriott.com/content/dam/marriott-renditions/SEACD/seacd-lobby-0068-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*',
    preview: false,
  },
  {
    // id: 34,
    spotId: 6,
    url: 'https://cache.marriott.com/content/dam/marriott-renditions/SEACD/seacd-fitness-4594-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1215px:*',
    preview: false,
  },

  /*********************** Gil's Capitol Hill Flat ***********************/
  {
    // id: 35,
    spotId: 7,
    url: 'https://avalonbay-avalon-communities-prod.cdn.arcpublishing.com/resizer/-jUT3oMviKWWIdwZ9OfyGKgf2n0=/1440x810/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/avalonbay/R2V2X5TXNJO6ZBTWVT7RALHH2Y.jpg',
    preview: true,
  },
  {
    // id: 36,
    spotId: 7,
    url: 'https://avalonbay-avalon-communities-prod.cdn.arcpublishing.com/resizer/gsMBcnc6nt3YeA8lYqRbLsX-Xow=/1440x810/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/avalonbay/53226WDQZ5M6JHFU4JUAI27OCU.jpg',
    preview: false,
  },
  {
    // id: 37,
    spotId: 7,
    url: 'https://avalonbay-avalon-communities-prod.cdn.arcpublishing.com/resizer/jmgjPTCXWVgQYFEEFMzIGV5oEHs=/1440x810/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/avalonbay/MEBORVKIS5OXRDXU2XDZJAI3YM.jpg',
    preview: false,
  },
  {
    // id: 38,
    spotId: 7,
    url: 'https://avalonbay-avalon-communities-prod.cdn.arcpublishing.com/resizer/9RxAzPE6Wjda4_Dt1tta2NGCQgs=/1440x810/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/avalonbay/MM73QVFBNFMJ5FE3E3ISEAOUXE.jpg',
    preview: false,
  },
  {
    // id: 39,
    spotId: 7,
    url: 'https://avalonbay-avalon-communities-prod.cdn.arcpublishing.com/resizer/oNDXfn4UjaHl2OYptp2J27Vnq3g=/1440x810/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/avalonbay/WGGL6MG6CRJENIC6CNVRLQDOTA.jpg',
    preview: false,
  },
]

let spotIds = [];
demoSpotImages.forEach(spotImage => {
  if (!spotIds.includes(spotImage.spotId)) {
    spotIds.push(spotImage.spotId)
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'SpotImages',
      demoSpotImages
    )
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      'SpotImages',
      { spotId: { [Op.in]: spotIds } }
    )
  }
};
