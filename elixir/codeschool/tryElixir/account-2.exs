defmodule Account do

	def balance(initial, spending) do
        #interest(discount(initial, 10), 0.1)
        initial
        |> discount(10)
        |> interest(0.1)
	end

    def discount(total, amount) do
        total * (amount / 100)
    end

    def interest(total, rate) do
        total + (total * rate)
    end

    def print_sum do
        1..10
        |> Enum.sum
        |> IO.puts
    end
end	

#current_balance = Account.balance(1000, 200)
#IO.puts "Current balance: US $#{current_balance}"

Account.print_sum