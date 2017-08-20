person = %{"name" => "Zachary", "age" => 6}

{_, value} = Map.fetch(person, "name")
value |>IO.puts
person |> Map.fetch!("age") |> IO.puts

%{"name" => name} = person
name |> IO.puts