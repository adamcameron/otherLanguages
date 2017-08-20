defmodule Language do
    def print_list([head | tail]) do
        head |> IO.puts
        print_list(tail)
    end
    def print_list([]) do
        
    end
end

["Elixir", "PHP", "CFML"] |> Language.print_list
