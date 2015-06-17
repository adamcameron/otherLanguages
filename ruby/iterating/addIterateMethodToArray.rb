class Array
  def iterate(code)
    self.each_with_index do |n, i|
      self[i] = code.call(n,i)
    end
  end
end

a = [1,2,3,4,5,6,7]
a.iterate(lambda {
	|n,i|
	break if i > 3
	puts n
})
