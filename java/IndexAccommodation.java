public void IndexAccommodation(Accommodation acc) throws IOException {

	IndexWriter writer = (IndexWriter) getIndexWriter(false);

	String searchContents = acc.getTitle()
			  + " "
			  + acc.getDetails()
			  + " "
			  + acc.describeFeatures();

	Document doc = new Document();
	doc.add(Field.UnIndexed("id", acc.getId()));
	doc.add(Field.Text("title",acc.getTitle()));
	doc.add(Field.UnStored("content",searchContents));
	writer.addDocument(doc);
}    
