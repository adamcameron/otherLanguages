person = %{
    "name" => "Zachary",
    "address" => %{"city" => "Galway", "province" => "Connacht"}
}

%{"address" => %{"province" => province}} = person

province |> IO.puts