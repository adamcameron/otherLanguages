defmodule Person do
  def format_name(full_name) do
    #format(String.split(full_name))
    full_name
    |> String.split
    |> format
  end

  def format(parts) do
    #first = Enum.at(parts, 0)
    first =parts |> Enum.at(0)
    #last = Enum.at(parts, 1)
    last = parts |> Enum.at(1)
    "#{last |> String.upcase}, #{first}"
  end
end 

"José Valim" |> Person.format_name |> IO.puts
