function Section( args ){
	this.id = args.id;
	this.name = args.name || 'No Name';
	this.totalBeats = args.totalBeats || 16;
	this.beatSequences = args.beatSequences || [];
	this.populate();
}

Section.prototype.populate = function(){

	//copy KitManager.instruments.id into this Section
	for( var i = 0; i < KitManager.instruments.length; i++ ){
		
		//tie new BeatSequence to an instrument id
		this.beatSequences.push( new BeatSequence({
			id: KitManager.instruments[i].id
		}));

		//populate the sequence array with empty beats, totalling this Section's number of beats
		for( var j = 0; j < this.totalBeats; j++ ){
			this.beatSequences[i].sequence.push({
				beat: false
			});
		}
	}
};

Section.prototype.updateTotalBeats = function(value){
	if( value > 4 && value < 16 ){
		this.totalBeats = value;
		return true;
	} else {
		return false;
	}
};