defmodule Account do
    def parse_file({:ok, content}) do
        content |> IO.puts
    end
    def parse_file({:error, error}) do
        error |> IO.puts
    end
end

File.read("./fileRead2.exs") |> Account.parse_file
File.read("./fileRead_BAD.exs") |> Account.parse_file
