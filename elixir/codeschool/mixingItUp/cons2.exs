defmodule Language do
    def print_list([head | tail]) do
        "Head: #{head}" |> IO.puts
        "Tail: #{tail}" |> IO.puts
    end
end

["Elixir", "PHP", "CFML"] |> Language.print_list
