defmodule Account do
    def run_transaction(balance, amount, transaction) do
        if balance <= 0 do
            "Cannot perform any transaction"
        else
            transaction.(balance, amount)
        end
    end
end

deposit = &(&1 + &2)
withdrawal = fn(balance, amount) -> balance - amount end


1000 |> Account.run_transaction(20, withdrawal) |> IO.puts
1000 |> Account.run_transaction(20, &(&1 + &2)) |> IO.puts
0 |> Account.run_transaction(20, deposit) |> IO.puts

account_transaction = fn
    (balance, amount, :deposit) -> balance + amount
    (balance, amount, :withdrawal) -> balance - amount
end

100 |> account_transaction.(40, :withdrawal) |> IO.puts
100 |> account_transaction.(40, :deposit) |> IO.puts
