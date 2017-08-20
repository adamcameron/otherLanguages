max_balance = fn(amount) -> "Max: #{amount}" end

1000 |> max_balance.() |> IO.puts
