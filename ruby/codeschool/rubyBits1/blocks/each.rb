class Library
  attr_accessor :games

  def initialize(games = [])
    self.games = games
  end

  def list

    self.games.each { |game| puts game  }
    
  end
end

library = Library.new ["tahi", "rua", "toru", "wha"]

library.list
