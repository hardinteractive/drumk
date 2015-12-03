var SectionManager = {
	sections: [],
	createCounter: 0,
	add: function(){
		this.sections.push( new Section({
			id: SectionManager.createCounter++
		}));
		ViewInterface.buildSections();
	},
	delete: function(id){
		for( var i = 0; i < this.sections.length; i++ ){
			if( id === this.sections[i].id ){
				this.sections.splice(i, 1);
				ViewInterface.buildSections();
				break;
			}
		}
	},
	getSectionById: function(id){
		for( var i = 0; i < this.sections.length; i++ ){
			if( id === this.sections[i].id ){
				return this.sections[i];
			}
		}
		return null;
	}
};