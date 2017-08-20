"José " <> last_name = "José Valim"
last_name |> IO.puts

#"José " <> last_name = "Valim"
#last_name |> IO.puts

data = ["Elixir", "Valim"]
data |> IO.puts

[lang, author] = data
"#{lang}, #{author}" |> IO.puts