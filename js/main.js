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
		beat: event.target.dataset.beat,
		section: event.target.dataset.section,
		sequence: event.target.dataset.sequence
	};

	//toggle beat value true/false.
	SectionManager.sections[ data.section ].beatSequences[ data.sequence ].sequence[ data.beat ].beat = !SectionManager.sections[ data.section ].beatSequences[ data.sequence ].sequence[ data.beat ].beat;

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
		}
	}

}

function changeTempo(event){
	Playback.timing.tempo = event.target.valueAsNumber;
}