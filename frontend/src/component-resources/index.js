/******************************* STATE ABBREVIATIONS (FOR CONTROLLED INPUTS) *******************************/
export const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA',
    'CZ', 'CO', 'CT', 'DE', 'DC',
    'FL', 'GA', 'GU', 'HI', 'ID',
    'IL', 'IN', 'IA', 'KS', 'KY',
    'LA', 'ME', 'MD', 'MA', 'MI',
    'MN', 'MS', 'MO', 'MT', 'NE',
    'NV', 'NH', 'NJ', 'NM', 'NY',
    'NC', 'ND', 'OH', 'OK', 'OR',
    'PA', 'PR', 'RI', 'SC', 'SD',
    'TN', 'TX', 'UT', 'VT', 'VI',
    'VA', 'WA', 'WV', 'WI', 'WY'
];


/******************************* PLACEHOLDER IMAGES FOR INSUFFICIENT SOURCES *******************************/
let placeholderImages = [
    "https://cdn1.vox-cdn.com/uploads/chorus_image/image/47552879/Pike_Place_Market_Entrance.0.0.jpg",
    // "http://sparkcreativeseattle.com/wp-content/uploads/2018/12/space-needle-fog.jpg",
    "https://i.pinimg.com/originals/61/9c/d7/619cd796299ae48b777881e8b5bdbc7e.jpg",
    "https://cdn.vox-cdn.com/thumbor/XIhmt3AT6oZpXGechlpqiWeMkxU=/0x0:5000x3333/1200x800/filters:focal(2100x1267:2900x2067)/cdn.vox-cdn.com/uploads/chorus_image/image/64758319/StarbucksPETA.0.jpg",
    "https://www.worldatlas.com/upload/b7/0d/7c/shutterstock-474626185.jpg",
    "https://wallpapercave.com/wp/wp3120731.jpg",
    // "https://blog.wa.aaa.com/wp-content/uploads/2019/11/space-needle-scenic.jpg",
    // "https://s.hdnux.com/photos/57/00/27/12322257/6/ratio3x2_1900.jpg",
    // "https://2.bp.blogspot.com/-xw1AUoG9eeg/UJWGyLLuKrI/AAAAAAAATeI/n3JtB477gtw/s1600/SN+CLOSE.jpg",
    // "https://live.staticflickr.com/2315/2240711923_bc0ab74690_b.jpg",
    // "https://media.architecturaldigest.com/photos/5bb3b91ebbbe132e220aa632/master/pass/13049_00_N504_high.jpg",
    // "https://i.pinimg.com/474x/ac/bf/49/acbf4935d40ae5fbf88b423d2e8ed51d.jpg",
    // "https://d3e1m60ptf1oym.cloudfront.net/4ec36858-783a-4f97-af88-b52ec6b58bd6/1611130073_X_SEATTLE_WASHINGTON_uxga.jpg",
    // "https://www.universetoday.com/wp-content/uploads/2010/09/9AlPZZ3iiR5U1Rk2hx.jpg",
]


/*********************************** FUNCTION TO ADD PLACEHOLDER IMAGES ************************************/
export function addPlaceholderImages(arr) {

    for (let i = 0; arr.length < 5; i++) {
        let placeholder = {}
        placeholder.url = placeholderImages[i]
        arr.push(placeholder)
    }

    return arr
}


/*********************************** CONVERT ISO STRING TO "Month Year" ************************************/
export function convertDate(iso) {

    let year = iso.slice(0, 4);
    let month = iso.slice(5, 7);

    if (month == 1) {
        month = 'January'
    } else if (month == 2) {
        month = 'February'
    } else if (month == 3) {
        month = 'March'
    } else if (month == 4) {
        month = 'April'
    } else if (month == 5) {
        month = 'May'
    } else if (month == 6) {
        month = 'June'
    } else if (month == 7) {
        month = 'July'
    } else if (month == 8) {
        month = 'August'
    } else if (month == 9) {
        month = 'September'
    } else if (month == 10) {
        month = 'October'
    } else if (month == 11) {
        month = 'November'
    } else if (month == 12) {
        month = 'December'
    }

    return month.concat(' ', year)
}


/*************************************** FUNCTION TO NORMALIZE ARRAY ***************************************/
// normalize function to turn array of objects into object of objects:
// uses "id" specifically as key
// { 1: { id: 1, ...}, 2: { id: 2, ...}, 3: { id: 3 ...}, ... }
export function normalizeArray(arr) {
    let obj = {}
    arr.forEach(el => obj[el.id] = el);
    return obj;
  };
