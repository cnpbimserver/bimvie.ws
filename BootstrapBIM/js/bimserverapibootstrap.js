function loadBimServerApi(address, notifier, callback) {
	var timeoutId = window.setTimeout(function() {
		notifier.error("Could not connect");
	}, 3000);
	$.getScript(address + "/js/bimserverapi.js").done(function(){
		window.clearTimeout(timeoutId);
		Global.bimServerApi = new BimServerApi(address, notifier);
		Global.bimServerApi.init(function(){
			Global.bimServerApi.call("ServiceInterface", "getServerInfo", {}, function(serverInfo){
				callback(serverInfo);
			});
		});
	}).fail(function(jqxhr, settings, exception){
		window.clearTimeout(timeoutId);
		notifier.error("Could not connect");
	});
}