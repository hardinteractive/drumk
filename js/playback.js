var Playback = {
	context: new AudioContext(),
	timing: {
		tempo: 120,
		lookAhead: 0.1,
		interval: 25,
		nextBeatTime: 0,
		currBeat: 0,
		currSection: 0,
		playing: false,
		timer: null
	},
	playNote: function(instrumentId){
		var source = Playback.context.createBufferSource();

		//find correct instrument and play its buffer.
		for( var i = 0; i < KitManager.instruments.length; i++ ){
			if( instrumentId === KitManager.instruments[i].id ){
				source.buffer = KitManager.instruments[i].buffer;
				source.connect( Playback.context.destination );
				source.start( Playback.timing.nextBeatTime );
			}
		}
	},
	advanceNote: function(){
		var secondsPerBeat = 60 / Playback.timing.tempo;

		//advance beat by a quarter note.
		Playback.timing.nextBeatTime += 0.25 * secondsPerBeat;

		//if currBeat is the last beat of the section, reset the beat counter to 0 and move to the next section.
		if( ++Playback.timing.currBeat === SectionManager.sections[ Playback.timing.currSection ].totalBeats ){
			Playback.timing.currBeat = 0;
			//advance to the next section, if it's the last section then move back to first section
			if( ++Playback.timing.currSection >= SectionManager.sections.length ){
				Playback.timing.currSection = 0;
			}
		}
	},
	//scanner looks ahead to see if any notes/beats should be scheduled for playback
	scanner: function(){
		while( Playback.timing.nextBeatTime < Playback.context.currentTime + Playback.timing.lookAhead ){
			for( var i = 0; i < SectionManager.sections[ Playback.timing.currSection ].beatSequences.length; i++ ){
				
				if( SectionManager.sections[ Playback.timing.currSection ].beatSequences[i].sequence[ Playback.timing.currBeat ].beat ){
					
					Playback.playNote( SectionManager.sections[ Playback.timing.currSection ].beatSequences[i].instrumentId );
					
				}
			}

			Playback.advanceNote();

		}
		
		Playback.timing.timer = setTimeout( Playback.scanner, Playback.timing.interval );
	},
	play: function(){
		console.log('Playing');

		if( !Playback.timing.playing ){//play
			Playback.timing.playing = true;
			Playback.timing.nextBeatTime = Playback.context.currentTime;
			Playback.timing.currBeat = 0;
			Playback.timing.currSection = 0;
			Playback.scanner();
		} else {//stop
			Playback.timing.playing = false;
			clearTimeout(Playback.timing.timer);
		}
	}
};