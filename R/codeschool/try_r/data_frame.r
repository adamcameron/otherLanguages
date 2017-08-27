chests <- c('gold', 'silver', 'gems', 'gold', 'gems')
types <- factor(chests)

weights <- c(300, 200, 100, 250, 150)
prices <- c(9000, 5000, 12000, 7500, 18000)

treasure <- data.frame(weights, prices, types)

treasure
treasure[[2]]
treasure[["weights"]]
treasure$prices
treasure$types
