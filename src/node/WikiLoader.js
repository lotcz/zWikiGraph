class WikiLoader {
	
	constructor(wiki) {
		this.wiki = wiki;
	}
	
	loadArticlesFromCategory(category_name) {
		return this.wiki.pagesInCategory("Category:"+category_name);
	}
	
	loadArticle() {
		
	}
}

module.exports = WikiLoader;