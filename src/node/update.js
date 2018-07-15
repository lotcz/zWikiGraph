var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var neo4j = require('neo4j-driver').default;
const driver = neo4j.driver(config.neo4j.uri, neo4j.auth.basic(config.neo4j.user, config.neo4j.password));

const GraphNode = require('./GraphNode.js');

const wiki = require('wikijs').default;
const WikiLoader = require('./WikiLoader.js');
var loader = new WikiLoader(wiki());

const max_records = 10;
const category_name = 'Ancient Egypt';

var articlesPromise = loader.loadArticlesFromCategory(category_name);

articlesPromise.then(articles => {
	console.log(articles.length + " articles.");
	articles.forEach((article) => {
		console.log(article);
		var node = new GraphNode(article);
		node.save(driver.session());
	});
});