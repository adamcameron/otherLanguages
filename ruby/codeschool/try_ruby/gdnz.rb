# gdnz.rb
anthem = "
E Ihowā Atua,
O ngā iwi mātou rā
Āta whakarangona;
Me aroha noa
Kia hua ko te pai;
Kia tau tō atawhai;
Manaakitia mai
Aotearoa
"
puts anthem

puts "\n"

lines = anthem.lines
reversedLines = lines.to_a.reverse
reversedAnthem = reversedLines.join

puts reversedAnthem