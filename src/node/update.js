var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var neo4j = require('neo4j-driver').default;
const driver = neo4j.driver(config.neo4j.uri, neo4j.auth.basic(config.neo4j.user, config.neo4j.password));

const wiki = require('wikijs').default;
const WikiLoader = require('./WikiLoader.js');
var loader = new WikiLoader(wiki());

/*
const GraphNode = require('./GraphNode.js');
var node = new GraphNode(driver);
node.name = "Aswan";
node.exists().then(result => {
	console.log(result);
	if (!result)	{		
		node.save().then((result) => driver.close());
	}
	return false;
});
*/

const GraphImporter = require('./GraphImporter.js');
var importer = new GraphImporter(driver, loader);
importer.import("Aswan")
	.then((result) => driver.close())
	.catch(console.log);
