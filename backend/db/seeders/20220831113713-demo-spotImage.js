'use strict';

const demoSpotImages = [

  /*********************** Frasier’s Queen Anne Condo ***********************/
  {
    // id: 1,
    spotId: 1,
    url: 'https://olsonkundig.com/wp-content/uploads/2015/07/10_01034_00_N49-2160x1433.jpg',
    // url: '../../../assets/images/spot-images/queen-anne-condo/queen-anne-spot-1.jpg',
    preview: true,
  },
  {
    // id: 2,
    spotId: 1,
    url: 'https://olsonkundig.com/wp-content/uploads/2015/07/12_01034_00_N38-2160x1671.jpg',
    // url: '../../../assets/images/spot-images/queen-anne-condo/queen-anne-spot-2.jpg',
    preview: false,
  },
  {
    // id: 3,
    spotId: 1,
    url: 'https://olsonkundig.com/wp-content/uploads/2015/07/16_01034_00_N4-2160x1690.jpg',
    // url: '../../../assets/images/spot-images/queen-anne-condo/queen-anne-spot-3.jpg',
    preview: false,
  },
  {
    // id: 4,
    spotId: 1,
    url: 'https://olsonkundig.com/wp-content/uploads/2015/07/14_01034_00_N56-2160x3054.jpg',
    preview: false,
  },
  {
    // id: 5,
    spotId: 1,
    url: 'https://olsonkundig.com/wp-content/uploads/2015/07/19_01034_00_N10.jpg',
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
    url: 'https://broadstonevin.com/assets/images/cache/Web-28-9b81997b946f2a5ca10e3babc7cd028e.jpg',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-1.jpg',
    preview: true,
  },
  {
    // id: 18,
    spotId: 4,
    url: 'https://broadstonevin.com/assets/images/cache/Web-37-1eb1c09f70b442d4c1757a834f50781c.jpg',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-2.jpg',
    preview: false,
  },
  {
    // id: 19,
    spotId: 4,
    url: 'https://broadstonevin.com/assets/images/cache/Web-31-be1470dd2021dff51d416f0b9f1cf126.jpg',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-3.jpg',
    preview: false,
  },
  {
    // id: 20,
    spotId: 4,
    url: 'https://broadstonevin.com/assets/images/cache/Vin_12-ec73d8669d312024af8dfe41020e063d.jpg',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-4.jpg',
    preview: false,
  },
  {
    // id: 21,
    spotId: 4,
    url: 'https://broadstonevin.com/assets/images/cache/Web_04-ec8b533d66d9f8375aeafd0a52df0dca.JPG',
    // url: '../../../assets/images/spot-images/ballard-apartment/ballard-spot-5.jpg',
    preview: false,
  },
  {
    // id: 22,
    spotId: 4,
    url: 'https://broadstonevin.com/assets/images/cache/Web_01-5fa9348ee294bff83ef49fb7e9ebb87c.JPG',
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

  /*********************** Gil's Capitol Hill Bungalow ***********************/
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

  /*********************** Noel's Chinatown-International Room ***********************/
  {
    // id: 40,
    spotId: 8,
    url: 'https://images1.forrent.com/i2/NYSGF5NxBIPJC3CJ6d2f0cz8AO-CmgL2-A5dSmWuXOA/112/image.jpg',
    preview: true,
  },
  {
    // id: 41,
    spotId: 8,
    url: 'https://images1.forrent.com/i2/FoSLRNUmnLU9gQ0GzQG3UWdpgvutc2nhg7Xez02EU7E/112/image.jpg',
    preview: false,
  },
  {
    // id: 42,
    spotId: 8,
    url: 'https://images1.forrent.com/i2/wgtHsH0lmfjXTbIcRJE7t7CziFq1dRDhm4rIS5uf3Do/112/image.jpg',
    preview: false,
  },
  {
    // id: 43,
    spotId: 8,
    url: 'https://images1.forrent.com/i2/nxirw9P2n2JeANa9UBJvXpWnrdHUB7C279StSNei1zA/112/image.jpg',
    preview: false,
  },
  {
    // id: 44,
    spotId: 8,
    url: 'https://images1.forrent.com/i2/TNZAtF7lZP72LSKKDE2nqcdbltdYV6aQcNhkKnSpUsU/112/image.jpg',
    preview: false,
  },

  /*********************** Bulldog's SoDo Shared Space ***********************/
  {
    // id: 45,
    spotId: 9,
    url: 'https://www.belljacksonstreet.com/wp-content/uploads/sites/87/2022/05/Bell-Jackson-St_Living-Room1_HighRes-April2022-2000x1333.jpg',
    preview: true,
  },
  {
    // id: 46,
    spotId: 9,
    url: 'https://www.belljacksonstreet.com/wp-content/uploads/sites/87/2022/05/Bell-Jackson-St_Kitchen1_HighRes-April2022-2000x1333.jpg',
    preview: false,
  },
  {
    // id: 47,
    spotId: 9,
    url: 'https://www.belljacksonstreet.com/wp-content/uploads/sites/87/2022/05/Bell-Jackson-St_Living-Room2_HighRes-April2022-2000x1333.jpg',
    preview: false,
  },
  {
    // id: 48,
    spotId: 9,
    url: 'https://www.belljacksonstreet.com/wp-content/uploads/sites/87/2021/02/BellJacksonStreet_Clubhouse-Interior-13.jpg',
    preview: false,
  },
  {
    // id: 49,
    spotId: 9,
    url: 'https://www.belljacksonstreet.com/wp-content/uploads/sites/87/2021/02/BellJacksonStreet_Fitness-Center-2.jpg',
    preview: false,
  },

  /*********************** Gertrude's Eastlake Flat ***********************/
  {
    // id: 50,
    spotId: 10,
    url: 'https://images1.apartmenthomeliving.com/i2/nxFrbY6spo25OgKdLgQYNyGD69-5sfhonYDCLq2sP6A/114/image.jpg?p=1',
    preview: true,
  },
  {
    // id: 51,
    spotId: 10,
    url: 'https://images1.apartmenthomeliving.com/i2/UTk4fayknZDvHUoebWExpJSRa_oIQiUtLqaT_qZ1lX0/114/image.jpg?p=1',
    preview: false,
  },
  {
    // id: 52,
    spotId: 10,
    url: 'https://images1.apartmenthomeliving.com/i2/n-3QbTvH6gyK3bO1eZzc64QiYcMp737himzVnKH2FHc/114/image.jpg?p=1',
    preview: false,
  },
  {
    // id: 53,
    spotId: 10,
    url: 'https://images1.apartmenthomeliving.com/i2/uQEvxEjKK7XYhCp_DLymtNPChX6iM5HROVGOOjqEgc0/114/image.jpg?p=1',
    preview: false,
  },
  {
    // id: 54,
    spotId: 10,
    url: 'https://images1.apartmenthomeliving.com/i2/lF1Hi2ccyPHc4kND_LDPb0TuzqcmCzMhZm7lMgvRnZE/114/image.jpg?p=1',
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
