function Section( args ){
	
	this.id = args.id;
	this.name = args.name || 'No Name';
	
	//number of beats per sequence, can range from 4 to 16
	this.totalBeats = args.totalBeats || 16;

	//per-instrument sequence
	this.beatSequences = args.beatSequences || [];
	
	//multiplies the global tempo for this section only.
	//allows for easy sequencing of half time, double time, triplet time, etc.
	this.tempoModifier = args.tempoModifier || 1.0;
	

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
	if( value >= 4 && value <= 16 ){
		this.totalBeats = value;
		return true;
	} else {
		return false;
	}
};

Section.prototype.setTempoModifier = function(rate){
	console.log('rate:', rate);
	this.tempoModifier = rate;
};