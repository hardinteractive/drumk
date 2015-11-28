var ViewInterface = {
	buildSections: function(){
		
		var domString = '';

		//loop over all sections
		for( var i = 0; i < SectionManager.sections.length; i++ ){

			//open section div
			domString += '<div class="section">';

			//name of the section
			domString += '<div class="left"><h5 class="section_name">'+SectionManager.sections[i].name+'</h5></div>';

			//inject beats of all instruments of this section
			for( var j = 0; j < SectionManager.sections[i].beatSequences.length; j++ ){
				//open div
				domString += '<div class="right">';
				
				//instrument name
				domString += '<h6 class="instrument_name">'+SectionManager.sections[i].beatSequences[j].instrumentId+'</h6>';

				//build checkbox inputs for each beat of each instrument
				for( var k = 0; k < SectionManager.sections[i].beatSequences[j].sequence.length; k++ ){
					domString += '<input class="beat" data-section="'+i+'" data-sequence="'+j+'" data-beat="'+k+'" type="checkbox" onclick="changeBeat(event)">';
				}

				//close div
				domString += '</div>';
			}

			//close section div
			domString += '</div>';
		}

		//inject the dom string
		document.getElementById('section_container').innerHTML = domString;
	}
};