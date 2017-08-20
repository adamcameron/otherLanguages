languages = ["Elixir", "JavaScript", "Ruby"]

[head | tail] = languages

head |> IO.puts
tail |> Enum.join(" ") |> IO.puts