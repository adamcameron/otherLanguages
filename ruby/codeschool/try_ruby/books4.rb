# books2.rb
books = {}
books["Gravity's Rainbow"]	= :splendid
books["London Fields"]		= :splendid
books["The Da Vinci Code"]	= :abysmal
books["Once Were Warriors"]	= :quite_good
puts books
puts "\n"

ratings = Hash.new(0)
books.each {
	|title,rating|
	puts "Title: " + title + "; rating: " + rating.to_s 
}

