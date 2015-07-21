def print
   if block_given?
       yield
   else
       puts "no block"
   end
end

print {puts "block"}
print
