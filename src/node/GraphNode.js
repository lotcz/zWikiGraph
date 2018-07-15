class GraphNode {
	
	constructor(name) {
		this.name = name;		
	}
	
	save(session) {
		const resultPromise = session.writeTransaction(tx => tx.run(
		  'CREATE (a:Article {name:$name})',
		  {name: this.name}));

		resultPromise.then(result => {
		  session.close();
		});
	}
}

module.exports = GraphNode;