// normalize functions to turn array or object into object with contents:
// uses "id" specifically as key
// {1: {1: ...}, 2: {2: ...}, 3: {3: ...}}
export function normalizeArray(arr) {
    let obj = {}
    arr.forEach(el => obj[el.id] = el);
    return obj;
  };


const initialState = {
    allSpots: {},
    singleSpotDetails: {},
    singleSpotReviews: {},
}

// convert ISO string to "Month Year"
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


export function addPlaceholderImages(arr) {

    let img = [
        "https://cdn1.vox-cdn.com/uploads/chorus_image/image/47552879/Pike_Place_Market_Entrance.0.0.jpg",
        "http://sparkcreativeseattle.com/wp-content/uploads/2018/12/space-needle-fog.jpg",
        "https://cdn.vox-cdn.com/thumbor/XIhmt3AT6oZpXGechlpqiWeMkxU=/0x0:5000x3333/1200x800/filters:focal(2100x1267:2900x2067)/cdn.vox-cdn.com/uploads/chorus_image/image/64758319/StarbucksPETA.0.jpg",
        "https://www.worldatlas.com/upload/b7/0d/7c/shutterstock-474626185.jpg",
        "https://wallpapercave.com/wp/wp3120731.jpg"
    ]

    for (let i = 0; arr.length < 5; i++) {
        let placeholder = {}
        placeholder.url = img[i]
        arr.push(placeholder)
    }

    return arr
}

export const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CZ', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
