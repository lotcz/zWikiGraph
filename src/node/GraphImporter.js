const GraphNode = require('./GraphNode.js');

class GraphImporter {
	
	constructor(driver, loader) {
		this.driver = driver;
		this.loader = loader;
	}
	
	isCategory(name) {
		return name.startsWith('Category:');
	}
	
	async import(name, parent = null) {
				
		var node = new GraphNode(this.driver);
		node.name = name;
		
		var node_exists = await node.exists();
		
		if (!node_exists) {
			node.parent_name = parent;
			console.log("Saving "+name);
			await node.save();

			if (this.isCategory(name)) {
				console.log("Loading "+name);
				var articles = await this.loader.loadArticlesFromCategory(name);				
				console.log(name+": "+articles.length+" articles");
				articles.forEach(async (article) => {				
					await this.import(article, name);
				});
			};
		} else {
			console.log(name+" already exists.");
		}
	}

}

module.exports = GraphImporter;