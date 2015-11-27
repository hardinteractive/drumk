function Instrument( args ){
	this.id = args.id || null;
	this.path = args.path || null;
	this.buffer = args.buffer || null;
	this.sequence = args.sequence || [];
}

Instrument.prototype.loadBuffer = function(){
	console.log('loading instrument buffer: ', this.id);
	var xhr = new XMLHttpRequest();

	xhr.open('GET', this.path, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(){
		Playback.context.decodeAudioData( this.response, function( buffer ){
			if( buffer ){
				this.buffer = buffer;
			} else {
				console.error('Error loading buffer for instrument id: '+ this.id );
			}
		});
	};
	xhr.onerror = function(error){
		console.log('Server Error', error);
	};
	xhr.send();

	KitManager.instrumentLoaded();
};