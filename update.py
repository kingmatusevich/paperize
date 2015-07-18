import sys
from datetime import datetime


from pymongo import MongoClient
import newspaper
from newspaper import news_pool
from newspaper import Config
from bson.objectid import ObjectId

client = MongoClient('127.0.0.1', 3001)
db = client.meteor

sites = db.sites
articlesCollection = db.articles
sitesArray = sites.find()
papersArray = []
for aSite in sitesArray:
	paper = newspaper.build(aSite['url'], keep_article_html=True)
	papersArray.append(paper)
	print (paper.brand)
	sites.update_one({'favIconURL':paper.favicon,'_id': aSite['_id']},{'$set':{'lastFetched':datetime.utcnow(),'brandName':paper.brand, 'description':paper.description}})
news_pool.set(papersArray, threads_per_source=2)
news_pool.join()
print('--')
print('articles:')
for aPaper in papersArray:
	articles = aPaper.articles
	for article in articles:
		article.parse()
		article.nlp()
		print(aPaper.brand)
		site = sites.find_one({'brandName': aPaper.brand})
		articlesCollection.insert_one({'insert_date':datetime.utcnow(),'_id': str(ObjectId()),'date':article.publish_date,'title':article.title, 'summary':article.summary, 'url':article.url, 'keywords':article.keywords, 'authors': article.authors, 'text':article.text, 'html': article.article_html, 'siteID':site['_id']})
