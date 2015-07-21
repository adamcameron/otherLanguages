require 'delegate'
class Library < SimpleDelegator
  def initialize(console)
    @manager = console
    super(@manager)
  end

end
