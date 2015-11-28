var KitManager = {
	instruments: [],
	loadState: {
		total: 0,
		numLoaded: 0
	},
	load: function(){
		//hard coded to single kit for now
		var kit = kitOne.instrumentList;

		//clear out instruments from last kit.
		this.instruments = [];

		//keep a counter of loaded callbacks
		this.loadState.total = kit.length;
		this.loadState.numLoaded = 0;

		//construct Instruments
		for( var i = 0; i < kit.length; i++ ){
			this.instruments.push( new Instrument( kit[i]) );
			this.instruments[i].loadBuffer();
		}
	},
	instrumentLoaded: function(){
		if( ++this.loadState.numLoaded === this.loadState.total ){
			console.log('all sounds loaded');
		} else {
			console.log('loaded sounds '+this.loadState.numLoaded+' of '+this.loadState.total);
		}
	}
};