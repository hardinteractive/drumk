var ViewInterface = {
	buildSections: function(){
		
		var domString = '';

		//loop over all sections
		for( var i = 0; i < SectionManager.sections.length; i++ ){

			//open section div
			domString += '<div class="section">';

			domString += '<div class="instrument_container">';
			//inject beats of all instruments of this section
			for( var j = 0; j < SectionManager.sections[i].beatSequences.length; j++ ){
				
				//instrument name
				domString += '<h6 class="instrument_name">'+SectionManager.sections[i].beatSequences[j].instrumentId+'</h6>';

				//build checkbox inputs for each beat of each instrument
				for( var k = 0; k < SectionManager.sections[i].beatSequences[j].sequence.length; k++ ){

					//create all checkboxes.
					//element id is a cryptic id for quick grab of a particular beat element.
					//more human friendly data is stored in data-section, data-sequence, and data-beat attributes. This also removes the need to parse the ID for meta info.
					domString += '<input class="beat" id="sec'+i+'seq'+j+'b'+k+'" data-section="'+i+'" data-sequence="'+j+'" data-beat="'+k+'" type="checkbox" onclick="changeBeat(event)">';
				}

			}
			//close div
			domString += '</div>';

			//section controls
			domString += '<div class="section_controls"><h5 class="section_name">'+SectionManager.sections[i].name+'</h5><input type="button" value="Delete" onclick="deleteSection('+SectionManager.sections[i].id+')"></div>';

			//close section div
			domString += '</div>';
		}

		//inject the dom string
		document.getElementById('section_container').innerHTML = domString;
		ViewInterface.syncWithModel();
	},
	syncWithModel: function(){
		//loops through all sections > instruments > beats and then syncs the view's checkboxes with the model.
		for( var i = 0; i < SectionManager.sections.length; i++ ){
			for( var j = 0; j < SectionManager.sections[i].beatSequences.length; j++ ){
				for( var k = 0; k < SectionManager.sections[i].beatSequences[j].sequence.length; k++ ){
					document.getElementById('sec'+i+'seq'+j+'b'+k).checked = SectionManager.sections[i].beatSequences[j].sequence[k].beat;
				}
			}
		}
	}
};