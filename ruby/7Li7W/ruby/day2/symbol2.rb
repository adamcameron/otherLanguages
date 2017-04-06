hash = {
	:subHash1 => {
		:subKeySymbol => "v1",
		"subKeyString" => "v2"
	},
	:subHash2 => {
		:subKeySymbol => "v3",
		"subKeyString" => "v4"
	}
}


hash.each do |ko,vo|
	puts "outer key: #{ko}"
	vo.each do |ki,vi|
		puts "inner"
		puts "key: #{ki}";
		puts "key ID: #{ki.object_id}"
		puts "value: #{vi}"
	end
	puts "============"
end

puts "subKeySymbol object ID: #{:subKeySymbol.object_id}";
puts "subKeySting object ID: #{"subKeyString".object_id}";

