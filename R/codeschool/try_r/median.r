limbs <- c(4, 3, 4, 3, 2, 4, 4, 14)
names(limbs) <- c(
    'One-Eye', 'Peg-Leg', 'Smitty', 'Hook',  'Scooter', 'Dan', 'Mikey', 'Davy Jones'
)

barplot(limbs)
abline(h = median(limbs))
