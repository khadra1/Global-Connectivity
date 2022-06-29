
console.log("alldata = "+ JSON.stringify(dataworld));
// function plotMap(data){
//     // let myMap = L.map("left", {
//     //     center: [45.52, -122.67],
//     //     zoom: 2
//     //   });
    
//     //   // Adding a tile layer (the background map image) to our map:
//     //   // We use the addTo() method to add objects to our map.
//     //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     //       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     //   }).addTo(myMap);

//     // data.forEach(element =>{
//     //     L.marker([element.lat,element.lng]).addTo(myMap);

//     // })
    
// }
// window.onload = () => {
//     // do something
   

   
//     let total = Object.keys(alldataworld['Latitude']).length;
//     console.log(Object.keys(alldataworld))
//     let data = {};
//     let years = [];
//     for (let i = 2000; i <= 2020; i++)
//         years.push(i)
//     let alls = [];
//     console.log(years);
//     years.forEach((eachYear) => {
//         for (let i = 0; i < total; i++) {
//             let seriesName = alldataworld['Series Name'][i]
//             let latitude = alldataworld['Latitude'][i]
//             let longitude = alldataworld['Longitude'][i]
//             let yearValue = alldataworld[eachYear + " "][i]

//             let obj = { seriesName, latitude, longitude, year:eachYear,yearValue:yearValue }
            
//             alls.push(obj)

//         }
//     })


//     console.log(alls.filter(each=> each.seriesName == "Individuals using the Internet (% of population)" && each.year == "2020 "))
//     let mapData = alls.map(each=>({lat:each.latitude,lng:each.longitude,count:parseFloat(each.yearValue)}))
//     console.log(mapData);

// }