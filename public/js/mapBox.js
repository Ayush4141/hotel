/* eslint-disable */
var input = document.querySelector('#date-string');


input.addEventListener('input', () => {
	input = input.value.toString();

	// console.log(typeof input);
	// console.log(input.length);
	// console.log(input); // 2021-03-31
});

document.getElementById('proceed').click(function () {
	//console.log('Hello 2');
});

// console.log('Hello world');

export const displayMap = (locations) => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoiYXNodWtsYTIwMDAiLCJhIjoiY2twMG50Y3d4MWM5ejJ2bXAxNjRzcGlxZyJ9.FZ9KmbiTNf96163CzavLAg';

	var map = new mapboxgl.Map({
		container: 'map',
		//'mapbox://styles/ashukla2000/ckmmbmf074zhu17s66yytub8x',
		style: 'mapbox://styles/ashukla2000/ckp1gvdq55f9y17p4cyngs2d8',
		//scrollZoom: false,
		center: locations.coordinates,
		//[-118.113491, 34.111745],
		zoom: 14,
		// interactive: false
	});

	//const bounds = new mapboxgl.LngLatBounds();

	// locations.forEach((loc) => {
	// Create marker
	const el = document.createElement('div');
	el.className = 'marker';

	// Add marker
	new mapboxgl.Marker({
		element: el,
		anchor: 'bottom',
	})
		.setLngLat(locations.coordinates)
		.addTo(map);

	// Add popup
	new mapboxgl.Popup({
		offset: 30,
	})
		.setLngLat(locations.coordinates)
		.setHTML(`<p>${locations.description}</p>`)
		.addTo(map);

	// Extend map bounds to include current location
	//bounds.extend(locations.coordinates);
	// });

	// map.fitBounds(bounds, {
	// 	padding: {
	// 		top: 200,
	// 		bottom: 150,
	// 		left: 100,
	// 		right: 100,
	// 	},
	// });
};

const mapBox = document.getElementById('map');
if (mapBox) {
	const locations = JSON.parse(mapBox.dataset.locations);
	displayMap(locations);
}

const proceed1 = document.getElementById('proceed');
// var el = document.getElementById('#date-string');

if (proceed1) {
	proceed1.addEventListener('click', (e) => {
		if(input.value=="")
		{
			alert("Please Choose a Date");
		}else{
			e.target.textContent = 'Processing... ';
			const { hotelId } = e.target.dataset;
			location.assign(`/bookHotel/${hotelId}_${input}`);

		}

	});
	// }
}
