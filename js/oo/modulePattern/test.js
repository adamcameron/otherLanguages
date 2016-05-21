var variant = window.location.search.split("?")[1];
var libPath = "./js/lib/";
var libFilePath = libPath + variant.charAt(0).toUpperCase() + variant.slice(1) + ".js";
var initFilePath = "./js/init/" + variant + ".js";
var loadScript = function(file){
    document.write('<script src="' + file + '"></'+ 'script>');
};
var title = document.getElementsByTagName("title")[0];
title.text = variant;

loadScript(libFilePath);
loadScript(initFilePath);
