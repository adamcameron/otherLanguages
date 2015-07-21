# dir.rb
(Dir.entries ".").each{
	|fileName|
	puts fileName
}
puts "\n"

Dir["d*.rb"].each{
	|fileName|
	puts fileName
}
