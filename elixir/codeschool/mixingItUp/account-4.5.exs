defmodule Account do
    def transfer_amount(from_account, to_account, amount) do
        hourOfDay = DateTime.utc_now.hour

        if !valid_transfer?(amount, hourOfDay) do
            {:error, "Invalid transfer"}
        else
            perform_transfer(from_account, to_account, amount)
        end
    end

    def valid_transfer?(amount, hourOfDay) do
       cond do
           hourOfDay < 12 -> amount <= 5000
           hourOfDay < 18 -> amount <= 1000
           true -> amount <= 300
       end
    end

    def perform_transfer(from_account, to_account, amount) do
        "From: #{from_account}; to: #{to_account}; amount #{amount}" |> IO.puts
    end
end

Account.transfer_amount(112233, 445566, 150.50)
{:error, value} = Account.transfer_amount(112233, 445566, 980)
value |> IO.puts

