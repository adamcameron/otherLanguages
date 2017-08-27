piracy <- read.csv("piracy.csv")
gdp <- read.table("gdp.txt", sep="\t", header=TRUE)
countries <- merge(x = gdp, y = piracy)

piracy
gdp
countries

plot(countries$GDP, countries$Piracy)
cor.test(countries$GDP, countries$Piracy)
line <- lm(countries$Piracy ~ countries$GDP)
abline(line)