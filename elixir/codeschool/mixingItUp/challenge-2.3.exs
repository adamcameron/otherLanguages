defmodule Printer do
  def list_names( [head | tail] ) do
    IO.puts "Name: #{head}"
    tail |> list_names
  end
  def list_names([]) do
    IO.puts "Done."
  end
end

users = ["Brooke", "Aspen", "Jordan", "Glenn", "Taylor"]
Printer.list_names(users)
