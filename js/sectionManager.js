var SectionManager = {
	sections: [],
	add: function(beats){
		this.sections.push( new Section({}) );
		console.log( this.sections );
	},
	delete: function(id){
		for( var i = 0; i < this.sections.length; i++ ){
			if( id === this.sections[i].id ){
				this.sections.splice(i, 1);
				break;
			}
		}
	}
};