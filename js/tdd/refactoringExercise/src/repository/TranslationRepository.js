var TranslationRepository = function(availableBundles){
	var allBundles = {
		primary : {
			one : "tahi",
			two : "rua",
			three : "toru",
			four : "wha",
			five : "rima",
			six : "ono",
			seven : "whitu",
			eight : "waru",
			nine : "iwa",
			ten : "tekau"
		},
		secondary : {
			"red" : "whero",
			"orange" : "karaka",
			"yellow" : "kowhai",
			"green" : "kakariki",
			"blue" : "kikorangi",
			"indigo" : "poropango",
			"violet" : "papura"
		}
	};

	availableBundles = availableBundles || [];
	var bundles = Object.keys(allBundles).reduce(function(bundles, bundle){
		bundles[bundle] = availableBundles.indexOf(bundle) >=0 ? allBundles[bundle] : null;
		return bundles;
	}, {});

	TranslationRepository.prototype.loadBundle = function(bundle, locale){
		if (bundles.hasOwnProperty(bundle)) {
			return bundles[bundle];
		}
		throw new BundleNotFoundException(bundle);
	};
};

var BundleNotFoundException = function(bundle){
	this.message = bundle + " does not exist in repository";
	this.name = "service.TranslationRepository.BundleNotFoundException";
};

module.exports = TranslationRepository;