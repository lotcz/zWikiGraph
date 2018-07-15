class GraphNode {
	
	constructor(driver) {
		this.driver = driver;
		
	}
	
	async save() {
		var session = this.driver.session();

		if (this.parent_name == null) {
			await session.writeTransaction(tx => tx.run('CREATE (a:Article {name:$name})', {name: this.name}));
		} else {
			await session.writeTransaction(tx => tx.run(
				'MATCH  (parent:Article {name:$parent})' + 
				'CREATE (parent)<-[r:IS_IN_CATEGORY]-(a:Article {name:$name})',
				{name: this.name, parent: this.parent_name}));			
		}
		
		session.close();
	}
	
	async exists() {
		var session = this.driver.session();
		var result = await session.readTransaction(tx => tx.run('MATCH (a:Article {name:$name}) RETURN a', {name: this.name}));
		session.close();		
		return (result.records.length > 0);  		
	}
}

module.exports = GraphNode;