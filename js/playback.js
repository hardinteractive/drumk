var Playback = {
	context: new AudioContext(),
	timing: {
		tempo: 120,
		lookAhead: 0.1,
		interval: 25,
		nextBeatTime: 0,
		currBeat: 0,
		playing: false,
		timer: null
	},
	playNote: function(instrumentId){
		var source = Playback.context.createBufferSource();

		//find correct instrument
		for( var i = 0; i < KitManager.instruments.length; i++ ){
			if( instrumentId === KitManager.instruments[i].id ){
				console.log(KitManager.instruments[i]);
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

		//hard-coded to 8 for now, needs to match currSection's "totalBeats"
		if( ++Playback.timing.currBeat === 8 ){
			Playback.timing.currBeat = 0;
		}
	},
	//scanner looks ahead to see if any notes/beats should be scheduled for playback
	scanner: function(){
		while( Playback.timing.nextBeatTime < Playback.context.currentTime + Playback.timing.lookAhead ){
			for( var i = 0; i < SectionManager.sections[0].beatSequences.length; i++ ){
				
				if( SectionManager.sections[0].beatSequences[i].sequence[ Playback.timing.currBeat ].beat ){
					console.log( SectionManager.sections[0].beatSequences[i].instrumentId );
					Playback.playNote( SectionManager.sections[0].beatSequences[i].instrumentId );

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
			Playback.scanner();
		} else {//stop
			Playback.timing.playing = false;
			clearTimeout(Playback.timing.timer);
		}
	}
};