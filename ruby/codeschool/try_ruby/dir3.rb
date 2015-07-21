# dir3.rb
Dir.chdir "C:/apps/Ruby200-x64"
Dir["*"].each{
	|fileName|
	puts fileName
}