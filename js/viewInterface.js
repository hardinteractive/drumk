var ViewInterface = {
	buildSections: function(){
		
		var domString = '';

		//loop over all sections
		for( var i = 0; i < SectionManager.sections.length; i++ ){

			//open section div
			domString += '<div class="section">';

			//open beat sequence div
			domString += '<div id="instruments_'+SectionManager.sections[i].id+'" class="instrument_container">';

			//inject beats of all instruments of this section
			domString += ViewInterface.buildSequence(SectionManager.sections[i].id);

			//close beat sequence div
			domString += '</div>';

			//section controls
			domString += '<div class="section_controls">'
			+'<h5 class="section_name">'+SectionManager.sections[i].name+'</h5>'
			+'<input type="button" value="Delete" onclick="deleteSection('+SectionManager.sections[i].id+')">'
			+'<input type="number" value="'+SectionManager.sections[i].totalBeats+'" min="4" max="16" oninput="updateTotalBeats(event,'+SectionManager.sections[i].id+')">'
			+'</div>';

			//close section div
			domString += '</div>';
		}

		//inject the dom string
		document.getElementById('section_container').innerHTML = domString;
		ViewInterface.syncWithModel();
	},
	buildSequence: function(id){
		var theSection = SectionManager.getSectionById(id) || false;
		var domString = '';

		if( theSection ){

			//inject beats of all instruments of this section
			for( var i = 0; i < theSection.beatSequences.length; i++ ){
				
				//instrument name
				domString += '<h6 class="instrument_name">'+theSection.beatSequences[i].instrumentId+'</h6>';

				//build checkbox inputs for each beat of each instrument
				for( var j = 0; j < theSection.totalBeats; j++ ){

					//create all checkboxes.
					//element id is a cryptic id for quick grab of a particular beat element.
					//more human friendly data is stored in data-section, data-sequence, and data-beat attributes. This also removes the need to parse the ID for this info.
					domString += '<input class="beat" id="sec'+id+'seq'+i+'b'+j+'" data-section="'+id+'" data-sequence="'+i+'" data-beat="'+j+'" type="checkbox" onclick="changeBeat(event)">';
				}

			}
			return domString;
		} else {
			return false;
		}
	},
	syncWithModel: function(){
		//loops through all sections > instruments > beats and then syncs the view's checkboxes with the model.
		for( var i = 0; i < SectionManager.sections.length; i++ ){
			for( var j = 0; j < SectionManager.sections[i].beatSequences.length; j++ ){
				for( var k = 0; k < SectionManager.sections[i].totalBeats; k++ ){
					document.getElementById('sec'+SectionManager.sections[i].id+'seq'+j+'b'+k).checked = SectionManager.sections[i].beatSequences[j].sequence[k].beat;
				}
			}
		}
	}
};