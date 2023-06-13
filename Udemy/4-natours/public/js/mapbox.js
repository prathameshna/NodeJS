
export const createScript = (url) => {
    let scriptPos = document.querySelector('script');
    let mapScript = document.createElement('script');
    mapScript.setAttribute('defer', '');
    mapScript.src = url;
    scriptPos.insertAdjacentElement('beforebegin', mapScript);
  }

export const displayMap = (locations) => {
    mapboxgl.accessToken =
    'pk.eyJ1IjoicHJhdGhhbTAyODAiLCJhIjoiY2xpb2N1ZjdqMGV4ZTNyb3h3OHJiOGQ3NiJ9.2rU7SJGpNa5qndCVEID9xg';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/pratham0280/cliod1zr0000601o14nto8pys',
        scrollZoom: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Add marker
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);

        // Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);

        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);

        
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100,
        }
    });

    // Add event listener for Ctrl key + mouse scroll on the map container
    document.getElementById('map').addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
        var delta = e.deltaY > 0 ? -1 : 1;
        var zoom = map.getZoom();
        map.setZoom(zoom + delta);
        e.preventDefault();
        }
    });
}

