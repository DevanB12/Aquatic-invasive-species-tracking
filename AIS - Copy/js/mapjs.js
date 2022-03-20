 src="https://polyfill.io/v3/polyfill.min.js?features=default"

      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkkDBtoIUHocB8cixp0kYWEgMLtiE28lc&callback=initMap&libraries=visualization&v=weekly"
      defer










      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      let map, infoWindow, heatmap;

      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 47.486990, lng: -94.875840 },
          zoom: 13,
        });
        heatmap = new google.maps.visualization.HeatmapLayer({
			data: getPoints(),
			map: map,
		});
		
		function toggleHeatmap() {
			heatmap.setMap(heatmap.getMap() ? null : map);
		}
		
        heatmap.set("radius", heatmap.get("radius") ? null : 20);

      function changeOpacity() {
        heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
      }
      
		function changeGradient() {
			const gradient = [
				"rgba(0, 255, 255, 0)",
				"rgba(0, 255, 255, 1)",
				"rgba(0, 191, 255, 1)",
				"rgba(0, 127, 255, 1)",
				"rgba(0, 63, 255, 1)",
				"rgba(0, 0, 255, 1)",
				"rgba(0, 0, 223, 1)",
				"rgba(0, 0, 191, 1)",
				"rgba(0, 0, 159, 1)",
				"rgba(0, 0, 127, 1)",
				"rgba(63, 0, 91, 1)",
				"rgba(127, 0, 63, 1)",
				"rgba(191, 0, 31, 1)",
				"rgba(255, 0, 0, 1)",
			];
			
			heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
		}
		
		function getPoints() {
			return [
				new google.maps.LatLng(47.491136, -94.873963),
				new google.maps.LatLng(47.490160, -94.873891),
				new google.maps.LatLng(47.494062, -94.873819)
				];
		}
		
        infoWindow = new google.maps.InfoWindow();
        const locationButton = document.createElement("button");
        locationButton.textContent = "Pan to Current Location";
        locationButton.classList.add("custom-map-control-button");
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(
          locationButton
        );
        locationButton.addEventListener("click", () => {
          // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setCenter(pos);
              },
              () => {
                handleLocationError(true, infoWindow, map.getCenter());
              }
            );
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        });
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
      }
