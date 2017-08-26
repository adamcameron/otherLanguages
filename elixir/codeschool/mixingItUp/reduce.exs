[1,2,3,4] |> Enum.map(&(&1 * 2)) |> Enum.reduce(20, &(&1 + &2)) |> IO.puts
