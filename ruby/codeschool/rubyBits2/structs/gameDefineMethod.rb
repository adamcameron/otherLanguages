class Game
    SYSTEMS = ['SNES', 'PS1', 'Genesis']

	SYSTEMS.each do |system|
        method_name = "runs_on_" + system.downcase + "?"
		define_method(method_name)
			self.system == system
		end
	end

	attr_accessor :name, :year, :system

end