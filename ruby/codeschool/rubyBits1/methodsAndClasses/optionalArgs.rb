# optionalArgs.rb

def gatherTranslations1(english, maori="", japanese="", german="")
	puts english
	puts maori unless maori.empty?
	puts japanese unless japanese.empty?
	puts german unless german.empty?
end

gatherTranslations1("one", "tahi", "", "eins") 

puts "\n"

def gatherTranslations2(english, others={})
	puts english
	puts others[:maori] unless others[:maori].nil?
	puts others[:japanese] unless others[:japanese].nil?
	puts others[:german] unless others[:german].nil?
end

gatherTranslations2(
	"two",
	:maori		=> "rua",
	:japanese	=> "ni"
)