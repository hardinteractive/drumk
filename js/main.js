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

function changeTempo(event){
	Playback.timing.tempo = event.target.valueAsNumber;
}