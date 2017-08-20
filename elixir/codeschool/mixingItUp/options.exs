defmodule Account do
    def balance(_, options \\ []) do
        currency = options[:currency] || "GBP"
        symbol = options[:symbol] || "£"
        currency |> IO.puts
        symbol |> IO.puts
    end

end

Account.balance('', currency: "EUR")