# encoding: utf-8
f = lambda {
	|v,i|
	break if i > 3
	puts v
}
["Rāhina", "Rātū", "Rāapa", "Rāpare", "Rāmere", "Rāhoroi", "Rātapu"].each_with_index &f