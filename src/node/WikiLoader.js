class WikiLoader {
	
	constructor(wiki) {
		this.wiki = wiki;
	}
	
	async loadArticlesFromCategory(category_name) {		
		var articles = await this.wiki.pagesInCategory(category_name);
		return articles;
	}
	
	async loadByTitle(title) {
		return await this.wiki.page(title);
	}
	
	async loadById(id) {
		return await this.wiki.findById(id);
	}
}

module.exports = WikiLoader;