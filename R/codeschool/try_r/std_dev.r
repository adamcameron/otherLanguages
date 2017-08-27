pounds <- c(45000, 50000, 35000, 40000, 35000, 45000, 10000, 15000)
barplot(pounds)
meanValue <- mean(pounds)
deviation <- sd(pounds)

abline(h = meanValue)
abline(h = meanValue + deviation)
abline(h = meanValue - deviation)
