GAMES = [
  Game.new(name: 'Contra', year: 1987, system: 'NES'),
  Game.new(name: 'Civilization', year: 1991, system: 'PC'),
  Game.new(name: 'The Legend of Zelda', year: 1986, system: 'NES'),
  Game.new(name: 'Mega Man X2', year: 1995, system: 'SNES'),
  Game.new(name: 'Super Metroid', year: 1994, system: 'SNES'),
  Game.new(name: 'Sim City 2000', year: 1993, system: 'PC'),
  Game.new(name: 'Starcraft', year: 1998, system: 'PC')
]

class Library
  attr_accessor :games

  def initialize(games)
    @games = games
  end

  def exec_game(name, action)
    game = games.detect { |game| game.name = name }

  end
end


library = Library.new(GAMES)
print_details = Proc.new do |game|
  puts "#{game.name} (#{game.system}) - #{game.year}"
end
