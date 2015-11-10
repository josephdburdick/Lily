Meteor.startup(function(){
	  console.log(Venues.find().count() + ' venues');
	  console.log(Meteor.users.find().count() + ' users');
		Venues.remove({});
		function Venue(params){
			this.name = params.name;
			this.address = params.address.toString().trim();
			this.type = params.type.toString().trim();
			this.city = params.city.toString().trim();
		}
		function Network(ownerId, params){
			this.ownerId = ownerId;
			this.name = params.name || "NYC Open Hotspot";
			this.isPublic = params.isPublic;
			this.password = params.password;
			this.verified = params.verified;
		}
		function Marker(ownerId, params){
			this.ownerId = ownerId;
			this.lat = params.lat;
			this.lng = params.lng;
			this.isPublic = params.isPublic;
			this.type = params.type;
		}

	  // Seed Venues database
	  if (Venues.find().count() === 0){
	  	var items = JSON.parse(Assets.getText('seeds/locations--nyc-hotspots.json'));
		  _.each(items, function(item) {
		  	let
					venue, venueId,
					network, networkId,
					marker, markerId;

				console.log(item);
				// handle dirty seed data
		  	if (["",null].indexOf(item.location.name) > -1 || item.location.name.match(/^[0-9]+$/) !== null){
		  		item.location.name = "Free Hotspot";
		  	} else {
		  		item.location.name = item.location.name.trim();
		  	}
				// Create and add Venue
				venue = new Venue({
					name : item.location.name,
					address : item.location.address,
			  	type : item.location.type,
			  	city : item.location.city
				});

				console.log(venue);

		    venueId = Venues.insert(venue);
				console.log(venueId);

				// Create, add, and link Network to Venue
				network = new Network({
					ownerId : venueId,
			  	name : item.network.name,
			  	isPublic : item.network.isPublic,
					password : item.network.password,
					verified : item.network.verified
				});


		    networkId = Networks.insert(venueId, network);
				console.log(networkId);

				// Create, add, and link Marker to Venue
				marker = new Marker({
					ownerId : venueId,
					type : "Venue",
					lat : item.location.lat,
					lng : item.location.lng
				});

				markerId = Markers.insert(marker);
				console.log(markerId);

		  });

		  Venues._ensureIndex({"coordinates": "2dsphere"});
	  }

	});
