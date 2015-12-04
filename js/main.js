KitManager.load();

function addSection(){
	SectionManager.add();
}

function deleteSection(id){
	SectionManager.delete(id);
}

function play(){
	Playback.play();
}

//checkbox for a particular activated, change "beat" status accordingly.
function changeBeat(event){
	var beat = null;
	var data = {
		beat: parseInt(event.target.dataset.beat, 10),
		section: parseInt(event.target.dataset.section, 10),
		sequence: parseInt(event.target.dataset.sequence, 10 )
	};

	//toggle beat value true/false.
	SectionManager.getSectionById(data.section).beatSequences[ data.sequence ].sequence[ data.beat ].beat = !SectionManager.getSectionById(data.section).beatSequences[ data.sequence ].sequence[ data.beat ].beat;

}

function updateTotalBeats(event, id){
	var domString = '';
	//if update is successful, rebuild particular sequence DOM
	if( SectionManager.getSectionById( id ).updateTotalBeats( event.target.valueAsNumber )){
		
		//build DOM for just this sequence.
		domString = ViewInterface.buildSequence(id);
		
		//if non-empty, replace instrument sequences with new DOM.
		if( domString ){
			document.getElementById('instruments_'+id).innerHTML = domString;
			ViewInterface.syncWithModel();
		}
	}

}

function changeTempo(event){
	Playback.timing.tempo = event.target.valueAsNumber;
}