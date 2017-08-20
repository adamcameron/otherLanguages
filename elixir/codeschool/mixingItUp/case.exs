defmodule Account do
    def list_transactions(filename) do
        case filename |> File.read do
            {:ok, content}
                when content |> byte_size > 10 ->  "Content: (...)"
            {:ok, content} -> "Content: #{content}"
            {:error, type} -> "Error: #{type}"
        end
    end
end

"case.exs" |> Account.list_transactions |> IO.puts
"case_BAD.exs" |> Account.list_transactions |> IO.puts
